const Register = () => {
  return (
    <div className="bg-base-300 h-screen flex justify-center items-center">
      <div className="w-1/4 text-gray-600">
        <h1 className="text-center pb-4 text-4xl">Dashboard</h1>
        <form className=" bg-white shadow-xl w-full px-6 space-y-4 py-5 ">
        <img
            className="w-20 mx-auto"
            src="https://i.postimg.cc/W1kk8NZg/logo.png"
            alt=""
          />
          <p className="text-center font-bold py-1">Register a new membership</p>
          <input
            className="w-full border px-2 py-1 "
            type="text"
            name=""
            placeholder="Full name "
          />

          <input
            className="w-full border px-2 py-1 "
            type="text"
            name=""
            placeholder="Phone number "
          />
          <select name="" className="w-full border px-2 py-1">
            <option value="select" disabled>
              Select Role{" "}
            </option>
            <option value="House Owner">House Owner</option>
            <option value="House Renter">House Renter</option>
          </select>
          <input
            className="w-full border px-2 py-1 "
            type="email"
            name=""
            placeholder="Email "
          />
          <input
            className="w-full border px-2 py-1 "
            type="password"
            name=""
            placeholder="Password "
          />
          <input className="w-full py-1  cursor-pointer bg-blue-600 text-white " type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
