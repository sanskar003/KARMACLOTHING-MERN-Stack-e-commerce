import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../slices/clothSlice";
import { API_URL } from "@/config/api";
import axios from "axios";

const Filter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.cloths);
  const [openSection, setOpenSection] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  // ✅ Fetch all categories once
  useEffect(() => {
    axios.get(`${API_URL}/api/cloths/categories`)
      .then((res) => setAllCategories(res.data));
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // ✅ Handlers with reset logic
  const handleTagClick = (tag) => {
    dispatch(setFilters({ ...filters, tags: tag, category: "" }));
  };

  const handleCategoryClick = (cat) => {
    dispatch(setFilters({ ...filters, category: cat, tags: "" }));
  };

  const handleSortClick = (order) => {
    dispatch(setFilters({ ...filters, sort: order }));
  };

  const handleRatingClick = (stars) => {
    dispatch(setFilters({ ...filters, rating: stars }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="w-full">
      {/* Filter headings */}
      <div className="Categoris flex flex-wrap justify-center gap-3 sm:gap-5 py-3">
        <h1
          onClick={() => toggleSection("category")}
          className="text-lg sm:text-2xl md:text-3xl border border-amber-500 hover:bg-amber-500 hover:text-white hover:rounded-4xl cursor-pointer px-4 sm:px-6 md:px-10 py-1 sm:py-2 transition-all duration-300"
        >
          Categories
        </h1>
        <h1
          onClick={() => toggleSection("price")}
          className="text-lg sm:text-2xl md:text-3xl border border-amber-500 hover:bg-amber-500 hover:text-white hover:rounded-4xl cursor-pointer px-4 sm:px-6 md:px-10 py-1 sm:py-2 transition-all duration-300"
        >
          Price
        </h1>
        <h1
          onClick={() => toggleSection("rating")}
          className="text-lg sm:text-2xl md:text-3xl border border-amber-500 hover:bg-amber-500 hover:text-white hover:rounded-4xl cursor-pointer px-4 sm:px-6 md:px-10 py-1 sm:py-2 transition-all duration-300"
        >
          Rating
        </h1>
        <h1
          onClick={handleClearFilters}
          className="text-lg sm:text-2xl md:text-3xl border border-amber-500 hover:bg-red-500 hover:text-white hover:rounded-4xl cursor-pointer px-4 sm:px-6 md:px-10 py-1 sm:py-2 transition-all duration-300"
        >
          Clear Filter
        </h1>
      </div>

      {/* Categories Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          openSection === "category"
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-10 py-4 flex flex-wrap justify-center gap-3 sm:gap-5">
          {allCategories.map((cat, idx) => (
            <h1
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer hover:bg-amber-200 border border-zinc-400 text-base sm:text-xl md:text-2xl px-3 py-1 rounded-2xl w-fit transition-all duration-300"
            >
              {cat}
            </h1>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          openSection === "price" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-10 py-4 flex flex-wrap gap-3 sm:gap-5 justify-center">
          <button
            onClick={() => handleSortClick("price_desc")}
            className="px-2 sm:px-3 py-1 text-base sm:text-xl md:text-2xl border border-zinc-400 hover:bg-amber-400 hover:rounded-4xl transition-all duration-300"
          >
            High - Low
          </button>
          <button
            onClick={() => handleSortClick("price_asc")}
            className="px-2 sm:px-3 py-1 text-base sm:text-xl md:text-2xl border border-zinc-400 hover:bg-amber-400 hover:rounded-4xl transition-all duration-300"
          >
            Low - High
          </button>
        </div>
      </div>

      {/* Rating Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          openSection === "rating"
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-10 py-4 flex flex-wrap justify-center gap-3 sm:gap-5">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div
              key={stars}
              onClick={() => handleRatingClick(stars)}
              className="cursor-pointer border border-zinc-400 hover:bg-yellow-200 px-2 py-1 rounded-2xl text-sm sm:text-base md:text-lg"
            >
              {"⭐".repeat(stars)} & Up
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
