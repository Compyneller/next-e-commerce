"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProdType } from "@/store/fetchProdType";
import { useEffect } from "react";
const ProdTypeDropDown = ({ field, product }: any) => {
  const { data, fetchProdTypeData }: any = fetchProdType();

  useEffect(() => {
    fetchProdTypeData();
  }, [fetchProdTypeData]);

  return (
    <Select
      defaultValue={product?.subCat}
      onValueChange={field.onChange}
      value={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.response?.map((items: any, index: number) => (
            <SelectItem
              className="capitalize"
              value={items.productType}
              key={index}>
              {items.productType}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProdTypeDropDown;
