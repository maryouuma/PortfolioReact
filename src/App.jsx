import "./App.css";
import Layout from "./Pages/Layout.jsx";
import Hero from "./components/Accueil/Hero.jsx";
import About from "./components/Accueil/About.jsx";
import Experience from "./components/Accueil/Experience.jsx";
import ContactForm from "./components/Formulaire/FormulaireG6.jsx";
import Navbar from "./components/Commun/Navbar.jsx"; // <-- import ajouté
import NotFound from "./components/Commun/NotFound.jsx"; // <-- import ajouté
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // <-- Routes ajouté
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminUsers from "./components/Admin/Users";
import AdminAnalytics from "./components/Admin/Analytics";
import AdminSettings from "./components/Admin/Settings";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import Logout from "./components/Accueil/Logout"; // <-- import ajouté
import Login from "./components/Authentification/Login"; // <-- importe Login
import Projets from "./components/Accueil/Projets.jsx";
import AdminFormSubmissions from "./components/Admin/AdminFormSubmissions";
import ProjectsAdminPage from "./components/Admin/ProjectsAdminPage";
import ProjectsList from "./Pages/ProjectsList";
import ProjectDetails from "./Pages/ProjectDetails";
import Profile from "./components/Profile";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/projets" element={<Projets />} /> */}
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
        </Route>
        {/* Auth */}{" "}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <Login />
          }
        />
        {/* Routes Admin Protégées */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated} // Remplacez par votre logique d'authentification"}
              redirectPath="/login"
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="projects" element={<ProjectsAdminPage />} />
          <Route path="forms" element={<AdminFormSubmissions />} />
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* Route pour la déconnexion */}
        <Route path="/logout" element={<Logout />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <Layout>
        <Hero />
        <About />
        <Experience/>
        <ContactForm></ContactForm>
      </Layout> */}
    </>
  );
}

export default App;
