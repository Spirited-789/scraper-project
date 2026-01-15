import { cn } from "@/lib/utils";

export const Logo = ({ className, uniColor }) => {
  return (
    <>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)] text-3xl font-bold">
        Data Drive{" "}
      </span>
    </>
  );
};
