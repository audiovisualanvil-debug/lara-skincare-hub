import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ReviewsContextType {
  getProductReviews: (productId: string) => Review[];
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
  markHelpful: (reviewId: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const REVIEWS_STORAGE_KEY = "dermostore-reviews";

// Sample reviews for demo
const sampleReviews: Review[] = [
  {
    id: "r1",
    productId: "1401",
    userName: "Ana Paula M.",
    userCity: "São Paulo, SP",
    rating: 5,
    title: "Excelente produto!",
    comment: "Minha pele clareou visivelmente em 4 semanas! As manchas do melasma reduziram bastante e a textura ficou muito mais uniforme.",
    date: "2024-12-12",
    verified: true,
    helpful: 12,
  },
  {
    id: "r2",
    productId: "1401",
    userName: "Fernanda L.",
    userCity: "Curitiba, PR",
    rating: 5,
    title: "Superou expectativas",
    comment: "Textura leve, absorve super rápido e não deixa a pele oleosa. Resultado visível desde a segunda semana de uso.",
    date: "2024-11-28",
    verified: true,
    helpful: 8,
  },
  {
    id: "r3",
    productId: 1402,
    userName: "Juliana S.",
    userCity: "Belo Horizonte, MG",
    rating: 4,
    title: "Muito bom",
    comment: "Excelente produto! Qualidade profissional para uso em casa. Vale o investimento.",
    date: "2024-11-15",
    verified: true,
    helpful: 5,
  },
  {
    id: "r4",
    productId: 4001,
    userName: "Mariana C.",
    userCity: "Rio de Janeiro, RJ",
    rating: 5,
    title: "Pele iluminada",
    comment: "Uso diariamente e minha pele nunca esteve tão bonita! A vitamina C faz toda diferença.",
    date: "2024-12-20",
    verified: true,
    helpful: 3,
  },
];

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (savedReviews) {
        setReviews([...sampleReviews, ...JSON.parse(savedReviews)]);
      } else {
        setReviews(sampleReviews);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
      setReviews(sampleReviews);
    }
  }, []);

  // Save user reviews to localStorage (excluding sample reviews)
  const saveUserReviews = (allReviews: Review[]) => {
    const userReviews = allReviews.filter(r => !sampleReviews.some(sr => sr.id === r.id));
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(userReviews));
    } catch (error) {
      console.error("Error saving reviews:", error);
    }
  };

  const getProductReviews = (productId: number): Review[] => {
    return reviews
      .filter(r => r.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const addReview = (review: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: `user-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    saveUserReviews(updatedReviews);
  };

  const getAverageRating = (productId: number): number => {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  const getReviewCount = (productId: number): number => {
    return reviews.filter(r => r.productId === productId).length;
  };

  const markHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    );
    setReviews(updatedReviews);
    saveUserReviews(updatedReviews);
  };

  return (
    <ReviewsContext.Provider
      value={{
        getProductReviews,
        addReview,
        getAverageRating,
        getReviewCount,
        markHelpful,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};
