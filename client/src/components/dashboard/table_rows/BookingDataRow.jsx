import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BookingDataRow = ({ booking, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  // delete data
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/booking/${id}`);
      return data;
    },
    onSuccess: async (data) => {
      console.log(`booking data just deleted`, data);
      refetch();
      toast.success(`Booking cancel`);

      // change room booked status back to false
      await axiosSecure.patch(`/room/status/${booking?.room_ID}`, {
        status: false,
      });
    },
  });
  // handle Delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={booking?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={booking?.guest?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {booking?.guest?.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${booking?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(booking?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(booking?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <button className="relative">Cancel</button>
        </button>
        {/* delete Modal */}
        <DeleteModal
          closeModal={closeModal}
          isOpen={isOpen}
          handleDelete={handleDelete}
          id={booking?._id}
        />
      </td>
    </tr>
  );
};

BookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
};

export default BookingDataRow;