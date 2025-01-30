import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { fetchProduct } from "@/store/fetchProduct";

const DeleteProduct = ({ allPublicId, productId }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchProductData }: any = fetchProduct();
  const handleDelete = async () => {
    // ------------------------delete image-------------------------------
    try {
      const res = await axios.delete("/api/product/image", {
        data: {
          public_id: allPublicId,
        },
      });
      console.log(res);
      if (res.status === 200) {
        const res2 = await axios.delete(`/api/product`, {
          data: {
            productId: productId,
          },
        });
        console.log(res2);
      }
      setIsOpen(false);
      fetchProductData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full"
          size={"sm"}
          onClick={(e) => e.stopPropagation()}>
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
