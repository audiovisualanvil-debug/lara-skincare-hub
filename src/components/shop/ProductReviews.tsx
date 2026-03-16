import { useState } from "react";
import { Star, ThumbsUp, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useReviews, Review } from "@/contexts/ReviewsContext";
import { toast } from "sonner";

interface ProductReviewsProps {
  productId: string | number;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { getProductReviews, addReview, getAverageRating, getReviewCount, markHelpful } = useReviews();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação");
      return;
    }
    if (!userName.trim()) {
      toast.error("Por favor, informe seu nome");
      return;
    }
    if (!comment.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }

    addReview({
      productId,
      userName: userName.trim(),
      userCity: userCity.trim() || undefined,
      rating,
      title: title.trim() || "Avaliação",
      comment: comment.trim(),
      verified: false,
    });

    // Reset form
    setRating(0);
    setUserName("");
    setUserCity("");
    setTitle("");
    setComment("");
    setShowForm(false);
    toast.success("Avaliação enviada com sucesso!");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }));
  const maxCount = Math.max(...ratingCounts.map(r => r.count), 1);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 p-6 bg-cream border border-detail/30 rounded-lg">
        {/* Average rating */}
        <div className="text-center md:border-r md:border-detail/30">
          <p className="font-display text-5xl font-bold text-foreground mb-2">
            {averageRating > 0 ? averageRating.toFixed(1) : "-"}
          </p>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? "text-primary fill-primary"
                    : "text-detail"
                }`}
              />
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground">
            Baseado em {reviewCount} {reviewCount === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>

        {/* Rating distribution */}
        <div className="space-y-2">
          {ratingCounts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="font-body text-sm text-muted-foreground w-16">{star} estrelas</span>
              <div className="flex-1 h-2 bg-detail/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="font-body text-sm text-muted-foreground w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write review button */}
      {!showForm && (
        <Button variant="gold-outline" onClick={() => setShowForm(true)}>
          Escrever uma avaliação
        </Button>
      )}

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 bg-cream border border-detail/30 rounded-lg space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Escreva sua avaliação</h3>
          
          {/* Star rating */}
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Sua avaliação *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-primary fill-primary"
                        : "text-detail hover:text-primary/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-medium text-foreground mb-2">
                Seu nome *
              </label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ex: Maria S."
                className="bg-background"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-foreground mb-2">
                Cidade (opcional)
              </label>
              <Input
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                placeholder="Ex: São Paulo, SP"
                className="bg-background"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Título (opcional)
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resuma sua experiência"
              className="bg-background"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Seu comentário *
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte sua experiência com o produto..."
              className="bg-background min-h-[100px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="gold">
              Enviar avaliação
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Avaliações dos clientes
        </h3>
        
        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-cream/50 border border-detail/30 rounded-lg">
            <p className="font-body text-muted-foreground">
              Ainda não há avaliações para este produto. Seja o primeiro a avaliar!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-6 bg-background border border-detail/30 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-body text-sm font-medium text-foreground">{review.userName}</p>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary font-body text-xs rounded">
                          <Check className="w-3 h-3" />
                          Compra verificada
                        </span>
                      )}
                    </div>
                    {review.userCity && (
                      <p className="font-body text-xs text-muted-foreground">{review.userCity}</p>
                    )}
                  </div>
                </div>
                <span className="font-body text-xs text-muted-foreground">{formatDate(review.date)}</span>
              </div>

              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? "text-primary fill-primary" : "text-detail"
                    }`}
                  />
                ))}
              </div>

              {review.title && (
                <h4 className="font-display text-sm font-semibold text-foreground mb-2">
                  {review.title}
                </h4>
              )}

              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">
                {review.comment}
              </p>

              <button
                onClick={() => markHelpful(review.id)}
                className="inline-flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                Útil ({review.helpful})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
