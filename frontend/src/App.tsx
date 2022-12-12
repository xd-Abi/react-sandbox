import {Provider as GlobalStoreProvider} from "react-redux";
import GlobalStore from "./store";
import SignUp from "./components/SignUp";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./styles/App.css";

const App = () => {
  return (
    <GlobalStoreProvider store={GlobalStore}>
      <SignUp />
    </GlobalStoreProvider>
  );
};

export default App;
