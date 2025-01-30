import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { fetchUnit } from "@/store/fetchUnit";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteUnit = ({ id }: { id: string }) => {
  const { fetchUnitData }: any = fetchUnit();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete("/api/unit", { data: { id } });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchUnitData();
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
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

export default DeleteUnit;
