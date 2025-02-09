import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Publication from "./pages/publication";
import Academics from "./pages/academics";
import Gallery from "./pages/gallery";
import Achievement from "./pages/achievement";
import Conference from "./pages/conference";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./AdminPanel/pages/AdminDashboard";
import AdminHome from "./AdminPanel/pages/AdminHome";
import AdminAcademics from "./AdminPanel/pages/AdminAcademics";
import AdminAchievements from "./AdminPanel/pages/AdminAchievements";
import AdminPublications from "./AdminPanel/pages/AdminPublications";
import AdminConferences from "./AdminPanel/pages/AdminConferences";
import AdminGallery from "./AdminPanel/pages/AdminGallery"; 
import AdminProfile from "./AdminPanel/pages/AdminProfile";
import AdminStats from "./AdminPanel/pages/AdminStats";
import NotFound from "./utils/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
    <div style={{position:"sticky", top:"0", zIndex:"10000"}}>
    <Navbar />
    </div>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="/conferences" element={<Conference />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/publications" element={<Publication />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes (With Sidebar) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="academics" element={<AdminAcademics />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="conferences" element={<AdminConferences />} />
          <Route path="gallery" element={<AdminGallery/>} />
          <Route path="profile" element={<AdminProfile/>} />
          <Route path="stats" element={<AdminStats/>} />
        </Route>
        <Route path="*" element={< NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
