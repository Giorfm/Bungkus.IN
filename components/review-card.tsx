import { Star } from "lucide-react";
import { Review } from "@/lib/types";
import { getInitials, timeAgo } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
];

export function ReviewCard({ review }: ReviewCardProps) {
  const colorClass = avatarColors[review.userName.charCodeAt(0) % avatarColors.length];

  return (
    <div className="bg-surface rounded-2xl p-4 shadow-card">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${colorClass}`}
        >
          {getInitials(review.userName)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-bold text-text text-sm">{review.userName}</p>
            <span className="text-text-muted text-[11px]">{timeAgo(review.createdAt)}</span>
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>

          <p className="text-text-muted text-xs leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
