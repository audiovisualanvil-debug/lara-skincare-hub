import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HomeProduct {
  id: string;
  name: string;
  brand: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  imageHover?: string;
  isProfessional?: boolean;
  isNew?: boolean;
  discount?: number;
  category?: string;
}

const formatPrice = (price: number): string =>
  `R$ ${price.toFixed(2).replace(".", ",")}`;

const mapProduct = (p: any): HomeProduct => {
  const discount =
    p.compare_at_price && p.compare_at_price > p.price
      ? Math.round(((p.compare_at_price - p.price) / p.compare_at_price) * 100)
      : undefined;

  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: formatPrice(p.price),
    originalPrice: p.compare_at_price ? formatPrice(p.compare_at_price) : undefined,
    image: p.image_url || undefined,
    imageHover: p.images && p.images.length > 1 ? p.images[1] : undefined,
    isProfessional: false,
    isNew: p.is_new,
    category: p.category || undefined,
    discount,
  };
};

export const useHomeProducts = () => {
  const [bestSellers, setBestSellers] = useState<HomeProduct[]>([]);
  const [lancamentos, setLancamentos] = useState<HomeProduct[]>([]);
  const [promocoes, setPromocoes] = useState<HomeProduct[]>([]);
  const [tendencias, setTendencias] = useState<HomeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);

      // Fetch in parallel
      const [bestRes, newRes, promoRes, trendRes] = await Promise.all([
        // Best sellers: mix of brands, ordered by name for consistency
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .gt("stock", 0)
          .order("name")
          .limit(8),
        // New products
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("is_new", true)
          .gt("stock", 0)
          .order("created_at", { ascending: false })
          .limit(8),
        // Promotions: products with compare_at_price > price
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("is_promotion", true)
          .gt("stock", 0)
          .order("name")
          .limit(8),
        // Trends: mix of popular categories
        supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .gt("stock", 0)
          .order("updated_at", { ascending: false })
          .limit(8),
      ]);

      if (bestRes.data) setBestSellers(bestRes.data.map(mapProduct));
      if (newRes.data) setLancamentos(newRes.data.map(mapProduct));
      if (promoRes.data) setPromocoes(promoRes.data.map(mapProduct));
      if (trendRes.data) setTendencias(trendRes.data.map(mapProduct));

      setIsLoading(false);
    };

    fetchAll();
  }, []);

  return { bestSellers, lancamentos, promocoes, tendencias, isLoading };
};
