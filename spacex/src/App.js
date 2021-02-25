import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./_redux/_store";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./_pages/Dashboard";
import { history } from "./_redux/_store/history";
import { Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App" id="spacexWrapper">
        <Router history={history}>
          <PersistGate persistor={persistor}>
            <Dashboard />
          </PersistGate>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
