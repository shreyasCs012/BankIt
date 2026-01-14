import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Profile } from './pages/Profile';
import { AccountDetail} from './pages/AccountDetail';
import { Landing } from './pages/Landing';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/profile" element={<Profile />} />
<Route path="/accounts/:accountNo" element={<AccountDetail />} />


    </Routes>
  );
}

export default App;
