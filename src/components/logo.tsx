import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import { ComponentProps } from "react";

const Logo = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      <Package className="h-5 w-5" />
    </div>
  );
};

export default Logo;
