import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="sticky top-0 bg-black border-b border-white mb-10 rounded-bg z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://ik.imagekit.io/matguchi/M.png"
            className="h-8"
            alt="Moofee Logo"
          />
          <button className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Moofee
          </button>
        </div>
        <div className="flex md:order-2 gap-6">
          <NavLink 
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-white hover:text-red-500"
          }
          >
            Home
          </NavLink>


          <NavLink 
          to="/add"
          className= {({ isActive }) =>
            isActive ? "text-red-500" : "text-white hover:text-red-500"
          }>
            Add Movie
          </NavLink>

          <NavLink 
          to="/staff"
          className= {({ isActive }) =>
            isActive ? "text-red-500" : "text-white hover:text-red-500"
          }>
            Add Staff
          </NavLink>

          <NavLink 
          to="/genres"
          className= {({ isActive }) =>
            isActive ? "text-red-500" : "text-white hover:text-red-500"
          }>
            Genre Lists
          </NavLink>

          <button
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
