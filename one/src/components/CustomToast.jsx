
const CustomToast = ({ title, productName, price }) => {
  return (
    <div className="px-2 py-1  rounded-2xl">
      <h1 className="text-lg font-bold text-amber-500">{title}</h1>
      <p className="text-sm text-black">
        {productName} added to cart for ₹{price}
      </p>
    </div>
  );
};

export default CustomToast;