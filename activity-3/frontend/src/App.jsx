import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookshelfLayout from "./layout/BookshelfLayout";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import AuthorDetails from "./pages/AuthorDetails"; 
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <BookshelfLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
          <Route path="/authors/:id" element={<AuthorDetails />} /> 
        </Routes>
      </BookshelfLayout>
    </Router>
  );
}

export default App;

