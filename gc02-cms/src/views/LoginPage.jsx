import { useEffect, useState } from "react";
import Toastify from 'toastify-js'
import axios from 'axios'
import { useNavigate } from "react-router"
import Button2 from "../components/Button2";


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "This is a toast",
        duration: 3000,
        destination: "You already logged in",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,rgb(255, 0, 0),rgb(255, 0, 0))",
        },
      }).showToast();
      navigate('/')
    }
  }, [navigate])

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`https://h8-phase2-gc.vercel.app/apis/login`, { email, password })
      // console.log(data);

      localStorage.setItem('access_token', data.data.access_token)
      navigate('/')
      Toastify({
        text: "Login success",
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
        }
      }).showToast();
    }
  }

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">

      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div
          className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked={1}
        />
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleLogin}>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">

                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="current-email"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-2.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">

              </div>
              <div className="mt-2 flex items-center justify-center gap-x-2">

                <>
                  <Button2 propName2="Login" />
                </>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
