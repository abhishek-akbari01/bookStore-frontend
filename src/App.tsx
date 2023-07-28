import './App.css';

import { Routes,Route } from 'react-router-dom';
import Nav from './Component/Nav';
import Home from './Pages/Home';
import Single from './Pages/Single';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Order from './Pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Nav/>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/single" element={<Single/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/order" element={<Order/>} />
      </Routes>
    </>
  );
}

export default App;