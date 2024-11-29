import logo from "./logo.svg";
import "./App.css";
import SignIn from "./sign-in/SignIn.js";
import DonationLog from "./donation/DonationLog.js";
import Food from "./food/Food.js";
import ClientProfiles from "./profiles/ClientProfiles.js";
import AnimalProfiles from "./profiles/AnimalProfiles.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShiftsCalendar from "./shifts/shifts.js";
import Feed from "./food/Feed";
import NavBar from "./main/NavBar.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const WithNav = ({component}) => (
    <>
    <NavBar />
    {component}
    </>
  )
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<SignIn/>}/>
              <Route path="shifts" element={<WithNav component={<ShiftsCalendar/>}></WithNav>}/>
              <Route path="donations" element={<WithNav component={<DonationLog/>}></WithNav>}/>
              <Route path="food" element={<WithNav component={<Food/>}></WithNav>}/>
              <Route path="feed" element={<WithNav component={<Feed/>}></WithNav>}/>
              <Route path="clients" element={<WithNav component={<ClientProfiles/>}></WithNav>}/>
              <Route path="animals" element={<WithNav component={<AnimalProfiles/>}></WithNav>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;
