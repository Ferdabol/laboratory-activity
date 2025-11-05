import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import MainLayout from "./layout/bookshelflayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

