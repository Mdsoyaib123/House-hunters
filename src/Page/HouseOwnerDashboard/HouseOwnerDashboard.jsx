import { useContext, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { DatePicker } from "antd";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

const HouseOwnerDashboard = () => {
  const [date, setDate] = useState([]);
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);

  const { data, refetch } = useQuery({
    queryKey: ["houseData"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/houseData");
      return res.data;
    },
  });
  //   console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const houseName = form.houseName.value;
    const address = form.address.value;
    const roomSize = form.roomSize.value;
    const city = form.city.value;
    const Bedrooms = form.bedrooms.value;
    const Bathrooms = form.bathrooms.value;
    const Picture = form.picture.value;
    const PhoneNumber = form.number.value;
    const rentPerMonth = form.rentPerMonth.value;
    const des = form.des.value;

    const HouseData = {
      email: user?.email,
      houseName,
      address,
      roomSize,
      city,
      date,
      Bedrooms,
      Bathrooms,
      Picture,
      PhoneNumber,
      rentPerMonth,
      des,
    };
    axios.post("http://localhost:5000/houseData", HouseData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        refetch();
      }
    });
  };
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
          .delete(`http://localhost:5000/houseDataDelete/${id}`)
          .then((res) => {
            console.log(res.data);
            refetch();
            toast.success("Successfully Deleted");
          });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="flex justify-between ">
          <h1 className="font-bold ">Total House Added : {data?.length} </h1>
          <button onClick={() => setModal(true)} className="btn btn-sm ">
            Add New House
          </button>
        </div>

        <div className="">
          <PureModal
            width="80%"
            isOpen={modal}
            //   closeButton="close"
            //   closeButtonPosition="bottom"
            onClose={() => {
              setModal(false);
              return true;
            }}
          >
            <h1 className="text-center text-3xl font-bold">Add New House </h1>
            <form onSubmit={handleSubmit} className="space-y-3 px-4 py-2">
              <div className="flex gap-5 items-center w-full">
                <div className="w-1/2">
                  <label> House Name : </label>
                  <input
                    type="text"
                    name="houseName"
                    required
                    className="w-full border px-2 py-1"
                  />
                </div>
                <div className="w-1/2">
                  <label> Address : </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full border px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="w-1/2">
                  <label> Room Size : </label>
                  <input
                    type="text"
                    name="roomSize"
                    required
                    className="w-full border px-2 py-1"
                  />
                </div>
                <div className="w-1/2">
                  <label> City : </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full border px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="w-1/2">
                  <label> Bedrooms : </label>
                  <input
                    type="number"
                    name="bedrooms"
                    required
                    className="w-full border px-2 py-1"
                  />
                </div>
                <div className="w-1/2">
                  <label> Bathrooms : </label>
                  <input
                    type="number"
                    required
                    name="bathrooms"
                    className="w-full border px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="w-1/2">
                  <label> Picture : </label>
                  <input
                    type="url"
                    required
                    name="picture"
                    className="w-full border px-2 py-1"
                  />
                </div>
                <div className="w-1/2">
                  <label> Phone Number : </label>
                  <input
                    type="tel"
                    pattern="\+8801[3-9]\d{8}"
                    required
                    name="number"
                    className="w-full border px-2 py-1"
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="w-1/2">
                  <label> Rent Per Month : </label>
                  <input
                    type="number"
                    required
                    name="rentPerMonth"
                    className="w-full border px-2 py-1"
                  />
                </div>
                <div className="w-1/2">
                  <label> Availability Date : </label>
                  <RangePicker
                    onChange={(value) =>
                      setDate(value.map((item) => item.format("YYYY-MM-DD")))
                    }
                  />
                </div>
              </div>
              <div className=" w-full">
                <label>Description : </label>
                <textarea
                  className="w-full border "
                  name="des"
                  id=""
                  cols=""
                  rows="4"
                ></textarea>
              </div>
              <input
                className="w-full btn btn-sm bg-blue-500 text-white"
                type="submit"
                value="Submit"
              />
            </form>
          </PureModal>
          ;
        </div>
      </div>
      <div>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-lg font-bold text-black">
              {/* <th>No.</th> */}
              <th>Image</th>
              <th>House Name</th>

              <th>City</th>
              <th>Bed Rooms</th>
              <th>Bath Rooms</th>
              <th>Room Size </th>
              <th>Rent Per Month </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((item, index) => (
              <tr className="" key={item._id}>
                {/* <th>{index + 1}</th> */}
                <th>
                  <img
                    className="rounded-full w-20"
                    src={item.Picture}
                    alt=""
                  />
                </th>
                <td>{item.houseName}</td>
                <td className=""> {item.city}</td>
                <td className=""> {item.Bedrooms}</td>
                <td className=""> {item.Bathrooms}</td>
                <td className=""> {item.roomSize}</td>
                <td className=""> {item.rentPerMonth}</td>
                <td className="flex gap-5 ">
                  <Link to={`/dashboard/houseOwnerDashboard/${item._id}`}>
                    <button className="btn btn-sm">
                      <AiOutlineEdit size={20}></AiOutlineEdit>
                    </button>
                  </Link>
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
    </div>
  );
};

export default HouseOwnerDashboard;
