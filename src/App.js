import { RouterProvider } from "react-router-dom";
import "./App.css";
// Create a client
import { router } from "./routers";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
