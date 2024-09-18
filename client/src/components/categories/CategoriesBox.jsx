import PropTypes from "prop-types";
const CategoriesBox = ({ icon: Icon, label }) => {
  return (
    <main
      className={`flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </main>
  );
};
CategoriesBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};
export default CategoriesBox;
