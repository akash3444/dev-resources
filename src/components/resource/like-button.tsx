"use client";

import { useResourceLike } from "@/queries/resource";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LikeButtonProps {
  resourceId: string;
  count: number;
  likedByMe: boolean;
}

const LikeButton = ({ resourceId, count, likedByMe }: LikeButtonProps) => {
  const [liked, setLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(count);
  const { likeResource, unlikeResource } = useResourceLike();

  const handleLikeToggle = async () => {
    if (liked) {
      setLiked(false);
      setLikeCount((likeCount) => likeCount - 1);
      await unlikeResource(resourceId);
    } else {
      setLiked(true);
      setLikeCount((likeCount) => likeCount + 1);
      await likeResource(resourceId);
    }
  };

  return (
    <Button
      size={likeCount > 0 ? "default" : "icon"}
      variant="outline"
      className={cn("shadow-none", {
        "pl-2 pr-3": likeCount > 0,
        "border-transparent bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-600":
          liked,
      })}
      onClick={handleLikeToggle}
    >
      <Heart
        className={cn("!h-5 !w-5", {
          "fill-rose-600 text-rose-600": liked,
        })}
      />
      {!!likeCount && <span>{likeCount.toLocaleString("en-US")}</span>}
    </Button>
  );
};

export default LikeButton;
