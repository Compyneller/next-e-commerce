"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Spinner from "@/components/spinner";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { productProps } from "../page";
import CategoryDropdown from "./CategoryDropdown";
import SubCatDropDown from "./SubCatDropDown";
import UnitDropDown from "./UnitDropDown";
import ProdTypeDropDown from "./ProdTypeDropdown";
const AddProdForm = ({ product }: { product: productProps }) => {
  const [imgLoading, setImgLoading] = useState(false);
  const categorySchema = z.object({
    prodName: z
      .string({
        required_error: "Product name is required",
      })
      .min(1)
      .max(50),
    category: z
      .string({
        required_error: "Please select category",
      })
      .min(1)
      .max(50),
    subCat: z
      .string({
        required_error: "Please select sub category",
      })
      .max(50)
      .optional(),
    mrp: z.string({
      required_error: "M.R.P is required",
    }),
    price: z.string({
      required_error: "Price is required",
    }),
    stocks: z.string({
      required_error: "Stocks is required",
    }),
    unit: z.string({
      required_error: "Unit is required",
    }),
    dimension: z.string({
      required_error: "Dimension is required",
    }),
    type: z.string({
      required_error: "Type of product is required",
    }),
    desc: z
      .string({
        required_error: "Enter product description",
      })
      .min(1),
  });

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      prodName: product?.prodName || "",
      category: product?.category || "",
      subCat: product?.subCat || "",
      mrp: product?.mrp.toString() || "",
      price: product?.price.toString() || "",
      stocks: product?.stocks.toString() || "",
      unit: product?.unit || "",
      dimension: product?.dimension || "",
      type: product?.type || "",
      desc: product?.desc || "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      setImgLoading(true);
      const res = await axios.post("/api/product", values);
      console.log(res);

      localStorage.setItem("productId", res.data.product.id);

      setImgLoading(false);
      if (res.data.success) {
        toast.success(
          `${res.data.message} ${res.data.product.prodName} is created successfully now upload product image`
        );
        form.reset();
      }
    } catch (error: any) {
      setImgLoading(false);
      console.log(error);

      toast.error(error.response.data.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="prodName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <CategoryDropdown product={product} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <SubCatDropDown product={product} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mrp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>M.R.P</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter M.R.P" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stocks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stocks</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number of stocks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <UnitDropDown product={product} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimension"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimension</FormLabel>
                <FormControl>
                  <Input placeholder="Enter dimension" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of product</FormLabel>
                <FormControl>
                  <ProdTypeDropDown product={product} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-3" type="submit" disabled={imgLoading} size="sm">
          <Spinner loading={imgLoading} /> Create Product
        </Button>
      </form>
    </Form>
  );
};

export default AddProdForm;
