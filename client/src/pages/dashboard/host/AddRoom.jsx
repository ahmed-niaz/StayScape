import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("upload image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // date range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/room`, roomData);
      return data;
    },
    onSuccess: () => {
      console.log(`data saved successfully`);
      toast.success(`Room added successfully`);
      navigate("/dashboard/my-listings");
      setLoading(false);
    },

    onError: (err) => {
      console.log(`Room data ${err}`);
    },
  });

  // From handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      // post request to server
      await mutateAsync(roomData);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <main>
      <Helmet>
        <title>Add Room || Dashboard</title>
      </Helmet>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </main>
  );
};

export default AddRoom;
