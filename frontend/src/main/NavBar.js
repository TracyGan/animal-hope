import "./navbar.css"
export default function NavBar() {
  return <div className="navBox">
    <a href="/food">Food</a>
    <a href="/feed">Feed</a>
    <a href="/animals">Animals</a>
    <a href="/clients">Clients</a>
    <a href="/shifts">Shifts</a>
    <a href="/donations">Donations</a>
  </div>;
}
