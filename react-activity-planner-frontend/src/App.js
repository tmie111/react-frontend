import './App.css';
import ActivityPage from './components/ActivityPage';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
// import Random from './components/Random';
import Register from './components/Register';
import { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {

  const [userID, setUserID] = useState(null);


  return (
    <div className="App">

      <div className="menu">
        <Link to="/">Home</Link>
        {userID == null ? "" :
          <Link to="/activities">Dashboard</Link>}
        {userID !== null ? "" :
          <Link to="/login">Login Here</Link>}
        {userID !== null ? "" :
          <Link to="/register">Register Account</Link>}
        {userID === null ? "" :
          <Link to="/logout">Logout</Link>}
      </div>
  {/* <Random /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<ActivityPage userID={userID} />} />
          <Route path="/login" element={<Login setUserID={setUserID} />} />
          <Route path="/register" element={<Register setUserID={setUserID} />} />
          <Route path="/logout" element={<Logout userID={userID} setUserID={setUserID} />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
