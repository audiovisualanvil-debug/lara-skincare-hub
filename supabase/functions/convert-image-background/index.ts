import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- AUTH CHECK: require authenticated admin user ---
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAuth = createClient(SUPABASE_URL!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getUser(token);
    if (claimsError || !claimsData.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check admin role using service role client
    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc('has_role', {
      _user_id: claimsData.user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin role required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    // --- END AUTH CHECK ---

    const { imageBase64, imagePath, saveToStorage } = await req.json();

    if (!imageBase64) {
      throw new Error('imageBase64 is required');
    }

    console.log(`Processing image: ${imagePath || 'unknown'}`);

    // Call Lovable AI to convert background
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Change the background of this product image to pure white (#FFFFFF). Keep the product exactly the same with all its details, colors, and shadows. Only replace the dark/black background with pure white. Make sure the edges of the product blend naturally with the white background.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/png;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        modalities: ['image', 'text']
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    const processedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!processedImageUrl) {
      console.error('No image in response');
      throw new Error('No processed image returned from AI');
    }

    let storageUrl = null;

    // If saveToStorage is true, upload to Supabase Storage
    if (saveToStorage && imagePath && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      // Extract base64 data from data URL
      const base64Data = processedImageUrl.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

      // Create storage path
      const fileName = imagePath.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '.png') || 'processed.png';
      const storagePath = `processed/${fileName}`;

      console.log(`Uploading to storage: ${storagePath}`);

      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(storagePath, imageBuffer, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Storage upload error: ${uploadError.message}`);
      }

      const { data: urlData } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(storagePath);

      storageUrl = urlData.publicUrl;
      console.log(`Image saved to: ${storageUrl}`);
    }

    return new Response(
      JSON.stringify({ 
        processedImageBase64: processedImageUrl,
        storageUrl,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing image:', errorMessage);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing the image', success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
