"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewProductButton = () => {
  const router = useRouter();
  return (
    <Button
      className="mb-4"
      onClick={() => router.push("/dashboard/product/new")}>
      <Plus /> Add Product
    </Button>
  );
};

export default AddNewProductButton;
