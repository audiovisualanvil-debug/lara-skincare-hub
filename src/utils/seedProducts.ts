import { supabase } from "@/integrations/supabase/client";
import { allTulipiaWithImages } from "@/data/tulipiaProductsWithImages";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";
import { allSmartGRWithImages } from "@/data/smartGRProducts";

const generateSlug = (name: string, id: number) => {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    id
  );
};

const parsePrice = (priceStr?: string): number => {
  if (!priceStr || priceStr === "Consultar") return 0;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || 0;
};

export const seedAllProducts = async (
  onProgress?: (current: number, total: number, name: string) => void
) => {
  // Collect all hardcoded products
  const allHardcoded = [
    ...allTulipiaWithImages.map((p) => ({ ...p, srcBrand: p.brand })),
    ...allMezzoWithImages.map((p) => ({ ...p, srcBrand: p.brand })),
    ...allExtratosWithImages.map((p) => ({ ...p, srcBrand: p.brand })),
    ...allSmartGRWithImages.map((p) => ({ ...p, srcBrand: p.brand })),
  ];

  const total = allHardcoded.length;
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  // Process in batches of 20
  const batchSize = 20;
  for (let i = 0; i < allHardcoded.length; i += batchSize) {
    const batch = allHardcoded.slice(i, i + batchSize);
    const productRows = batch.map((p) => {
      const price = parsePrice(p.price);
      const slug = generateSlug(p.name, p.id);
      return {
        name: p.name,
        slug,
        brand: p.srcBrand || p.brand,
        price: price > 0 ? price : 0.01, // DB requires non-zero for display
        description: (p as any).fullDescription || p.description || null,
        short_description: p.description || null,
        category: p.category || null,
        image_url: (p as any).image || null,
        images: (p as any).gallery || [],
        is_active: true,
        is_new: p.category === "lancamentos",
        is_promotion: false,
        stock: 100,
        tags: [
          ...(p.isProfessional ? ["profissional"] : ["home-care"]),
          ...((p as any).activeIngredients || []),
        ],
        benefits: (p as any).applicationIndications || [],
        ingredients: ((p as any).activeIngredients || []).join(", ") || null,
        how_to_use: null,
        sku: `HC-${p.id}`,
      };
    });

    const { data, error } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "slug", ignoreDuplicates: true });

    if (error) {
      console.error("Batch insert error:", error);
      // Try one by one for this batch
      for (const row of productRows) {
        const { error: singleError } = await supabase
          .from("products")
          .upsert([row], { onConflict: "slug", ignoreDuplicates: true });
        if (singleError) {
          console.error(`Error inserting ${row.name}:`, singleError);
          errors++;
        } else {
          inserted++;
        }
        onProgress?.(i + inserted + errors + skipped, total, row.name);
      }
    } else {
      inserted += batch.length;
    }

    onProgress?.(Math.min(i + batchSize, total), total, batch[batch.length - 1]?.name || "");
  }

  return { total, inserted, skipped, errors };
};
