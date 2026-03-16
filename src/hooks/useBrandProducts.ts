import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BrandProduct {
  id: string;
  name: string;
  brand: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  imageHover?: string;
  isProfessional?: boolean;
  isNew?: boolean;
  category?: string;
  description?: string;
  discount?: number;
}

const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
};

export const useBrandProducts = (brand: string) => {
  const [products, setProducts] = useState<BrandProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("brand", brand)
        .eq("is_active", true)
        .order("name");

      if (error) {
        console.error(`Error fetching ${brand} products:`, error);
        setIsLoading(false);
        return;
      }

      const mapped: BrandProduct[] = (data || []).map((p) => {
        const discount = p.compare_at_price && p.compare_at_price > p.price
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
          description: p.short_description || p.description || undefined,
          discount,
        };
      });

      setProducts(mapped);
      setIsLoading(false);
    };

    fetchProducts();
  }, [brand]);

  const categories = useMemo(() => {
    const catMap = new Map<string, number>();
    products.forEach((p) => {
      if (p.category) {
        catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
      }
    });
    return catMap;
  }, [products]);

  return { products, isLoading, categories };
};
