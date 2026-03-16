import { useState } from "react";
import { Star, ThumbsUp, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useProductReviews } from "@/hooks/useProductReviews";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductReviewsProps {
  productId: string | number;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const pid = String(productId);
  const { reviews, loading, stats, addReview, incrementHelpful, user } = useProductReviews(pid);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error("Selecione uma avaliação"); return; }
    if (!comment.trim()) { toast.error("Escreva um comentário"); return; }

    setSubmitting(true);
    try {
      await addReview(rating, title.trim(), comment.trim());
      setRating(0);
      setTitle("");
      setComment("");
      setShowForm(false);
      toast.success("Avaliação enviada com sucesso!");
    } catch {
      toast.error("Erro ao enviar avaliação. Faça login e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 p-6 bg-muted/30 border border-border rounded-xl">
        <div className="text-center md:border-r md:border-border">
          <p className="font-display text-5xl font-bold text-foreground mb-2">
            {stats.average > 0 ? stats.average.toFixed(1) : "—"}
          </p>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= Math.round(stats.average) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {stats.total} {stats.total === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>

        <div className="space-y-2">
          {ratingCounts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16">{star} estrelas</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write review */}
      {!showForm && (
        user ? (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Escrever uma avaliação
          </Button>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <Link to="/auth" className="text-primary font-medium hover:underline">Faça login</Link> para deixar sua avaliação
            </p>
          </div>
        )
      )}

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 bg-muted/30 border border-border rounded-xl space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Sua avaliação</h3>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nota *</label>
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
                      star <= (hoverRating || rating) ? "text-primary fill-primary" : "text-muted-foreground/30 hover:text-primary/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Título (opcional)</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resuma sua experiência" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Comentário *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte sua experiência com o produto..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
          <div className="p-8 text-center bg-muted/20 border border-border rounded-xl">
            <p className="text-muted-foreground">
              Ainda não há avaliações para este produto. Seja o primeiro a avaliar!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-5 bg-background border border-border rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {review.user_name || "Cliente"}
                      </p>
                      {review.is_verified_purchase && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          ✓ Compra verificada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(review.created_at)}</span>
              </div>

              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>

              {review.title && (
                <h4 className="text-sm font-semibold text-foreground mb-1">{review.title}</h4>
              )}

              {review.comment && (
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{review.comment}</p>
              )}

              <button
                onClick={() => incrementHelpful(review.id)}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Útil ({review.helpful_count || 0})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
