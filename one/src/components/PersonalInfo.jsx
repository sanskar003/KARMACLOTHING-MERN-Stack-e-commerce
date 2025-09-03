import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../slices/authSlice.js";
import { toast } from "react-toastify";

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const iconMap = {
    //https://img.icons8.com/?size=100&id=v6RytYHGOOxq&format=png&color=000000
    street: "GCo0HIceD8yd&", // Home icon
    city: "iU7UIgwT5wo6&", // City icon
    state: "CZM3HWxN9R21&", // Flag icon
    zipcode: "v6RytYHGOOxq&", // Barcode icon
    phone: "fUHYOFprDglQ&", // Replace with actual phone icon ID
  };

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  useEffect(() => {
    if (user?.address) {
      setForm({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        zipcode: user.address.zipcode || "",
        phone: user.address.phone || "",
      });
    }
  }, [user]);

useEffect(() => {
  if (!hasSubmitted) return;

  if (status === "succeeded") {
    toast.success("Address updated successfully");
    setHasSubmitted(false); // reset
  } else if (status === "failed") {
    toast.error(error || "Update failed");
    setHasSubmitted(false); // reset
  }
}, [status, error, hasSubmitted]);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     setHasSubmitted(true);
    dispatch(updateAddress(form));
    setForm({
      street: "",
      city: "",
      state: "",
      zipcode: "",
      phone: "",
    });
  };

  return (
    <div className="pageStructure py-5">
      <div className="min-h-screen w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-[50%] font-[title] rounded-4xl p-5 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/vintage-grungy-textured-paper-background_53876-103932.jpg?ga=GA1.1.223457135.1700398906&semt=ais_hybrid&w=740")`,
          }}
        >
          <h1 className="font-extrabold text-5xl">ADDRESS INFO</h1>
          <div className="py-10 flex flex-col gap-10">
            {["street", "city", "state", "zipcode", "phone"].map((field) => (
              <div key={field} className="items-center text-2xl font-bold">
                <h1>{field.toUpperCase()} :</h1>
                <div className="flex">
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="bg-transparent p-2 w-full border-b-3 border-dotted border-zinc-600 text-[#2B2B2B] focus:outline-none"
                  />
                  <img
                    className="h-8 w-8"
                    src={`https://img.icons8.com/?size=100&id=${iconMap[field]}&format=png&color=000000`}
                    alt={`${field} icon`}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-fit font-bold text-xl border py-1 px-2 rounded-md hover:shadow-md shadow-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Updating..." : "Update"}
                <img
                  className="h-8 w-8"
                  src="https://img.icons8.com/?size=100&id=2I11IckX98hP&format=png&color=000000"
                  alt=""
                />
              </button>
            </div>

           
          </div>
        </form>
      </div>
    </div>
  );
}
