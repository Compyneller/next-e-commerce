"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productProps } from "../page";
import UploadButton from "./UploadButton";

const ProductImages = ({ product }: { product: productProps }) => {
  const [prevImages, setPrevImages] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product?.id && !localStorage.getItem("productId")) {
      toast.error(
        "Product not found please create product first or select product from product page"
      );
      return;
    }
    const files = Array.from(e.target.files || []);
    if (files) {
      if (files.length > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }
      setImages((prev) => [...prev, ...files]);
      const imagePreviews = files.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setPrevImages((prev) => [...prev, ...imagePreviews]);
    }
  };
  const deleteImage = (index: number) => {
    setPrevImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex items-center flex-wrap gap-2">
        <div className="w-fit mb-5 h-fit relative ">
          <Button>
            <ImagePlus /> Add Product Images
          </Button>
          <Input
            type="file"
            className="opacity-0 absolute inset-0"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <UploadButton
          images={images}
          setPrevImages={setPrevImages}
          setImages={setImages}
          productId={product?.id || localStorage.getItem("productId") || ""}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {prevImages.map((image: any, index: number) => (
          <div className="w-full relative h-[150px]" key={image.name}>
            <Image
              src={image.preview}
              alt="product image"
              fill
              className="object-cover h-[150px] w-full"
            />
            <Button
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => deleteImage(index)}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
