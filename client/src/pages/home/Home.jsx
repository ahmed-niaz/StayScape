import { Helmet } from "react-helmet-async";
import Rooms from "../../components/home/Rooms";
import Categories from "../../components/categories/Categories";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>StayScape||Home</title>
      </Helmet>
      <Categories/>
      <Rooms />
    </main>
  );
};

export default Home;
