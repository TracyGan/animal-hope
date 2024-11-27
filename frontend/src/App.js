import logo from "./logo.svg";
import "./App.css";
import SignIn from "./sign-in/SignIn.js";
import DonationLog from "./donation/DonationLog.js";
import Food from "./food/Food.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShiftsCalendar from "./shifts/shifts.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<SignIn/>}/>
              <Route path="shifts" element={<ShiftsCalendar/>}/>
              <Route path="donations" element={<DonationLog/>}/>
              <Route path="food" element={<Food/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
