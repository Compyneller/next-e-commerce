"use client";
import Box from "@/components/ui/box";
import ProductImages from "./ProductImages";
import { productProps } from "../page";
import { useEffect } from "react";

const ImageContainer = ({ product }: { product: productProps }) => {
  useEffect(() => {
    localStorage.getItem("productId");
  }, [product]);
  return (
    <>
      {product || localStorage.getItem("productId") ? (
        <Box>
          <ProductImages product={product} />
        </Box>
      ) : null}
    </>
  );
};

export default ImageContainer;
