import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ProductReview {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean | null;
  helpful_count: number | null;
  created_at: string;
  // Joined profile data
  user_name?: string;
}

export function useProductReviews(productId: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ average: 0, total: 0 });

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const reviewsWithNames: ProductReview[] = (data || []).map((r) => ({
        ...r,
        user_name: undefined, // Will be displayed as anonymous
      }));

      setReviews(reviewsWithNames);

      if (reviewsWithNames.length > 0) {
        const avg = reviewsWithNames.reduce((sum, r) => sum + r.rating, 0) / reviewsWithNames.length;
        setStats({ average: avg, total: reviewsWithNames.length });
      } else {
        setStats({ average: 0, total: 0 });
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId, fetchReviews]);

  const addReview = async (rating: number, title: string, comment: string) => {
    if (!user) throw new Error("Must be logged in");

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      user_id: user.id,
      rating,
      title: title || null,
      comment: comment || null,
    });

    if (error) throw error;
    await fetchReviews();
  };

  const incrementHelpful = async (reviewId: string) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) return;

    await supabase
      .from("product_reviews")
      .update({ helpful_count: (review.helpful_count || 0) + 1 })
      .eq("id", reviewId);

    await fetchReviews();
  };

  return { reviews, loading, stats, addReview, incrementHelpful, user };
}
