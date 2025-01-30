import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { fetchProdType } from "@/store/fetchProdType";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteProdType = ({ id }: { id: string }) => {
  const { fetchProdTypeData }: any = fetchProdType();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete("/api/type", { data: { id } });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchProdTypeData();
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
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

export default DeleteProdType;
