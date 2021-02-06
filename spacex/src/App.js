import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { store, persistor } from './_redux/_store'
import Dashboard from './_pages/Dashboard'

function App() {
  return (
    <Provider store={store}>
    <div className="App" id="spacexWrapper">
        <Dashboard/>
    </div>
    </Provider>
  );
}

export default App;
