"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { fetchCatData } from "@/store/fetchCatData";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type bodyType = {
  id: string;
  public_id: string;
};
const DeleteCategory = ({ items }: any) => {
  const [loading, setLoading] = useState(false);
  const { fetchData }: any = fetchCatData();

  const handleDelete = async () => {
    try {
      const body: bodyType = {
        id: items.id,
        public_id: items.public_id,
      };
      setLoading(true);
      const delImgRes = await axios.delete("/api/delete-image", {
        data: body,
      });

      if (delImgRes?.status === 200 && delImgRes?.data?.result === "ok") {
        await axios.delete("/api/category", { data: body });
        toast.success("Category Deleted");
        fetchData();
        setLoading(false);
      } else {
        return;
      }
    } catch (error: any) {
      console.log(error.message);

      toast.error("Error while deleting category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      size="icon"
      variant={"destructive"}
      onClick={handleDelete}>
      {loading ? <Spinner loading={loading} /> : <Trash />}
    </Button>
  );
};

export default DeleteCategory;
