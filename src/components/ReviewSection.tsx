import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  targetId: string;
  targetType: string;
  reviewer: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  targetId: string;
  targetType: "doctor" | "hospital";
  targetName: string;
}

const ReviewSection = ({ targetId, targetType, targetName }: ReviewSectionProps) => {
  const storageKey = "uims_reviews";
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reviewer: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
  if (typeof window === "undefined") return; // SSR safety
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const all: Review[] = JSON.parse(stored) as Review[];
      setReviews(all.filter(r => r.targetId === targetId && r.targetType === targetType));
    }
  } catch (error) {
    console.error("Failed to load reviews", error);
  }
}, [targetId, targetType, storageKey]);

const saveReview = (newReview: Review) => {
  if (typeof window === "undefined") return; // SSR safety
  try {
    const stored = localStorage.getItem(storageKey);
    const all: Review[] = stored ? (JSON.parse(stored) as Review[]) : [];
    all.unshift(newReview);
    localStorage.setItem(storageKey, JSON.stringify(all));
  } catch (error) {
    console.error("Failed to save review", error);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    const newReview: Review = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      targetId,
      targetType,
      reviewer: form.reviewer.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      createdAt: new Date().toISOString(),
    };
    saveReview(newReview);
    setReviews((prev) => [newReview, ...prev]);
    setForm({ reviewer: "", rating: 0, comment: "" });
    setShowForm(false);
    toast.success("Review submitted!");
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const StarRating = ({ rating, interactive = false, size = 16 }: { rating: number; interactive?: boolean; size?: number }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          aria-label={`Rate ${star} stars`}
          onClick={interactive ? () => setForm({ ...form, rating: star }) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          disabled={!interactive}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= (interactive ? (hoverRating || form.rating) : rating)
                ? "text-accent fill-accent"
                : "text-border"
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-6 border-t border-border/50 pt-5">
      {/* Summary */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-foreground font-display text-sm">Reviews</h4>
          {reviews.length > 0 && (
            <div className="flex items-center gap-1.5">
              <StarRating rating={Math.round(Number(avgRating))} size={14} />
              <span className="text-sm font-bold text-foreground">{avgRating}</span>
              <span className="text-xs text-muted-foreground">({reviews.length})</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="mb-4 p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-3 overflow-hidden"
          >
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Your Name <span className="text-destructive">*</span></label>
              <input
                required maxLength={100}
                value={form.reviewer}
                onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-lg bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Rating <span className="text-destructive">*</span></label>
              <StarRating rating={form.rating} interactive size={24} />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Comment</label>
              <textarea
                maxLength={500} rows={2}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your experience..."
                className="w-full px-3 py-2 rounded-lg bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
            <button type="submit" className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
              Submit Review
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Review list */}
      {reviews.length === 0 && !showForm && (
        <p className="text-xs text-muted-foreground">No reviews yet. Be the first to review!</p>
      )}
      <div className="space-y-3">
        {reviews.slice(0, 5).map((review) => (
          <div key={review.id} className="p-3 rounded-xl bg-secondary/30 border border-border/30">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{review.reviewer}</span>
                <StarRating rating={review.rating} size={12} />
              </div>
              <span className="text-[10px] text-muted-foreground">{getTimeAgo(review.createdAt)}</span>
            </div>
            {review.comment && <p className="text-xs text-muted-foreground mt-1">{review.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
