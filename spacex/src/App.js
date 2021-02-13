import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { store, persistor } from './_redux/_store'
import { PersistGate } from 'redux-persist/integration/react'
import Dashboard from './_pages/Dashboard'

function App() {
  return (
    <Provider store={store}>
      <div className="App" id="spacexWrapper">
        <PersistGate persistor={persistor}>
        <Dashboard/>
        </PersistGate>
      </div>
    </Provider>
  );
}

export default App;
