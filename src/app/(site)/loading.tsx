import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Skeleton className="h-[320px] sm:h-[400px] lg:h-[480px]" />
          <div className="flex flex-col gap-4 lg:h-[480px] lg:gap-5">
            <Skeleton className="min-h-[88px] flex-1 lg:min-h-0" />
            <Skeleton className="min-h-[88px] flex-1 lg:min-h-0" />
            <Skeleton className="min-h-[88px] flex-1 lg:min-h-0" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-radar-border bg-background">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 lg:mt-12">
          <Skeleton className="h-10 w-full" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5">
            <Skeleton className="min-h-[320px] lg:min-h-[480px]" />
            <div className="grid min-h-[240px] grid-cols-2 grid-rows-2 gap-4 lg:min-h-[480px] lg:gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-full min-h-[100px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
