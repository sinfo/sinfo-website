const Spinner = () => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sinfo-primary"></div>
    </div>
    <p className="text-lg font-semibold text-gray-700">
      Spinning up some magic...
    </p>
  </div>
);

export default Spinner;
