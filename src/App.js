import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product_add" element={<ProductAdd />} />
        <Route path="/products/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
