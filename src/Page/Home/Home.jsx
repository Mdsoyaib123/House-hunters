import { useState } from "react";
import Navbar from "../../Component/Navbar";
import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const { totalUser } = useLoaderData();

  const [search, setSearch] = useState("");

  const [houses, setHouses] = useState([]);
  const { data: allData, refetch } = useQuery({
    queryKey: ["houseData"],
    queryFn: async () => {
      const res = await axios.get(
        `https://house-hunter-server-eight-gamma.vercel.app/houseData?page=${currentPage}&&size=${itemPerPage}`
      );
      setHouses(res.data);
      return res.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const numberOfPages = Math.ceil(totalUser / itemPerPage);

  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  const handelItemPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemPerPage(val);
    setCurrentPage(0);
  };
  const handlePrev = () => {
    refetch();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    refetch();
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBtn = (page) => {
    refetch();
    setCurrentPage(page);
  };

  const [roomSize, setRoomSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  console.log(roomSize, bedrooms, bathrooms);
  const filterHouses = () => {
    const roomSizeFilter = parseFloat(roomSize) || 0;
    const bedroomsFilter = parseInt(bedrooms) || 0;
    const bathroomsFilter = parseInt(bathrooms) || 0;

    const filteredHouses = houses.filter((house) => {
      return (
        house.roomSize >= roomSizeFilter &&
        house.bedrooms >= bedroomsFilter &&
        house.bathrooms >= bathroomsFilter
      );
    });

    setHouses(filteredHouses);
  };
  const resetFilters = () => {
    setRoomSize("");
    setBedrooms("");
    setBathrooms("");
    setHouses(houses);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter data based on the search term
    const filteredData = houses.filter((item) =>
      search.toLowerCase === ""
        ? item
        : item.houseName.toLowerCase().includes(value)
    );
    refetch();
    // Update the component state with the filtered data
    setHouses(filteredData);
  };

  return (
    <div>
      <div className="lg:w-[1200px] py-7 mx-auto">
        <div className="py-10">
          <div className="w-full flex justify-center items-center">
            <label className="text-black text-2xl  font-bold">
              Search by name :
            </label>{" "}
            &nbsp;
            <input
              onChange={handleSearch}
              className="border w-2/3 border-black px-3 py-1 rounded"
              type="text"
              placeholder="type here"
            />
          </div>

          <div className="flex justify-center gap-5 items-center py-10">
            <label>
              Room Size : &nbsp;
              <input
                type="number"
                className="border px-2"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
              />
            </label>

            <label>
              Bedrooms: &nbsp;
              <input
                className="border px-2"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </label>

            <label>
              Bathrooms: &nbsp;
              <input
                className="border px-2"
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </label>

            <button className="btn btn-sm " onClick={filterHouses}>
              Apply{" "}
            </button>

            <button className="btn btn-sm " onClick={resetFilters}>
              Reset{" "}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {houses.map((item) => (
            <Link to={`/houseDetail/${item._id}`} key={item._id}>
              <div className="card card-compact w-96 bg-base-100 shadow-xl overflow-hidden">
                <figure>
                  <img
                    className="object-cover object-center h-64 w-full"
                    src={item.Picture}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex gap-40 items-center justify-between">
                    <h2 className="card-title">{item.houseName}</h2>
                    <p className="font-semibold text-lg">
                      $ {item.rentPerMonth}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-5 pb-3 font-mono">
                    <p>Beds : {item.Bedrooms}</p>
                    <p>Bath : {item.Bathrooms}</p>
                    <p>sq.ft. : {item.roomSize}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination justify-center flex gap-8 mt-10 lg:ml-32">
          <button
            className="btn btn-sm btn-active btn-neutral"
            onClick={handlePrev}
          >
            prev
          </button>
          {pages.map((page) => (
            <button
              className={
                currentPage === page
                  ? "selected btn-outline btn-sm  btn"
                  : "btn btn-sm"
              }
              // onClick={() => setCurrentPage(page)}
              onClick={() => handleBtn(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-sm btn-active btn-neutral"
            onClick={handleNext}
          >
            next
          </button>

          {/* <select
            value={itemPerPage}
            onChange={handelItemPerPage}
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
