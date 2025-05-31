import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignUp from './components/Sign-Up/SignUp';
import Checkout from './components/Checkout/Checkout';
import Test from './components/Test/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'

function App() {
  return (
    <Provider store={store}>

    <Router>
      <div className="app">
        <Header />
        <Routes>
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
