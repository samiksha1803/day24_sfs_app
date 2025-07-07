import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Create from "./Create";
import NavBar from "./NavBar";
import {BrowserRouter, Routes,Route} from "react-router-dom";

function App() {
  return (
	<>
	<h1> Profile Management System </h1>
	<BrowserRouter>
		<NavBar/>
		<Routes>
			<Route path="/" element={ <Home/> } />
			<Route path="/create" element={ <Create/> } />
			<Route path="*" element={ <Home/> } />
		</Routes>
	</BrowserRouter>
	</>
  );
}

export default App;
