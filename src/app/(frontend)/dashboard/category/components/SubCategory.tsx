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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { fetchCatData } from "@/store/fetchCatData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface catDataProps {
  id: number;
  catName: string;
  createdAt: Date;
  imgUrl: string;
  public_id: string;
  userId: number;
  subCat: any[];
}

const SubCategory = () => {
  const [loading, setLoading] = useState(false);
  const { data, fetchData }: any = fetchCatData();

  const categorySchema = z.object({
    subCatName: z.string().min(1).max(50),
    catId: z.string().min(1).max(50),
  });

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      subCatName: "",
      catId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      setLoading(true);

      await axios.post("/api/subcategory", values);
      fetchData();
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box>
      <h5 className="text-lg font-bold">Add Sub Category (optional)</h5>
      <Separator className="my-5" />

      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="catId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data.data?.map((items: catDataProps) => (
                          <SelectItem
                            value={items.id.toString()}
                            key={items.id}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={items.imgUrl}
                                alt="category Image"
                                width={20}
                                height={20}
                                className="object-cover rounded-full"
                              />
                              <p>{items.catName}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCatName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} size="sm">
            <Spinner loading={loading} /> Submit
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default SubCategory;
