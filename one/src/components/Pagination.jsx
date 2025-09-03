const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center my-10">
      <div className="border-2 border-amber-500 flex gap-2 w-fit px-3 py-2 rounded-3xl">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full ${
              currentPage === i + 1 ? "bg-amber-500" : "bg-zinc-700"
            } text-white`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
