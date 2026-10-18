const Loader = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-purple-600/5">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;

