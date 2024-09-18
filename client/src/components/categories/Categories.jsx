import Container from "../shared/Container";
import CategoriesBox from "./CategoriesBox";
import { categories } from "./CategoryData";

const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoriesBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
