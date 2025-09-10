import { API_URL } from "@/config/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [error, setError] = useState("");
  const [delayNoResult, setDelayNoResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery.trim() === "") {
        setDelayNoResult(false);
        setError("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (debouncedQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      setDelayNoResult(false);
      try {
        const result = await axios.get(
          `${API_URL}/api/cloths/search?q=${debouncedQuery}`
        );
        setSearchResults(Array.isArray(result.data) ? result.data : []);
        setError("");
        setTimeout(() => {
          if (result.data.length === 0) {
            setDelayNoResult(true);
          }
        }, 1000);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchSearchResult();
  }, [debouncedQuery]);

  return (
    <div className="relative border px-3 py-2 rounded-full w-full sm:w-fit m-auto bg-amber-500">
      <form className="relative">
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the unique"
          className="font-[title] text-lg sm:text-xl md:text-2xl bg-[#F5F5DC] rounded-2xl py-2 px-4 w-full sm:w-[60vw] md:w-[35vw] focus:outline-none"
        />
        <button type="submit">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 object-cover cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
            src="https://img.icons8.com/?size=100&id=A7j5iYOMBYSv&format=png&color=000000"
            alt="search"
          />
        </button>
      </form>

      {/* Display Results */}
      <div className="absolute top-full mt-2 w-full sm:w-[60vw] md:w-[35vw] rounded-2xl bg-amber-200 z-10 shadow-lg">
        {error && <p className="text-red-600 p-2">{error}</p>}
        {delayNoResult && !error && (
          <p className="text-gray-700 text-lg sm:text-xl text-center p-2">
            No results found.
          </p>
        )}
        {searchResults.length > 0 && (
          <ul className="flex flex-col px-2 py-1">
            {searchResults.map((item, idx) => (
              <li
                key={idx}
                className="text-lg sm:text-xl md:text-2xl p-1 font-medium"
              >
                <Link
                  to={`/product/${item._id}`}
                  className="hover:underline block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
