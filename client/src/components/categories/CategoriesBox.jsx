import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoriesBox = ({ icon: Icon, label }) => {
  const [params,] = useSearchParams();
  const category = params.get("category");
  // console.log(params.get("category"));
  // console.log(category === label);
  const navigate = useNavigate();
  const handleClick = () => {
    let currentQuery = { category: label };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    console.log(url);
    navigate(url);
  };
  return (
    <main
      onClick={handleClick}
      className={`flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer ${
              category === label && "border-b-neutral-800 text-neutral-800"
            }`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </main>
  );
};
CategoriesBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};
export default CategoriesBox;
