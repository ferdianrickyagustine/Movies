import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 bg-black border-b border-white  mb-10 rounded-bg z-50">
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
        <div className="flex md:order-2">
          <button
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </nav>
  );
}
