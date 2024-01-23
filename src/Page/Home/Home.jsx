import Navbar from "../../Component/Navbar";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const loader = useLoaderData();
//   console.log(loader);
  return (
    <div>
      
      <div className="lg:w-[1200px] py-7 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {loader.map((item) => (
            <Link to={`/houseDetail/${item._id}`}  key={item._id}><div
            
            className="card card-compact w-96 bg-base-100 shadow-xl overflow-hidden"
          >
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
                <p className="font-semibold text-lg">$ {item.rentPerMonth}</p>
              </div>
              <div className="flex justify-between items-center gap-5 pb-3 font-mono">
                  <p>Beds : {item.Bedrooms}</p>
                  <p>Bath : {item.Bathrooms}</p>
                  <p>sq.ft. : {item.roomSize}</p>
              </div>
            </div>
          </div></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
