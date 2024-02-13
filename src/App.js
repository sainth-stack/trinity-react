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
import {Humidity} from './pages/Humidity'
import { AdminLayoutV2 } from './layoutV2';
import { Harvest } from './pages/Harvest';
import { Strains } from './pages/strains';
import Zwhoosh from './pages/zwhoosh';
import Dashboard from './pages/dashboard';
import { NewHarvest } from './pages/NewHarvest';
import { AdminLayoutV3 } from './layoutV3';
import { Accounts,Rooms } from './pages/Settings';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/timesheet" element={<TimeSheet />} />
          <Route path="/resource-management" element={<ResourceManagement />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/reports" element={<Report />}/> */}
        </Route>
        <Route path="/reports" element={<Report />} />
        <Route path="/" element={<AdminLayoutV2 />}>
          <Route path="/temp" element={<Twin />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/new-harvest" element={<Harvest />} />
          <Route path="/harvest" element={<NewHarvest />} />
          <Route path="/strains" element={<Strains />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<AdminLayoutV3 />}>
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/hardware" element={<Rooms />} />
          <Route path="/api" element={<Rooms />} />
          <Route path="/updates" element={<Rooms />} />
        </Route>
        <Route path="/zwhoosh" element={<Zwhoosh />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
