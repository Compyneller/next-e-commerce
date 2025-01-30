import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { fetchCatData } from "@/store/fetchCatData";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteSubCat = ({ id }: { id: string }) => {
  const { fetchData }: any = fetchCatData();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/subcategory", { data: id });
      toast.success("Category Deleted");
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant={"destructive"} size={"smIcon"} onClick={handleDelete}>
      {loading ? <Spinner loading={loading} /> : <Trash />}
    </Button>
  );
};

export default DeleteSubCat;
