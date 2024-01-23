import { Link, useLoaderData } from "react-router-dom";
import { LuDelete } from "react-icons/lu";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const HouseRanterDashboard = () => {
//   const loader = useLoaderData();
//   console.log(loader);
  
  const { data:loader=[], refetch } = useQuery({
    queryKey: ["houseBookingData"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/bookingData");
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/bookingData/${id}`)
            .then((res) => {
              console.log(res.data);
              refetch()
              toast.success("Successfully Deleted");
            });
        }
      });
  };
  return (
    <div>
        <h1 className="text-3xl font-bold text-center pb-10">House Booking Information </h1>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-lg font-bold text-black">
            {/* <th>No.</th> */}
            <th>No</th>
            <th>House Name</th>

            <th>Name </th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Rent Per Month </th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {loader?.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item.houseName}</td>
              <td className=""> {item.name}</td>
              <td className=""> {item.email}</td>
              <td className=""> {item.phoneNumber}</td>
              <td className=""> {item.rentPerMonth}</td>
              <td className=" ">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm"
                >
                  <LuDelete size={20}></LuDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseRanterDashboard;
