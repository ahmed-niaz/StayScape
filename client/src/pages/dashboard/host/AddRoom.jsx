import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../api/utils";

const AddRoom = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("upload image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  // date range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  // From handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await uploadImage(image);
      const roomData = {
        location,
        category,
        title,
        price,
        total_guest,
        bedrooms,
        bathrooms,
        description,
        to,
        from,
        host,
        image: image_url,
      };
      console.table(roomData);
    } catch (err) {
      console.log(err);
    }
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <main>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
      />
    </main>
  );
};

export default AddRoom;
