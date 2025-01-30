"use client";
import Box from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";
import { fetchCatData } from "@/store/fetchCatData";
import DeleteSubCat from "./DeleteSubCat";

const ShowSubCategory = () => {
  const { data }: any = fetchCatData();

  return (
    <Box>
      <h5 className="text-lg font-bold">Sub Categories</h5>
      <Separator className="my-5" />
      <div className="flex flex-wrap gap-2">
        {data.data?.map((items: any) => {
          if (items.subCat.length && items.subCat.length > 0) {
            return (
              <Box className="w-fit p-2" key={items.id}>
                <p className="font-bold mb-3 text-muted-foreground underline">
                  {items.catName}
                </p>
                <div className="flex  flex-wrap gap-1 items-center">
                  {items.subCat.map((subItems: any) => (
                    <div
                      className="border bg-zinc-900 flex items-center gap-2 rounded-lg p-1"
                      key={subItems.id}>
                      <p className="text-sm capitalize">
                        {subItems.subCatName}
                      </p>
                      <DeleteSubCat id={subItems.id} />
                    </div>
                  ))}
                </div>
              </Box>
            );
          }
        })}
      </div>
    </Box>
  );
};

export default ShowSubCategory;
