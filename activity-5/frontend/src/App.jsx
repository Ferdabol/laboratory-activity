import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import PostDetail from "./pages/postdetail";
import CreatePost from "./pages/createpost";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="create" element={<CreatePost />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
