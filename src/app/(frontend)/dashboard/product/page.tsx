import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import AddNewProductButton from "./components/AddNewProductButton";
import ProductList from "./components/ProductList";

export default async function Product() {
  return (
    <Container className="py-10 ">
      <Heading title="Product" text="All product list" />
      <AddNewProductButton />
      <ProductList />
    </Container>
  );
}
