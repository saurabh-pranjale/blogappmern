import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import CreateBlog from "./pages/CreateBlog";


const App = () => {
    return (
        <BrowserRouter>

     <div>
        <Navbar />

        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login_admin" element={<AdminLogin />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/blogs" element={<Blogs />} />
         <Route path="/register" element={<Register />} />
         <Route path="/profile" element={<Profile />} />

         <Route path="/postblog" element={<CreateBlog />} />
         </Routes>
     </div>
     </BrowserRouter>        
    );
};

export default App;
