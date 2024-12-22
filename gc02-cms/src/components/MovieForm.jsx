import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../api";
import axios from 'axios'
import Button from "./Button";


export default function MovieForm({handleSubmit, dataMovie, propName}) {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState(0)
  // console.log(base_url);
  
  async function fetchGenre() {
    const { data } = await axios.get(`${base_url}/apis/movie/genres`, {
        headers: {
            Authorization : `Bearer ${localStorage.access_token}`
        }
    } )
    setGenres(data.data);
    
  }

  useEffect(() => {
    fetchGenre()

    if (dataMovie) {
      setTitle(dataMovie.title || "");
      setSynopsis(dataMovie.synopsis || "");
      setTrailerUrl(dataMovie.trailerUrl || "");
      setImgUrl(dataMovie.imgUrl || "");
      setRating(dataMovie.rating || 0);
      setGenreId(dataMovie.genreId || 0);
    }
  }, [dataMovie])

 

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, title, synopsis, trailerUrl, imgUrl, rating, genreId)}>
        <div>
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Title</label>
              <input
                type="title"
                name="title"
                autoComplete="current-title"
                className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Synopsis</label>
              <div className="flex items-center">
                <input
                  type="synopsis"
                  name="synopsis"
                  autoComplete="current-synopsis"
                  className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  onChange={(e) => setSynopsis(e.target.value)}
                  value={synopsis}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Trailer Url</label>
              <div className="flex items-center">
                <input
                  type="trailerUrl"
                  name="trailerUrl"
                  autoComplete="current-trailerUrl"
                  className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  value={trailerUrl}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Image Url</label>
              <div className="flex items-center">
                <input
                  type="imgUrl"
                  name="imgUrl"
                  autoComplete="current-imgUrl"
                  className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  onChange={(e) => setImgUrl(e.target.value)}
                  value={imgUrl}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Rating</label>
              <div className="flex items-center">
                <input
                  type="imgUrl"
                  name="imgUrl"
                  autoComplete="current-imgUrl"
                  className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div>
            <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
              <label className="text-red-500">Genre</label>
              <div className="flex items-center">
                <select onChange={(e) => setGenreId(e.target.value)} value={genreId}>
                    {genres.map(genre => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select>
                
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between"></div>
        <div className="mt-2 flex items-center justify-center gap-x-2">
          <Button nameProp={propName} />
        </div>
      </form>
    </>
  );
}
