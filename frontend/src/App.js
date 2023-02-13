import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return <>

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />}>
        </Route>

        {/*<Route path="/" element={<div> <StartForFree details={startforfree} /> </div>   }>*/}
        {/*</Route>*/}

        {/*<Route path="/" element={<div> <SignIn details={signin} /></div>}>*/}
        {/*</Route>*/}


      </Routes>

    </BrowserRouter>
  </>;
}

export default App;
