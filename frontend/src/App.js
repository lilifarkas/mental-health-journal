import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Register from './Components/Register/Register.jsx';
import Profile from "./Components/Profile/Profile"
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
    <div className='App'>
       <BrowserRouter>
          <Routes>
              <Route path='/' element={<LandingPage />} />
            <Route path='/registration' element={<Register />} />
            <Route path="/main" element={<MainPage />}></Route>
              <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
