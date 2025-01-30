"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subCategoryDropdownData } from "@/store/subCategoryDropdownData";
const SubCatDropDown = ({ field, product }: any) => {
  const subcategory = subCategoryDropdownData(
    (state: any) => state.subcategory
  );

  return (
    <Select
      defaultValue={product?.subCat}
      onValueChange={field.onChange}
      value={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Sub Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {subcategory?.length > 0 ? (
            subcategory?.map((items: any, index: number) => (
              <SelectItem
                className="capitalize"
                value={items.subCatName}
                key={index}>
                {items.subCatName}
              </SelectItem>
            ))
          ) : (
            <SelectItem className="capitalize" value="no">
              No Sub Category Found
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubCatDropDown;
