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
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import LentItems from './pages/LentItems';
import Edit from './pages/Edit';



function App() {
  return (
    <div>
      <Navbar/>
<Routes>
  <Route path='/' element={<IsAnon><Welcome/></IsAnon>}/>
  <Route path='/signup' element={<IsAnon><Signup/></IsAnon>}/>
  <Route path='/login' element={<IsAnon><Login/></IsAnon>}/>
  <Route path='/home' element={<IsPrivate><Home/></IsPrivate>}/>
  <Route path='/profile/:userId' element={<IsPrivate><Profile/></IsPrivate>}/>
  <Route path='/profile/lentItems/:userId' element={<IsPrivate><LentItems/></IsPrivate>}/>
  <Route path='/profile/:userId/edit' element={<IsPrivate><Edit/></IsPrivate>}/>
  <Route path='/lend' element={<IsPrivate><Lend/></IsPrivate>}/>
  <Route path='/borrow' element={<IsPrivate><Borrow/></IsPrivate>}/>
  <Route path='/messages' element={<IsPrivate><Messages/></IsPrivate>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/help' element={<Help/>}/>
</Routes>
    </div>
  );
}

export default App;
