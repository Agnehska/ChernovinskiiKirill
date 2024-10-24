import { Routes, Route } from 'react-router-dom';
import './App.css';   
import './css/bootstrap.min.css'
import Header from './components/Header';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Order from './components/Order';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  return (
    <div className='App'>
      <Header token={token} isAuth={isAuth} 
      setIsAuth={setIsAuth}/>

      <Routes>
        <Route path='/' element={<Products isAuth={isAuth} token={token}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} setToken={setToken} />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart token={token} />}/>
        <Route path='/order' element={<Order token={token}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
