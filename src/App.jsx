import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import Checkout from './components/Checkout/Checkout';
import Test from './components/Test/Test';
import { Routes, Route } from 'react-router-dom';
import SingleProduct from './components/Product/SingleProduct';
import Products from './components/Product/Products';
import AdminProducts from './components/Admin/AdminProducts';
import ErrorBoundary from './components/Error/ErrorBoundary';
import About from './components/About/About';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/prod" element={<ErrorBoundary><AdminProducts /></ErrorBoundary>} />
        <Route path="/prod/:id" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
         <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;