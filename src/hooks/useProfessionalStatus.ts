import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface ProfessionalRequest {
  id: string;
  user_id: string;
  company_name: string | null;
  cnpj: string | null;
  contact_name: string;
  phone: string;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  discount_percentage: number;
  reviewed_at: string | null;
  admin_notes: string | null;
  certificate_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfessionalStatus = () => {
  const { user } = useAuth();
  const [request, setRequest] = useState<ProfessionalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfessional, setIsProfessional] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) {
        setLoading(false);
        setRequest(null);
        setIsProfessional(false);
        setDiscountPercentage(0);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("professional_requests")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setRequest(data as ProfessionalRequest);
          setIsProfessional(data.status === "approved");
          setDiscountPercentage(data.status === "approved" ? data.discount_percentage : 0);
        } else {
          setRequest(null);
          setIsProfessional(false);
          setDiscountPercentage(0);
        }
      } catch (error) {
        console.error("Error fetching professional status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user]);

  const uploadCertificate = async (file: File): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("professional-certificates")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("professional-certificates")
      .getPublicUrl(fileName);

    return fileName; // Store the path, not the public URL since bucket is private
  };

  const submitRequest = async (data: {
    company_name?: string;
    cnpj?: string;
    contact_name: string;
    phone: string;
    reason?: string;
    certificate_file?: File;
  }) => {
    if (!user) throw new Error("User not authenticated");

    let certificateUrl: string | null = null;

    // Upload certificate if provided
    if (data.certificate_file) {
      certificateUrl = await uploadCertificate(data.certificate_file);
    }

    const { error } = await supabase.from("professional_requests").insert({
      user_id: user.id,
      company_name: data.company_name || null,
      cnpj: data.cnpj?.replace(/\D/g, "") || null,
      contact_name: data.contact_name,
      phone: data.phone,
      reason: data.reason || null,
      certificate_url: certificateUrl,
    });

    if (error) throw error;

    // Refetch status
    const { data: newRequest } = await supabase
      .from("professional_requests")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (newRequest) {
      setRequest(newRequest as ProfessionalRequest);
    }
  };

  const getCertificateDownloadUrl = async (path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from("professional-certificates")
      .createSignedUrl(path, 3600); // 1 hour

    if (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }

    return data.signedUrl;
  };

  return {
    request,
    loading,
    isProfessional,
    discountPercentage,
    submitRequest,
    hasExistingRequest: !!request,
    getCertificateDownloadUrl,
  };
};
