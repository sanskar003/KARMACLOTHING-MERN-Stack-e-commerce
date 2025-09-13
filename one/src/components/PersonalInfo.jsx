import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../slices/authSlice.js";
import { toast } from "react-toastify";

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const iconMap = {
    street: "GCo0HIceD8yd&",
    city: "iU7UIgwT5wo6&",
    state: "CZM3HWxN9R21&",
    zipcode: "v6RytYHGOOxq&",
    phone: "fUHYOFprDglQ&",
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
      setHasSubmitted(false);
    } else if (status === "failed") {
      toast.error(error || "Update failed");
      setHasSubmitted(false);
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
      <div className="min-h-screen w-full flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[720px] font-[title] rounded-4xl p-4 sm:p-6 md:p-8 shadow-md bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/vintage-grungy-textured-paper-background_53876-103932.jpg?ga=GA1.1.223457135.1700398906&semt=ais_hybrid&w=740")`,
          }}
        >
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mb-6">
            ADDRESS INFO
          </h1>

          <div className="flex flex-col gap-8">
            {["street", "city", "state", "zipcode", "phone"].map((field) => (
              <div
                key={field}
                className="flex flex-col sm:flex-row items-center gap-4 text-lg sm:text-xl md:text-2xl font-bold"
              >
                <label htmlFor={field} className="w-full sm:w-1/3 text-center sm:text-left">
                  {field.toUpperCase()}:
                </label>
                <div className="flex w-full items-center gap-3">
                  <input
                    id={field}
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="bg-transparent p-2 w-full border-b-2 border-dotted border-zinc-600 text-[#2B2B2B] focus:outline-none"
                  />
                  <img
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    src={`https://img.icons8.com/?size=100&id=${iconMap[field]}&format=png&color=000000`}
                    alt={`${field} icon`}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-center sm:justify-end mt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="font-bold text-lg sm:text-xl border py-2 px-4 rounded-md hover:shadow-md shadow-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Updating..." : "Update"}
                <img
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  src="https://img.icons8.com/?size=100&id=2I11IckX98hP&format=png&color=000000"
                  alt="Update icon"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}