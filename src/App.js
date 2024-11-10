import logo from "./logo.svg";
import "./App.css";
import SignIn from "./sign-in/SignIn.js";
import Donation from "./donation/Donation.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Donation></Donation>
      </header>
    </div>
  );
}

export default App;
