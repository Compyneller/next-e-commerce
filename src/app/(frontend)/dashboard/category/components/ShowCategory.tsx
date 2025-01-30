"use client";
import CatSkeleton from "@/components/category-skeleton";
import Box from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";
import { fetchCatData } from "@/store/fetchCatData";
import Image from "next/image";
import { useEffect } from "react";
import DeleteCategory from "./DeleteCategory";

const ShowCategory = () => {
  const { data, fetchData, loading, error }: any = fetchCatData();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box className="w-full space-y-3">
      <h5 className="text-lg font-bold">All Categories</h5>
      <Separator />
      {loading ? (
        <CatSkeleton />
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className="w-full gap-1  flex-wrap flex items-center">
          {data?.data?.length === 0 ? (
            <p className="text-center font-bold text-red-500">No data found</p>
          ) : (
            data?.data?.map((items: any) => (
              <div
                className="p-1 rounded-lg bg-zinc-900  border flex items-center gap-3"
                key={items.id}>
                <div className="flex  gap-2 items-center">
                  <div className=" h-[30px] w-[30px] overflow-hidden rounded-full relative">
                    <Image
                      src={items.imgUrl}
                      alt="cat img"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>

                  <p className="capitalize text-xs">{items.catName}</p>
                </div>
                <DeleteCategory items={items} />
              </div>
            ))
          )}
        </div>
      )}
    </Box>
  );
};

export default ShowCategory;
