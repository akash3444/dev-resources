import { Package } from "lucide-react";
import { ComponentProps } from "react";

const Logo = (props: ComponentProps<"div">) => {
  return (
    <div
      className="h-8 w-8 flex items-center justify-center shrink-0 bg-primary text-primary-foreground rounded-full"
      {...props}
    >
      <Package className="h-5 w-5" />
    </div>
  );
};

export default Logo;
