
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/Header.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import BrowseUsers from "./components/BrowseUsers.js"
import Logout from './components/Logout.js';
import Personal from "./components/Personal.js"
import Chat from "./components/Chat.js"
function App() {

  return (
    <Router>
    <div className="App" class="page">
    
    <Routes>
        
        <Route path="/" element={[<Header></Header>,<Personal></Personal>]}></Route>
        <Route path="/login" element={[<Header></Header>,<Login/>]}/>
        <Route path="/register" element={[<Header></Header>,<Register/>]}/>
        <Route path="/browse" element={[<Header></Header>,<BrowseUsers/>]}/>
        <Route path="/logout" element={[<Header></Header>,<Logout></Logout>]}></Route>
        <Route path="/profile/:userid" element={[<Header></Header>,<Chat></Chat>]}></Route>
        </Routes>
      
    </div>
    
    
    
    
    </Router>
  );
}
//<Chat userid="65d218dd2616660c65619c9e"></Chat>
export default App;
