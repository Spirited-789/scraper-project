import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* ===== HEADER ===== */}
        <div className="space-y-5">
          <Skeleton className="h-12 w-[340px] bg-[#111]" />
          <Skeleton className="h-4 w-[520px] bg-[#111]" />
        </div>

        {/* ===== KPI ROW ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 space-y-4"
            >
              <Skeleton className="h-4 w-24 bg-[#111]" />
              <Skeleton className="h-8 w-32 bg-[#111]" />
              <Skeleton className="h-3 w-full bg-[#111]" />
            </div>
          ))}
        </div>

        {/* ===== CHARTS SECTION ===== */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-72 bg-[#111]" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 space-y-4"
              >
                <Skeleton className="h-4 w-40 bg-[#111]" />
                <Skeleton className="h-[360px] w-full bg-[#111]" />
              </div>
            ))}
          </div>
        </div>

        {/* ===== FULL-WIDTH CHART ===== */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-80 bg-[#111]" />

          <div className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 space-y-4">
            <Skeleton className="h-4 w-48 bg-[#111]" />
            <Skeleton className="h-[380px] w-full bg-[#111]" />
          </div>
        </div>
      </div>
    </div>
  );
}
