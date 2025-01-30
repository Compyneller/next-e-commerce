"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import imageCompression from "browser-image-compression";

import PrevImg from "@/components/ui/PrevImg";
import { handleUploadImage } from "@/helpers/handleUploadImage";
import { fetchCatData } from "@/store/fetchCatData";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";

const CreateCategory = () => {
  const [imgLoading, setImgLoading] = useState(false);
  const { fetchData }: any = fetchCatData();

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

  const categorySchema = z.object({
    catName: z.string().min(1).max(50),
    image: z
      .instanceof(File, { message: "Must be a valid file" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 5MB",
      })
      .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
        message: "Invalid file type. Only JPEG or PNG allowed",
      }),
  });

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      catName: "",
    },
  });

  const prevImg = form.watch("image");

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    console.log(values.image);

    try {
      setImgLoading(true);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 50,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(values.image, options);

      const res: any = await handleUploadImage(
        compressedFile,
        "category-images"
      );

      if (res.data.success && res.status === 200) {
        toast.success("Image Upload Successfully");
        const body = {
          catName: values.catName,
          imgUrl: res?.data?.result?.secure_url,
          public_id: res?.data?.result?.public_id,
        };

        const response: any = await axios.post("/api/category", body);
        if (response.status === 200 && response.data.success) {
          fetchData();
          toast.success("Category create successfully");
          form.reset();
          const fileInputElement = document.getElementById(
            "file"
          ) as HTMLInputElement;
          if (fileInputElement) fileInputElement.value = "";
        } else {
          toast.error("Unknown Error");
        }
      } else {
        toast.error("Image Upload Failed");
      }

      // Clear the file input field
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setImgLoading(false);
    }
  }
  return (
    <Box className="w-full space-y-3">
      <h5 className="text-lg font-bold">Add Category</h5>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="col-span-3">
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="catName"
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Image</FormLabel>
                    <FormControl>
                      <div className="relative cursor-pointer w-fit h-fit">
                        <Input
                          accept="image/jpeg, image/png"
                          id="file"
                          type="file"
                          className=" cursor-pointer  opacity-0 absolute inset-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file); // Set the file in the form state
                          }}
                        />
                        <Button variant={"secondary"} size={"sm"}>
                          <ImagePlus /> Choose Image
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={imgLoading} size="sm">
                <Spinner loading={imgLoading} /> Create category
              </Button>
            </form>
          </Form>
        </div>
        <div className="col-span-2">
          <PrevImg loading={imgLoading} prevImg={prevImg} />
        </div>
      </div>
    </Box>
  );
};

export default CreateCategory;
