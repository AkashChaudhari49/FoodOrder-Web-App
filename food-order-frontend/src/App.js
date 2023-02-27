import './App.css';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <CartProvider>
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/myOrders" element={<MyOrders/>} />
          </Routes>
        </div>
    </Router>
    </CartProvider>
    
  
  );
}

export default App;
