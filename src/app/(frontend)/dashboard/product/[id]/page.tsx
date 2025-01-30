import Box from "@/components/ui/box";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { prismadb } from "@/db/db.config";
import AddProdForm from "./components/AddProdForm";
import ProductImages from "./components/ProductImages";
import ImageContainer from "./components/ImageContainer";

interface ProductImages {
  id: string;
  imgUrl: string;
  public_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface productProps {
  id: string;
  prodName: string;
  category: string;
  mrp: number;
  price: number;
  subCat: string;
  stocks: number;
  unit: string;
  dimension: string;
  type: string;
  desc: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  prodImage: ProductImages[];
}

export default async function AddProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const product: any = await prismadb.product.findFirst({
    where: {
      id: id,
    },
    include: {
      prodImage: true,
    },
  });

  return (
    <Container className="py-10">
      <Heading
        title={product ? "Edit Product" : "Add Product"}
        text={
          product
            ? "Change the default value to edit the form"
            : "Fill the form to add a new product"
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box>
          <AddProdForm product={product} />
        </Box>
        <ImageContainer product={product} />
      </div>
    </Container>
  );
}
