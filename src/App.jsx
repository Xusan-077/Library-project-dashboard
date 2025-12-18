import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Books from "./pages/Books";
import Libraries from "./pages/Libraries";
import Login from "./pages/Login";
import AddLibraries from "./pages/AddLibraries";
import Profile from "./pages/Profile";
import LibraryDetailPage from "./pages/LibraryDetailPage";
import BookDetailPage from "./pages/BookDetailPage";
import { ToastContainer } from "react-toastify";
import Favorites from "./pages/Favorites";
import { useThemeStore } from "./store/useThemeStore";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="book/:bookId" element={<BookDetailPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="libraries" element={<Libraries />} />
          <Route path="library/:libraryId" element={<LibraryDetailPage />} />
          <Route path="addlibrary" element={<AddLibraries />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
}
