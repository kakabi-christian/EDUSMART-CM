import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; 
import Register from './pages/Register';
import Login from './pages/Login';
import HowItWork from './pages/HowItWork';
import Contact from './pages/Contact';

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
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-work" element={<HowItWork />} />
          <Route path="/contact" element={<Contact />} />
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