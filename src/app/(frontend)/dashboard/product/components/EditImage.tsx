import { Button } from "@/components/ui/button";
import { ProductImages } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";

const EditImage = ({ prodImage }: { prodImage: ProductImages[] }) => {
  const handleImageDelete = async (index: number) => {
    try {
      const res = await axios.delete(`/api/delete-image`, {
        data: {
          public_id: prodImage[index].public_id,
          id: prodImage[index].id,
        },
      });
      if (res.status === 200) {
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {prodImage.map((image: ProductImages, index: number) => (
          <div className="relative h-40 w-full" key={image.id}>
            <Image
              src={image.imgUrl}
              alt="product image"
              fill
              className="object-cover"
            />
            <Button
              variant="destructive"
              size={"icon"}
              className="absolute top-2 right-2"
              onClick={() => handleImageDelete(index)}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditImage;
