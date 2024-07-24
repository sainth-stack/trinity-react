import './App.css';
import { AdminLayout } from './layout';
import { Login } from './pages/Auth/login';
import { Register } from './pages/Auth/register';
import { ResourceManagement } from './pages/ResourceManagement';
import { TimeSheet } from './pages/TimeSheet';
import { Projects } from './pages/Projects';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Report } from './pages/Reports';
import { Twin } from './pages/Twin';
import { Humidity } from './pages/Humidity'
import { AdminLayoutV2 } from './layoutV2';
import { Harvest } from './pages/Harvest';
import { Photosynthesis } from './pages/strains';
import Zwhoosh from './pages/zwhoosh';
import Dashboard from './pages/dashboard';
import { NewHarvest } from './pages/NewHarvest';
import { AdminLayoutV3 } from './layoutV3';
import { Accounts } from './pages/Settings';
import { Layout } from './pages/Settings/Layout';
import { Hardware } from './pages/Settings/Hardware';
import { Software } from './pages/Settings/Software';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayoutV2 />}>
        <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Twin />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/new-harvest" element={<Harvest />} />
          <Route path="/harvest" element={<NewHarvest />} />
          <Route path="/strains" element={<Photosynthesis />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<AdminLayoutV3 />}>
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/software" element={<Software />} />
          <Route path="/updates" element={<Software />} />
        </Route>
        <Route path="/zwhoosh" element={<Zwhoosh />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
