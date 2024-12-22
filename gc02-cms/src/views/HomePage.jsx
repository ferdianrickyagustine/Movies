import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../api";
import { useNavigate } from "react-router";
import Toastify from 'toastify-js'

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  

  async function fetchMovies() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/apis/movie/movies`, { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      setMovies(data.data);

    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black"
        },
    }).showToast();
    } finally {
      setLoading(false);
    }
  }

  async function handlePatch(e, id) {
    try {
      setLoading(true)
      
      const images = e.target.files[0]
      const formData = new FormData
      formData.append('file', images)

      const { data } = await axios.patch(`${base_url}/apis/movie/movies/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      fetchMovies()

      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#34D399",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black"
        },
    }).showToast();

    } catch (error) {
      console.log(error)
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black"
        },
    }).showToast();
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${base_url}/apis/movie/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      fetchMovies()
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#34D399",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black"
        },
    }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black"
        },
    }).showToast();
    }
  }



  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div id="PAGE-HOME" className="text-white">
        <div>
          {loading ? (
            <>
              <div className="flex justify-center items-center h-screen bg-black text-white">
                Loading...
              </div>
            </>
          ) : (
            <>
              <table className="border border-white table-auto">
                <thead>
                  <tr className="border-b border-white">
                    <th className="border-r-2 border-white">Title</th>
                    <th className="border-r-2 border-white">Synopsis</th>
                    <th className="border-r-2 border-white">Trailer Url</th>
                    <th className="border-r-2 border-white">Rating</th>
                    <th className="border-r-2 border-white">Image Url</th>
                    <th className="border-r-2 border-white">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {movies.map(movie => {
                    return (
                      <tr key={movie.id} className="border-b border-white">
                        <td className="border-r-2 border-white p-3">{movie.title}</td>
                        <td className="border-r-2 border-white p-3">{movie.synopsis}</td>
                        <td className="border-r-2 border-white p-3 hover:text-red-500"><button><a href={movie.trailerUrl}>Click to Watch</a></button></td>
                        <td className="border-r-2 border-white p-3">{movie.rating}</td>
                        <td className="border-r-2 border-white p-3"><img src={movie.imgUrl}></img></td>
                        <td className="flex justify-center gap-2 p-3">
                          <button className="bg-white text-black p-2 border-black rounded-lg hover:bg-red-500 hover:text-white"
                          onClick={() => {navigate(`/update/${movie.id}`)}}
                          >Update</button>
                          <button className="bg-white text-black p-2 rounded-lg hover:bg-red-500 hover:text-white"
                          onClick={() => handleDelete(movie.id)}
                          >Delete</button>
                          <label className="cursor-pointer" htmlFor={`uploadImg${movie.id}`}>
                          <input type="file" className="hidden" name="file" id={`uploadImg${movie.id}`} onChange={(e) => handlePatch(e, movie.id)}/>
                          <img className="h-full w-full" alt="Image here" src="https://cdn-icons-png.flaticon.com/512/4980/4980305.png"></img>
                          </label>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          )
          }

        </div>
      </div>
    </>
  );
}
