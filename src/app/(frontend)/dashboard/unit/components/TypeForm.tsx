"use client";
import Spinner from "@/components/spinner";
import Box from "@/components/ui/box";
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
import { fetchProdType } from "@/store/fetchProdType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const TypeForm = () => {
  const { fetchProdTypeData }: any = fetchProdType();
  const [imgLoading, setImgLoading] = useState(false);
  const categorySchema = z.object({
    productType: z.string().min(1).max(50),
  });
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      productType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    console.log(values);

    try {
      setImgLoading(true);
      const response: any = await axios.post("/api/type", values);

      if (response.status === 200 && response.data.success) {
        toast.success("Product type create successfully");
        fetchProdTypeData();
        form.reset();
      } else {
        toast.error("Unknown Error");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    } finally {
      setImgLoading(false);
    }
  }
  return (
    <Box className="w-full space-y-3">
      <h5 className="text-lg font-bold">
        Add Product Type (clothing, electronics, etc)
      </h5>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="col-span-3">
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="clothing, electronics, etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={imgLoading} size="sm">
                <Spinner loading={imgLoading} /> Create product type
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Box>
  );
};

export default TypeForm;
