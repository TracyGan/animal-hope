import logo from "./logo.svg";
import "./App.css";
import SignIn from "./sign-in/SignIn.js";
import DonationLog from "./donation/DonationLog.js";
import Food from "./food/Food.js";
import ClientProfiles from "./profiles/ClientProfiles.js";
import AnimalProfiles from "./profiles/AnimalProfiles.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <SignIn></SignIn> */}
        {/* <DonationLog></DonationLog> */}
        {/* <Food></Food> */}
        {/* {<ClientProfiles></ClientProfiles>} */}
        {<AnimalProfiles></AnimalProfiles>}
      </header>
    </div>
  );
}

export default App;
