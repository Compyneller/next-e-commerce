import { Skeleton } from "@/components/ui/skeleton";

const CatSkeleton = () => {
  const array = new Array(Number(5)).fill(0);

  return (
    <div className="w-full gap-3 flex-wrap flex items-center">
      {array.map((_item, index) => (
        <div
          className="p-1 rounded-lg   border flex items-center gap-3"
          key={index}>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-[30px] w-[30px] rounded-full object-cover" />
            <Skeleton className="w-[40px] h-[5px]" />
          </div>
          <Skeleton className="h-10 w-10" />
        </div>
      ))}
    </div>
  );
};

export default CatSkeleton;
