import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

export default function MovieDetail() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchMovieDetail() {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies/${id}`
      );
      console.log(data);

      setMovie(data.data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Movie not found!
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black text-white relative"
      style={{
        backgroundImage: `url(${movie.imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>
      <div className="relative z-10">
        <Navbar />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <img
              className="rounded-lg shadow-md w-full md:w-1/2 transform hover:scale-105 transition-transform duration-300"
              src={movie.imgUrl}
              alt={movie.title}
            />

            {/* Movie Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-white mb-4">
                {movie.title}
              </h1>
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                {movie.synopsis}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-gray-400">
                  <span className="font-semibold text-white">Rating:</span>{" "}
                  {movie.rating}/10
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {movie.Genre.name}
                </p>
              </div>

              {/* Watch Trailer Button */}
              <div className="relative group cursor-pointer"
                onClick={() => window.open(movie.trailerUrl, "_blank")}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-violet-600 rounded-lg blur opacity-0 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className="space-y-2">
                    <p className="text-white">Watch Trailer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
