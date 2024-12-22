import { useNavigate } from "react-router";
import MovieForm from "../components/MovieForm";
import { base_url } from "../api";
import axios from 'axios'
import Toastify from 'toastify-js'
export default function AddMovie() {
  const navigate = useNavigate()

  async function handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId) {
    e.preventDefault()
    try {
      const body = {title, synopsis, trailerUrl, imgUrl, rating: +rating, genreId: +genreId}
      const { data } = await axios.post(`${base_url}/apis/movie/movies`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      navigate("/")
      Toastify({
            text: `Success Added a Movie`,
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

  return (
    <div className="p-6 pt-0 grid-cols-2">
      <MovieForm handleSubmit={handleSubmit} propName="Add Movie"/>
    </div>
  );
}
