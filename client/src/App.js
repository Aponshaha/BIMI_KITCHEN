import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import {BrowserRouter , Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/CartScreen'
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Orderscreen';
import Adminscreen from './screens/Adminscreen';
import Footer from './components/Footer';
import EmailVerification from './screens/EmailVerification';

export default function App() {
  return (
    <div className="App">
       <Navbar/>

       <BrowserRouter>
       <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />}/>
          <Route path="/register" exact element={<Registerscreen />}/>
          <Route path='/login' exact element={<Loginscreen />}/>
          <Route path='/orders' exact element={<Ordersscreen />}/>
          <Route path='/admin/*' element={<Adminscreen />}/>
          <Route path='/user/verify' element={<EmailVerification />}/>
          </Routes>
       </BrowserRouter>

       <Footer/>
    
    </div>
  );
}