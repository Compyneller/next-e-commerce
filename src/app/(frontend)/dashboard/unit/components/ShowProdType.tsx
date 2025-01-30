"use client";
import Box from "@/components/ui/box";
import { fetchProdType } from "@/store/fetchProdType";
import { useEffect } from "react";
import DeleteProdType from "./DeleteProdType";

const ShowProdType = () => {
  const { data, fetchProdTypeData } = fetchProdType() as {
    data: any; // Replace 'any' with proper type if available
    fetchProdTypeData: () => void;
  };
  useEffect(() => {
    fetchProdTypeData();
  }, [fetchProdTypeData]);

  return (
    <Box>
      <h5 className="text-lg font-bold mb-4">Product Types</h5>
      <div className="flex flex-wrap gap-2 ">
        {data?.response?.map((item: any) => (
          <div
            className="border bg-zinc-900 flex items-center gap-2 rounded-lg p-1"
            key={item.id}>
            <p>{item.productType}</p>
            <DeleteProdType id={item.id} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ShowProdType;
