"use client";

import { Button } from "@/components/ui/button";
import placeHolderImage from "@/assets/photo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Edit, MoreHorizontal, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import DeleteWithoutImage from "./DeleteWithoutImage";
import ViewImageModal from "./ViewImageModal";
export type Product = {
  id: string;
  prodName: string;
  category: string;
  subCat: string;
  mrp: number;
  price: number;
  stocks: number;
  prodImage: any;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "prodName",

    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize text-center">{row.getValue("prodName")}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize text-center">{row.getValue("category")}</div>
      );
    },
  },
  {
    accessorKey: "subCat",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Sub Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize text-center">
          {row.getValue("subCat") || "None"}
        </div>
      );
    },
  },
  {
    accessorKey: "mrp",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          M.R.P
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          }).format(row.getValue("mrp"))}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          }).format(row.getValue("price"))}
        </div>
      );
    },
  },
  {
    accessorKey: "stocks",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stocks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">{row.getValue("stocks")}</div>
      );
    },
  },
  {
    accessorKey: "prodImage",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="h-10 w-10 rounded-full relative">
          <Image
            src={row.original?.prodImage[0]?.imgUrl || placeHolderImage}
            alt="Product image"
            fill
            className="object-cover rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className=" font-medium">
          {format(row.getValue("createdAt"), "dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div className=" font-medium">
          {format(row.getValue("updatedAt"), "dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const allPublicId: any = row.original.prodImage.map((item: any) => {
        return item.public_id;
      });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                className="text-blue-500 flex items-center gap-2"
                href={`/dashboard/product/${row.original.id}`}>
                <Edit /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {row.original.prodImage.length > 0 ? (
                <ViewImageModal prodImage={row.original.prodImage} />
              ) : (
                <Link
                  className="text-blue-500 flex items-center gap-2"
                  href={`/dashboard/product/${row.original.id}`}>
                  <Upload /> Upload Image
                </Link>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {row.original.prodImage.length > 0 ? (
                <DeleteProduct
                  allPublicId={allPublicId}
                  productId={row.original.id}
                />
              ) : (
                <DeleteWithoutImage productId={row.original.id} />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
