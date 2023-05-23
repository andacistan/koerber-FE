import DeviceList from './components/DeviceList'
import DeviceModal from './components/DeviceModal'
import { DeviceProvider } from './context/DeviceContext';

function App() {
  return (
    <div className="container">
      <div className="col-xs-12 col-sm-12 col-md-6 mx-auto mt-3">
        <h1>Device Manager App</h1>
        <DeviceProvider>
          <DeviceModal></DeviceModal>
          <DeviceList ></DeviceList>
        </DeviceProvider>
      </div>
    </div>
  );
}

export default App;
