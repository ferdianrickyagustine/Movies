import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Toastify from 'toastify-js'

export default function BaseLayout() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.access_token) {
            navigate("/login")
            Toastify({
                text: "Please login first",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "red",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }
        
    }, [navigate])
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}