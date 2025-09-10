import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCloths } from "../../slices/clothSlice";
import { addToCart } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";
import ImageSlider from "@/components/ImageSlider";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Link } from "react-router-dom";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";

const Page03Clothing = () => {
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const { cloths, loading, error, totalPages, filters } = useSelector(
    (state) => state.cloths
  );
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [selectedSize, setSelectedSize] = useState({});
  const [page, setPage] = useState(1);
  const [fullscreenImages, setFullscreenImages] = useState(null);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchCloths({ page, limit, ...filters }));
  }, [dispatch, page, filters]);

  useEffect(() => {
    document.body.style.overflow = fullscreenImages ? "hidden" : "auto";
    const handleEsc = (e) => {
      if (e.key === "Escape") setFullscreenImages(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [fullscreenImages]);

  useEffect(() => {
    let timeout;
    if (loading) {
      setShowLoader(true); // show immediately when loading starts
    } else {
      // wait 300ms before hiding to prevent flicker
      timeout = setTimeout(() => setShowLoader(false), 300);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please log in to add items to your cart.");
      return;
    }

    const size = selectedSize[product._id];
    if (!size) {
      toast.error("Please select a size.");
      return;
    }

    const cartItem = { ...product, size };
    dispatch(addToCart({ userId, cartItem }));

    toast(
      <CustomToast
        title="🛍️ Added to cart"
        productName={product.name}
        price={product.price}
      />,
      {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      }
    );
  };

  return (
    <div className="pageStructure font-[title] ">
      <Filter />

      <div className="main p-4 sm:p-5 relative">
      {showLoader  && <Loading />}
      {error && <p>{error}</p>}

        <SearchBar />
        
        {cloths.map((cloth) => (
          <React.Fragment key={cloth._id}>
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0">
              {/* Content Section */}
              <div className="clothContent relative w-full md:w-1/2 p-4 sm:p-6 md:p-10">
                <Link to={`/product/${cloth._id}`}>
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">
                    {cloth.name}
                  </h1>
                </Link>
                <p className="text-lg sm:text-2xl md:text-3xl mt-2">
                  {cloth.description}
                </p>
                <div className="divLine"></div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
                  ₹{cloth.price}
                </h2>
                <div className="h-6 sm:h-10"></div>

                {/* Size + Cart button */}
                <div className="flex flex-row items-center gap-4 mt-4">
                  <select
                    className="text-lg sm:text-2xl md:text-3xl w-1/2 sm:w-auto bg-zinc-700 p-2 rounded-full text-center text-[#F5F5DC]"
                    value={selectedSize[cloth._id] || ""}
                    onChange={(e) =>
                      setSelectedSize((prev) => ({
                        ...prev,
                        [cloth._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Size</option>
                    {cloth.size.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAddToCart(cloth)}
                    className="bg-amber-300 rounded-full font-bold hover:bg-amber-500 transition-all duration-300 flex items-center justify-center"
                  >
                    <img
                      className="w-10 sm:w-12 p-1.5"
                      src="https://img.icons8.com/?size=100&id=eLKhCNc6SMdl&format=png&color=000000"
                      alt="Add to cart"
                    />
                  </button>
                </div>
              </div>
              {/* Image Section */}
              <div
                className="clothImg w-full md:w-1/2 p-4 sm:p-6 flex justify-center cursor-pointer"
                onClick={() => setFullscreenImages(cloth.images)}
              >
                <ImageSlider images={cloth.images} />
              </div>
            </div>

            <div className="border-2 border-zinc-700 w-full rounded-full my-4"></div>
          </React.Fragment>
        ))}

        {/* Fullscreen ImageSlider */}
        {fullscreenImages && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur bg-opacity-90 flex items-center justify-center">
            <button
              onClick={() => setFullscreenImages(null)}
              className="absolute top-4 right-4 text-white text-4xl font-bold z-50"
            >
              &times;
            </button>
            <div className="w-full h-full flex items-center object-cover">
              <ImageSlider images={fullscreenImages} />
            </div>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <h1 className="text-center font-[navHead] text-3xl sm:text-5xl md:text-8xl mt-10 sm:mt-20 animate-bounce">
          Hope you found something interesting
        </h1>
      </div>
    </div>
  );
};

export default Page03Clothing;
