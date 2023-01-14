import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./layout/Layout";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import UseAuth from './hooks/UseAuth'
import Dashboard from "./pages/Dashboard";
import BooksList from "./pages/BooksList";
import Bookdetail from "./components/Bookdetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >

          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="Signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<UseAuth />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Booklists" element={<BooksList />} />
            <Route path="Bookdetail" element={<Bookdetail />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
          <Route path="Unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
