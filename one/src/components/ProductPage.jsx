// ProductPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { addToCart } from "../../slices/cartSlice";
import { API_URL } from "@/config/api";
import Loading from "./Loading";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cloths/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">
    <Loading/>
  </p>;

  const handleAddToCart = () => {
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
    <div className="pageStructure  max-w-6xl mx-auto p-6 md:flex md:gap-8 bg-white shadow">
      {/* LEFT: IMAGE GALLERY */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-[500px] h-[500px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={hoverImage || selectedImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition 
              ${
                selectedImage === img ? "border-blue-500" : "border-transparent"
              }`}
              // Change preview on hover
              onMouseEnter={() => setSelectedImage(img)}
              onMouseLeave={() => {
                setSelectedImage(img);
                setHoverImage(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="flex-1 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-xl font-[title] text-gray-600 mt-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center rounded-full border border-amber-500 bg-amber-100 w-fit px-2 mt-2">
          <span className="font-semibold text-gray-600 mr-2">
            {product.rating > 0 ? (
              <div className="flex justify-center items-center ">
                <span className="mr-2 font-semibold">{product.rating}</span>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-amber-500"
                        : "text-zinc-400"
                    }
                    style={{ fontSize: "1.5rem" }}
                  >
                    ★
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-zinc-400">not rated yet</span>
            )}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex flex-col">
          <span className="text-2xl mr-2 font-thin text-red-600">
            {product.discount > 0 && `${product.discount}% OFF`}
          </span>
          <span className="text-3xl font-bold text-green-600">
            ₹{product.price}
            {product.discount > 0 && (
              <span className="line-through text-xl font-light text-gray-400 ml-3">
                ₹{Math.round(product.price / (1 - product.discount / 100))}
              </span>
            )}
          </span>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Available Sizes</h4>
          <div className="flex gap-2">
            {product.size.map((size, index) => (
              <button
                key={index}
                className={`h-8 w-8 text-lg rounded-lg text-center transition-all duration-200
                  ${
                    selectedSize[product._id] === size
                      ? "bg-amber-300 text-zinc-500 font-semibold border-amber-500"
                      : "bg-zinc-500 text-[#F5F5DC] hover:bg-yellow-300 hover:text-black"
                  }
                `}
                onClick={() =>
                  setSelectedSize((prev) => ({
                    ...prev,
                    [product._id]: size,
                  }))
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Info */}
        <p
          className={`mt-4 ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In stock (${product.stock} left)`
            : "Out of stock"}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 px-2 py-1 rounded text-sm font-semibold text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`mt-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center
          ${
            product.stock > 0
              ? "bg-amber-300 hover:bg-amber-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <img
            className="w-14 p-1.5"
            src="https://img.icons8.com/?size=100&id=eLKhCNc6SMdl&format=png&color=000000"
            alt="Add to cart"
          />
        </button>
      </div>
    </div>
  );
}
