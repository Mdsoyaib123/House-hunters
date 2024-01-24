import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const HouseDetail = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);
  const loader = useLoaderData();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const houseName = form.houseName.value;
    const rentPerMonth = form.rentPerMonth.value;
    const date = form.date.value;
    const bookingData = {
      name,
      email,
      phoneNumber,
      houseName,
      rentPerMonth,
      date,
    };

    axios
      .post(
        "https://house-hunter-server-eight-gamma.vercel.app/bookingData",
        bookingData
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          toast.error("You can not book house more than 2 ");
        }
        if (res.data.insertedId) {
          toast.success("House Booking Successfully");
          navigate('/')
        }
      });
  };
  return (
    <div className="lg:w-[1200px] py-8 mx-auto">
      <img className="w-full  mx-auto h-[500px] " src={loader.Picture} alt="" />

      <div className="text-black font-semibold w-full  flex gap-10 my-16">
        <div className="w-1/2 border-l-2 border-blue-600 pl-4">
          <h1 id="room_name" className="text-xl font-bold">
            {loader.houseName}
          </h1>
          <p>
            {" "}
            <span className="text-lg font-bold"></span> {loader.des}
          </p>
        </div>
        <div className="w-1/2 border-l-2 pl-4 space-y-4 border-blue-600">
          <p>
            <span className="text-xl font-bold">Room Size</span> :{" "}
            <span className="text-lg ">{loader.roomSize}</span>
          </p>

          {/* {availability ? (
            <p>
              {" "}
              <span className="text-2xl font-bold">Availability</span> :
              Available{" "}
            </p>
          ) : (
            ""
          )} */}
          <p>
            {" "}
            <span className="text-xl font-bold">Price per Month</span> :{" "}
            <span className=" text-lg "> $ {loader.rentPerMonth}</span>
          </p>
          <p>
            {" "}
            <span className="text-xl font-bold">City</span> :{" "}
            <span className=" text-lg "> {loader.city}</span>
          </p>

          <p>
            {" "}
            <span className="text-xl font-bold">Available date</span> :{" "}
            <span className=" text-lg ">
              {" "}
              {loader.date[0]} to {loader.date[1]}
            </span>
          </p>

          <div className="flex justify-end ">
            {user?.role === "House Renter" ? (
              <button
                onClick={() => setModal(true)}
                className="btn bg-blue-600 text-white w-full"
              >
                Book Now{" "}
              </button>
            ) : (
              <button
                onClick={() => setModal(true)}
                disabled
                className="btn bg-blue-600   text-white w-full"
              >
                UNAVAILABLE{" "}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <PureModal
          width="30%"
          isOpen={modal}
          //   closeButton="close"
          //   closeButtonPosition="bottom"
          onClose={() => {
            setModal(false);
            return true;
          }}
        >
          <h1 className="text-center text-xl font-bold">House Book Now </h1>
          <form onSubmit={handleSubmit} className="space-y-3 px-4 py-2">
            <div className="">
              <label> Name : </label>
              <input
                type="text"
                value={user?.name}
                name="name"
                required
                className="w-full border px-2 py-1"
              />
            </div>

            <div className="">
              <label> Email : </label>
              <input
                type="text"
                name="email"
                value={user?.email}
                required
                className="w-full border px-2 py-1"
              />
            </div>
            <div className="">
              <label> Phone Number : </label>
              <input
                type="tel"
                pattern="\+8801[3-9]\d{8}"
                name="phoneNumber"
                required
                className="w-full border px-2 py-1"
              />
            </div>
            <div className="">
              <label> House Name : </label>
              <input
                type="text"
                name="houseName"
                required
                className="w-full border px-2 py-1"
              />
            </div>
            <div className="">
              <label> Rent Per Month : </label>
              <input
                type="text"
                name="rentPerMonth"
                required
                className="w-full border px-2 py-1"
              />
            </div>
            <div className="">
              <label> Date : </label>
              <input
                type="date"
                name="date"
                required
                className="w-full border px-2 py-1"
              />
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
  );
};

export default HouseDetail;
