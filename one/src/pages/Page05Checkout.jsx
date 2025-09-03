import React from "react";
import { useSelector } from "react-redux";
import { fallbackImage } from "../../public/constant/fallbackImage";
import { Link } from "react-router-dom";

const Page05Checkout = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const userCart = userId ? cart[userId] || [] : [];

  const totalPrice = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="pageStructure min-h-screen p-6 md:flex-row gap-6">
      {/* Cart Items */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {userCart.map((item, idx) => (
          <div key={idx} className="flex  items-center gap-2 my-5">
            <div className="relative border-4 border-amber-600 rounded-2xl overflow-hidden h-60 w-60 group">
              {/* Product Image */}
              <Link to={`/product/${item._id}`}>
                <img
                  className="w-full h-full object-contain bg-white"
                  src={item.images?.[0] || fallbackImage}
                  alt={item.name}
                />
              </Link>

              {/* Bottom Hover Info */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-17 group-hover:translate-y-0 transition duration-300 ease-out w-[90%] bg-amber-200 bg-opacity-70 text-black px-4 py-2 rounded-lg shadow-lg">
                <h2 className="text-sm font-semibold truncate">{item.name}</h2>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold mt-1">
                    {item.rating ? `⭐ ${item.rating}` : "Not rated yet"}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    size: {item.size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page05Checkout Summary */}
      <div className="bg-stone-100 border-2 border-amber-300 rounded-lg p-6 w-full  flex flex-col items-center gap-4 font-[title]">
        <div className="flex gap-2 text-4xl font-semibold">
          <span>Total Items:</span>
          <span>{userCart.length}</span>
        </div>

        <div className="w-full border-t border-amber-400 my-2" />

        <div className="w-full">
          <ul className="list-none m-0 p-0">
            {userCart.map((item, idx) => (
              <li key={idx} className="flex justify-between mb-1 text-2xl">
                <div className="flex gap-2 items-center" >
                  <span>{item.name}</span>
                  {item.quantity > 1 && (
                    <span className="text-xl font-light">
                      <span className="font-semibold text-amber-700"> x {item.quantity}</span> 
                    </span>
                  )}
                </div>
                <span className="font-[navHead]">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full border-t border-amber-400 my-2" />

        <h1 className="text-4xl font-semibold">Total Checkout Price</h1>
        <h1 className="font-[navHead] text-4xl text-emerald-700 font-thin">
          ₹{totalPrice.toLocaleString("en-IN")}
        </h1>
      </div>
    </div>
  );
};

export default Page05Checkout;
