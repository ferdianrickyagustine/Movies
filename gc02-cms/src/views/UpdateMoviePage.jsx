import { useNavigate, useParams } from "react-router";
import MovieForm from "../components/MovieForm";
import { base_url } from "../api";
import { useEffect, useState } from "react";
import axios from 'axios'
import Toastify from 'toastify-js'

export default function UpdateMovie() {
  const { id } = useParams()
  const [dataMovie, setDataMovie] = useState({})
  const navigate = useNavigate()

  async function handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId) {
    e.preventDefault()
    try {
      const body = { title, synopsis, trailerUrl, imgUrl, rating: +rating, genreId: +genreId }
      const { data } = await axios.put(`${base_url}/apis/movie/movies/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      // console.log(data)
      navigate("/")

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

  async function getData() {
    try {
      const { data } = await axios.get(`${base_url}/apis/movie/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      // console.log(data.data);

      setDataMovie(data.data)

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="p-6 pt-0">
      <MovieForm handleSubmit={handleSubmit} dataMovie={dataMovie} propName="Edit Movie" />
    </div>
  );
}

/**
 * 1. ambil data dari id movie yang di klik
 * 2. ambil data dari database berdasarkan id
 * 3. setelah diambil datanya, dikirim ke form update
 * 4. memasukkan data ke form update
 * 5. update data
 * 6. put dan kirim ke database
 * 
 *
*/
