import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from './components/Router';
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
              <Route path="/*" element={<Router/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
