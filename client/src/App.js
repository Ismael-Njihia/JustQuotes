import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Home" element={<Home />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
