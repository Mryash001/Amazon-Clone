import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-star">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={size} fill="currentColor" />
      ))}
      {hasHalf && <StarHalf size={size} fill="currentColor" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={size} className="text-border" />
      ))}
    </div>
  );
};

export default StarRating;
