import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; 
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOtp from './pages/Verify-otp';
import HowItWork from './pages/HowItWork';
import School from './pages/admin/School';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/admin/Profile';
import User from './pages/admin/User';
import Stats from './pages/admin/Stats';
function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="#" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-work" element={<HowItWork />} />
          {/* Routes Admin (avec enfants) */}
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="school" element={<School />} />    
            <Route path="profile-admin" element={<Profile />} />
            <Route path="user" element={<User />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;