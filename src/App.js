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
import { AdminLayoutV2 } from './layoutV2';
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
          <Route path="/twin" element={<Twin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
