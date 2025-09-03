import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../slices/cartSlice";
import { Link } from "react-router-dom";
import { fallbackImage } from "../../public/constant/fallbackImage";

const Page04Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const cartItemsByUser = useSelector((state) => state.cart.cartItems);

  const userId = user?._id;
  const userCart = userId ? cartItemsByUser[userId] || [] : [];

  const handleRemove = (itemId) => {
    dispatch(removeFromCart({ userId, cartItemId: itemId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart({ userId }));
  };

  const handleIncrease = (itemId, size) => {
    dispatch(increaseItemQuantity({ userId, itemId, size }));
  };

  const handleDecrease = (itemId, size) => {
    dispatch(decreaseItemQuantity({ userId, itemId, size }));
  };

  return (
    <div className="cart-page pageStructure p-4">
      {isLoggedIn ? (
        userCart.length === 0 ? (
          <p className="min-h-[40vh] flex justify-center items-center text-xl sm:text-2xl md:text-3xl text-zinc-500 font-[navHead]">
            Your cart is empty
          </p>
        ) : (
          <div>
            <h1 className="text-center py-6 sm:py-10 text-3xl sm:text-4xl md:text-5xl font-bold font-[title]">
              CART PAGE
            </h1>

            <ul className="flex flex-col gap-5">
              {userCart.map((item) => (
                <li key={item._id} className="border-b flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between border-3 rounded-2xl overflow-hidden">
                    {/* Content */}
                    <div className="clothContent flex flex-col justify-between w-full md:w-1/2 p-4 sm:p-6 md:p-10">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                          {item.name}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                            size : {item.size}
                          </h2>
                          <div className="flex items-center gap-2 border border-amber-400 rounded-2xl px-2 py-1">
                            <button
                              onClick={() =>
                                handleDecrease(item._id, item.size)
                              }
                              className="h-7 w-7 border rounded-full cursor-pointer disabled:opacity-50"
                              disabled={item.quantity === 1}
                            >
                              <img
                                src="https://img.icons8.com/?size=100&id=omNqVqjcpnhH&format=png&color=000000"
                                alt="-"
                              />
                            </button>
                            <span className="px-2 text-lg sm:text-xl font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrease(item._id, item.size)
                              }
                              className="h-7 w-7 border rounded-full cursor-pointer"
                            >
                              <img
                                src="https://img.icons8.com/?size=100&id=q7dpea8GYgNa&format=png&color=000000"
                                alt="+"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="divLine"></div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                          ₹{item.price * item.quantity}
                        </h2>
                      </div>

                      <button
                        className="mt-4 hover:bg-red-500 hover:text-white w-fit border border-zinc-400 px-4 py-2 rounded-2xl transition-all duration-300"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Image */}
                    <div className="clothImg w-full md:w-2/5 p-4 flex justify-center items-center bg-white">
                      <img
                        className="max-w-full h-auto object-contain"
                        src={item.images?.[0] || fallbackImage}
                        alt={item.name}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                className="px-4 py-2 text-zinc-600 font-semibold border-2 border-zinc-500 hover:bg-red-500 hover:text-white hover:rounded-full transition-all duration-300 rounded"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>

              <Link to={"/checkout"}>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 hover:rounded-full transition-all duration-300 text-white rounded">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )
      ) : (
        <p className="min-h-[40vh] flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-[title]">
          Please{" "}
          <Link to="/login" className="font-bold px-2 text-amber-700">
            login
          </Link>{" "}
          to view the products.
        </p>
      )}
    </div>
  );
};

export default Page04Cart;