import AddMovie from "./views/AddMoviePage";
import AddStaff from "./views/AddStaffPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router"
import UpdateMovie from "./views/UpdateMoviePage";
import GenrePage from "./views/GenrePage";


export default function App() {
  return (
    <>
      <div className="p-16 min-h-screen bg-black">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<BaseLayout/>}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/add" element={<AddMovie/>}/>
            <Route path="/staff" element={<AddStaff/>}/>
            <Route path="/update/:id" element={<UpdateMovie/>}/>
            <Route path="/genres" element={<GenrePage/>}/>
            

            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
