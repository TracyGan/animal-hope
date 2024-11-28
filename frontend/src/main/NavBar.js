import { NavLink } from "react-router-dom";
import "./navbar.css"
export default function NavBar() {
  return <div className="navBox">
    <NavLink to="/food">Food</NavLink>

    <NavLink to="/feed">Feed</NavLink>
    <NavLink to="/animals">Animals</NavLink>
    <NavLink to="/clients">Clients</NavLink>
    <NavLink to="/shifts">Shifts</NavLink>
    <NavLink to="/donations">Donations</NavLink>
  </div>;
}
