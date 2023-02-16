import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Footer from './Components/Footer/Footer';
import Profile from "./Components/Profile/Profile"

function App() {
  return (
    <div className='App'>
      <div className='container'>
       < MainPage />
       <BrowserRouter>
          <Routes>
            <Route path="/main" element={<MainPage />}></Route>
              <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
      < Footer />
    </div>
  );
}

export default App;
