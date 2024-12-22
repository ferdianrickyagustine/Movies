import { useEffect, useState } from "react";
import { base_url } from "../api"
import Toastify from 'toastify-js'
import axios from 'axios'

export default function GenrePage() {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchGenre() {
        try {
            const { data } = await axios.get(`${base_url}/apis/movie/genres`, {
                headers: {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            } )
            
            setGenres(data.data);
            
        } catch (error) {
            // console.log(error);
            
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
      
      useEffect(() => {
        fetchGenre()
      }, [])

    return(
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
                    <th className="border-r-2 border-white">Id</th>
                    <th className="border-r-2 border-white">Genre Name</th>
                  </tr>
                </thead>

                <tbody>
                  {genres.map(genre => {
                    return (
                      <tr key={genre.id} className="border-b border-white">
                        <td className="border-r-2 border-white p-3">{genre.id}</td>
                        <td className="border-r-2 border-white p-3">{genre.name}</td>
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
    )
}