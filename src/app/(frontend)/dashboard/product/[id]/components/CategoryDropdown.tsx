"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCatData } from "@/store/fetchCatData";
import { catDataProps } from "../../../category/components/SubCategory";
import { subCategoryDropdownData } from "@/store/subCategoryDropdownData";
import Image from "next/image";
const CategoryDropdown = ({ field, product }: any) => {
  const { loading, data, fetchData }: any = fetchCatData();
  const setSubcategory = subCategoryDropdownData(
    (state: any) => state.setSubcategory
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryChange = (value: string) => {
    const selectedCategory = data.data.find(
      (item: catDataProps) => item.catName === value
    );
    if (selectedCategory) {
      setSubcategory(selectedCategory.subCat || []); // Update subcategory store
    }
    field.onChange(value); // Update form field value
  };

  return (
    <Select
      defaultValue={product?.category}
      onValueChange={handleCategoryChange}
      value={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={loading ? "Loading..." : "Select a category"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.data?.map((items: catDataProps) => (
            <SelectItem value={items.catName} key={items.id}>
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] relative rounded-full">
                  <Image
                    src={items.imgUrl}
                    alt="category Image"
                    className="object-cover rounded-full"
                    fill
                  />
                </div>
                <p className="capitalize">{items.catName}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryDropdown;
