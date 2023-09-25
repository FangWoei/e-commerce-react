import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ProductsAdd from "./ProductAdd";
import ProductsEdit from "./ProductEdit";
import Cart from "./Cart";
import Order from "./Orders";
import Checkout from "./Checkout";
import PaymentVerification from "./PaymentVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product_add" element={<ProductsAdd />} />
        <Route path="/products/:id" element={<ProductsEdit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify-payment" element={<PaymentVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
