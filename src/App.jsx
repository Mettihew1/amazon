import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignUp from './components/Sign-Up/SignUp';
import Checkout from './components/Checkout/Checkout';
import Test from './components/Test/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'
import SingleProduct from './components/Product/SingleProduct';
import Products from './components/Product/Products';
import AdminProducts from './components/Admin/AdminProducts';
import ErrorBoundary from './components/Error/ErrorBoundary';


function App() {
  return (
    <Provider store={store}>

    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/admin/products" element={<ErrorBoundary><AdminProducts /></ErrorBoundary>} />  New syntax
          <Route path="/product/:id" element={<SingleProduct />} />  New syntax
          <Route path="/products/" element={<Products />} />  New syntax
          <Route path="/test" element={<Test />} />  {/* New syntax */}
          <Route path="/login" element={<SignUp />} />  {/* New syntax */}
          <Route path="/checkout" element={<Checkout />} />  New syntax
          <Route path="/" element={<Home />} />  {/* New syntax */}
        </Routes>
      </div>
    </Router>
    </Provider>

  );
}

export default App;
