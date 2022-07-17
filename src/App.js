import "./App.css";
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import NumberOfWheels from "./component/NumberOfWheels";
import VehicleType from "./component/VehicleType";
import VehicleModel from "./component/VehicleModel";

const AddRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/numberOfWheels", element: <NumberOfWheels /> },
    { path: "/numberOfWheels/:id", element: <VehicleType /> },
    { path: "/VehicleModel/:id", element: <VehicleModel /> },
  ]);
  return routes;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AddRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
