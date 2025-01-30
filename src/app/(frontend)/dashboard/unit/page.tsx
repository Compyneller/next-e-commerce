import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import ShowProdType from "./components/ShowProdType";
import ShowUnit from "./components/ShowUnit";
import TypeForm from "./components/TypeForm";
import UnitForm from "./components/UnitForm";

const UnitPage = () => {
  return (
    <Container className="py-10">
      <Heading title="Unit" text="Create metric unit for your products" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UnitForm />
        <ShowUnit />
        <TypeForm />
        <ShowProdType />
      </div>
    </Container>
  );
};

export default UnitPage;
