"use client";
import React, { useEffect } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";
import { fetchProduct } from "@/store/fetchProduct";

const ProductList = () => {
  const { loading, data, fetchProductData }: any = fetchProduct();
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={data?.product || []} />
      )}
    </>
  );
};

export default ProductList;
