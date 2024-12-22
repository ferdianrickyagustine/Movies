import { useNavigate } from "react-router";

export default function Card({ movie }) {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm bg-black border rounded-lg dark:border-gray-700 group relative flex flex-col z-10"
      onClick={() => {
        navigate(`/movies/${movie.id}`);
      }}
    >
      <img className="rounded-t-lg h-96" src={movie.imgUrl} alt="" />
      <div className="p-5 group-hover:bg-gray-500 border border-black rounded-b-lg duration-300 ease-in-out flex-1 justify-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-white group-hover:text-black text-center">
          {movie.title}
        </h5>
        <div className="overflow-hidden">
          <p className="mt-5 mb-3 font-normal text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            {movie.synopsis.length > 100
              ? movie.synopsis.substring(0, 100) + "..."
              : movie.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
