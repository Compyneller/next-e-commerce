"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUnit } from "@/store/fetchUnit";
import { useEffect } from "react";
const UnitDropDown = ({ field, product }: any) => {
  const { data, fetchUnitData }: any = fetchUnit();

  useEffect(() => {
    fetchUnitData();
  }, [fetchUnitData]);

  return (
    <Select
      defaultValue={product?.subCat}
      onValueChange={field.onChange}
      value={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.response?.map((items: any, index: number) => (
            <SelectItem
              className="capitalize"
              value={items.unitName}
              key={index}>
              {items.unitName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UnitDropDown;
