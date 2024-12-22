import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ASC");
  const [loading, setLoading] = useState(false);

  function getPagination() {
    const rangeSize = 10;
    const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const endPage = Math.min(startPage + rangeSize - 1, totalPage);
    let temp = [];
    for (let i = startPage; i <= endPage; i++) {
      temp.push(i);
    }
    return temp;
  }

  async function fetchMovies() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies?q=${search}&i=${filter}&limit=10&page=${currentPage}&sort=${sort}`
      );
      setMovies(data.data.query);
      setCurrentPage(data.data.pagination.currentPage);
      setTotalPage(data.data.pagination.totalPage)
    } catch (error) {
      console.log("Error fetching movie detail:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGenres() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://h8-phase2-gc.vercel.app/apis/pub/movie/genres"
      );
      // console.log(data);

      setGenres(data.data);
    } catch (error) {
      console.log("Error fetching movie genre:", error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchMovies();
  //   console.log(search);

  // }, [search, filter, sort, currentPage]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [search, filter, sort, currentPage]);

  const pagination = getPagination();

  return (
    <>
      {/* home */}
      <div id="PAGE-HOME">
        <Navbar />
        <div>
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="flex justify-between mb-5">
            <div>
              <label className="sr-only">Underline select</label>
              <select
                className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="">All Genres</option>
                {genres.map((g) => {
                  return <option key={g.id}>{g.name}</option>;
                })}
              </select>
            </div>
            <div className="relative md:block flex">
              <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-3 pointer-events-none">
                {/* <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg> */}
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                className="block w-96 p-2 ps-10 text-sm text-white border border-black rounded-lg  focus:border-blue-500 dark:bg-black dark:border-gray-700 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* <button
                data-collapse-toggle="navbar-search"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:text-white dark:hover:bg-black dark:focus:ring-black"
                aria-controls="navbar-search"
                aria-expanded="false"
              > */}

            {/* </button> */}
            <div>
              <select
                className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen bg-black text-white">
              Loading...
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 bg-black grid grid-cols-5 gap-8">
              {movies.map((movie) => {
                return <Card key={movie.id} movie={movie} />;
              })}
            </div>
          </>
        )}
        <div className="flex justify-center mt-5 space-x-3 mb-10">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-white bg-gray-800 rounded hover:bg-gray-500"
          >
            Previous
          </button>
          {pagination.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-gray-300 text-black"
                  : "bg-gray-800 text-white hover:bg-gray-500"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPage))
            }
            disabled={currentPage === totalPage}
            className="px-3 py-1 text-white bg-gray-800 rounded hover:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
