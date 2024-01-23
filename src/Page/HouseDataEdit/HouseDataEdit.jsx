import { DatePicker } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
const { RangePicker } = DatePicker;

const HouseDataEdit = () => {
    const navigate = useNavigate()
  const loader = useLoaderData();
  //   console.log(loader);
  const [date, setDate] = useState([]);

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
    console.log(HouseData);

    axios
      .put(`http://localhost:5000/houseDataEdit/${loader._id}`, HouseData)
      .then((res) => {
        console.log(res.data);
        
            navigate('/dashboard/houseOwnerDashboard')
        
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 px-4 py-2">
        <h1 className="text-center text-3xl font-bold mb-6">
          Update house data{" "}
        </h1>
        <div className="flex gap-5 items-center w-full">
          <div className="w-1/2">
            <label> House Name : </label>
            <input
              type="text"
              name="houseName"
              defaultValue={loader.houseName}
              required
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="w-1/2">
            <label> Address : </label>
            <input
              type="text"
              name="address"
              defaultValue={loader.address}
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
              defaultValue={loader.roomSize}
              required
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="w-1/2">
            <label> City : </label>
            <input
              type="text"
              name="city"
              defaultValue={loader.city}
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
              defaultValue={loader.Bedrooms}
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
              defaultValue={loader.Bathrooms}
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
              defaultValue={loader.Picture}
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="w-1/2">
            <label> Phone Number : </label>
            <input
              type="tel"
              pattern="\+8801[3-9]\d{8}"
              defaultValue={loader.PhoneNumber}
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
              defaultValue={loader.rentPerMonth}
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
            className="w-full border px-4  "
            name="des"
            defaultValue={loader.des}
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
    </div>
  );
};

export default HouseDataEdit;
