import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/shared/Loader";
import RoomDataRow from "../../../components/dashboard/table_rows/RoomDataRow";
import { toast } from "react-hot-toast";

const MyListings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // fetch room data
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-listings/${user?.email}`);
      return data;
    },
  });

  // delete data
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/room/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch()
      toast.success(`Successfully deleted`);
    },
  });

  // handle delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loader />;
  console.log(rooms);
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}{" "}
                  {rooms.map((room) => (
                    <RoomDataRow
                      key={room.id}
                      room={room}
                      refetch={refetch}
                      handleDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyListings;
