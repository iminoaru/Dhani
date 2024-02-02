import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signup} from "./pages/Signup.jsx";
import {Login} from "./pages/Login.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {Send} from "./pages/Send.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup /> } />
            <Route path='/login' element={<Login /> } />
            <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard /> } />
            </Route>
            <Route path='/send' element={<Send /> } />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
