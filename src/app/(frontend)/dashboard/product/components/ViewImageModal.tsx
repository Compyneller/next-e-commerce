import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductImages } from "@prisma/client";
import EditImage from "./EditImage";
import { Button } from "@/components/ui/button";

const ViewImageModal = ({ prodImage }: { prodImage: ProductImages[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={(e) => e.stopPropagation()}>
          View Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>View Image</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditImage prodImage={prodImage} />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewImageModal;
