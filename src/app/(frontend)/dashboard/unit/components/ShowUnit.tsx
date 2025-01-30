"use client";
import Box from "@/components/ui/box";
import { fetchUnit } from "@/store/fetchUnit";
import React, { useEffect } from "react";
import DeleteUnit from "./DeleteUnit";

const ShowUnit = () => {
  const { data, fetchUnitData } = fetchUnit() as {
    data: any; // Replace 'any' with proper type if available
    fetchUnitData: () => void;
  };
  useEffect(() => {
    fetchUnitData();
  }, [fetchUnitData]);

  return (
    <Box>
      <h5 className="text-lg font-bold mb-4">Units</h5>
      <div className="flex flex-wrap gap-2 ">
        {data?.response?.map((item: any) => (
          <div
            className="border bg-zinc-900 flex items-center gap-2 rounded-lg p-1"
            key={item.id}>
            <p className="text-lg font-bold">{item.unitName}</p>
            <DeleteUnit id={item.id} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ShowUnit;
