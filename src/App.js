import './App.css';
import { Route, Routes } from 'react-router-dom';
import Help from './pages/Help';
import About from './pages/About';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Lend from './pages/Lend';
import Borrow from './pages/Borrow';
import Messages from './pages/Messages';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';



function App() {
  return (
    <div>
      <Navbar/>
<Routes>
  <Route path='/' element={<Welcome/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/lend' element={<Lend/>}/>
  <Route path='/borrow' element={<Borrow/>}/>
  <Route path='/messages' element={<Messages/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/help' element={<Help/>}/>
</Routes>
    </div>
  );
}

export default App;
