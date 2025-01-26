const Topbar = () => {
    return (
      <header className="bg-white shadow-sm p-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, Seller!</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>
    );
  };
  
  export default Topbar;