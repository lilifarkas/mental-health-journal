import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<MainPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      < Footer />
    </div>
  );
}

export default App;
