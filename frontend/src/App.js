import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/registration' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
