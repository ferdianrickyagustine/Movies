import { useState } from "react";
import { base_url } from "../api";
import axios from 'axios'
import Toastify from 'toastify-js'
import { useNavigate } from "react-router";

export default function AddStaff() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [address, setAddress] = useState("")
  const navigate = useNavigate()
  
  async function handleSubmit(e, username, email, password, phoneNumber, address) {
   try {
    e.preventDefault()
    
    const body = {username, email, password, phoneNumber, address} 
    const {data} = await axios.post(`${base_url}/apis/add-user`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`
      }
    })
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
    // console.log(error)
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
    <>
      <div className="p-6 pt-0">
        <form onSubmit={(e) => handleSubmit(e, username, email, password, phoneNumber, address)} className="text-white">
          <div>
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between"></div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="current-username"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between"></div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="current-email"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between"></div>
                <div className="flex items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between"></div>
                <div className="flex items-center">
                  <input
                    type="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    autoComplete="current-phoneNumber"
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between"></div>
                <div className="flex items-center">
                  <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    autoComplete="current-address"
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between"></div>
          <div className="mt-2 flex items-center justify-center gap-x-2">
            <button
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
              type="submit"
            >
              Create New Staff
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
