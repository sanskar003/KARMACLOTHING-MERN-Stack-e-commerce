const Loading = () => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-amber-500/20 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;