import { cn } from "@/lib/utils";

export const Logo = ({ className, uniColor }) => {
  return (
    <>
      <span className={cn("font-bold text-2xl", className)}>Data Drive </span>
    </>
  );
};
