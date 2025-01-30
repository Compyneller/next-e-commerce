import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import CreateCategory from "./components/create-cat-form";
import ShowCategory from "./components/ShowCategory";
import SubCategory from "./components/SubCategory";
import ShowSubCategory from "./components/ShowSubCategory";

export default async function Category() {
  return (
    <Container className="py-10 ">
      <Heading title="Category" text="Fill the details to create category" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CreateCategory />
        <ShowCategory />
        <SubCategory />
        <ShowSubCategory />
      </div>
    </Container>
  );
}
