import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("fitfreakUser"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitfreakUser");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-lg bg-black/70 text-white py-3 px-6 flex justify-between items-center border-b border-orange-500 shadow-md z-50">
      <h1 className="text-3xl font-extrabold text-orange-500 tracking-wide drop-shadow-[0_0_8px_#ff6a00] hover:scale-105 transition cursor-pointer">
        FitFreak
      </h1>

      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="hover:text-orange-400 transition duration-200 font-medium"
        >
          Home
        </Link>

        {!user ? (
          <>
            <Link
              to="/register"
              className="hover:text-orange-400 transition duration-200 font-medium"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="hover:text-orange-400 transition duration-200 font-medium"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="hover:text-orange-400 transition duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/preferences"
              className="hover:text-orange-400 transition duration-200 font-medium"
            >
              Preferences
            </Link>

            {/* Avatar dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=ff6a00&color=fff`}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-orange-500 cursor-pointer shadow-[0_0_5px_#ff6a00] object-cover"
              />


              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 text-white rounded-xl border border-orange-500 shadow-lg backdrop-blur-lg z-50 animate-fadeIn">
                  <div className="p-3 border-b border-orange-400 font-semibold text-center">
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-orange-500/20 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
