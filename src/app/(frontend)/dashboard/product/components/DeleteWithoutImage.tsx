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
import toast from "react-hot-toast";

const DeleteWithoutImage = ({ productId }: any) => {
  const [loading, setLoading] = useState(false);
  const { fetchProductData }: any = fetchProduct();
  const handleDelete = async () => {
    // ------------------------delete image-------------------------------

    try {
      setLoading(true);
      const res = await axios.delete(`/api/product`, {
        data: {
          productId: productId,
        },
      });
      if (res.status === 200) {
        setLoading(false);
        fetchProductData();
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWithoutImage;
