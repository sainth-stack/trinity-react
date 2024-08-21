import "./App.css";
import { AdminLayout } from "./layout";
import { Login } from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import { ResourceManagement } from "./pages/ResourceManagement";
import { TimeSheet } from "./pages/TimeSheet";
import { Projects } from "./pages/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Report } from "./pages/Reports";
import { Twin } from "./pages/Twin";
import { Humidity } from "./pages/Humidity";
import { AdminLayoutV2 } from "./layoutV2";
import { Harvest } from "./pages/Harvest";
import { Photosynthesis } from "./pages/strains";
import Zwhoosh from "./pages/zwhoosh";
import Dashboard from "./pages/dashboard";
import { NewHarvest } from "./pages/NewHarvest";
import { AdminLayoutV3 } from "./layoutV3";
import { Accounts } from "./pages/Settings";
import { Layout } from "./pages/Settings/Layout";
import { Hardware } from "./pages/Settings/Hardware";
import { Software } from "./pages/Settings/Software";
import DataSource from "./pages/Settings/dataSource";
=======
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
import DataSource from './pages/Settings/dataSource';
import { CureRooms } from './pages/cure';
>>>>>>> a980bd254d7401f47eff5b6215ca79240d2d1dd8
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AdminLayoutV2 />}>
          <Route path="/" element={<Dashboard />} />
<<<<<<< HEAD
=======
          <Route path="/data-source" element={<DataSource />} />
>>>>>>> a980bd254d7401f47eff5b6215ca79240d2d1dd8
          <Route path="/rooms" element={<Twin />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/new-harvest" element={<Harvest />} />
          <Route path="/harvest" element={<NewHarvest />} />
          <Route path="/strains" element={<Photosynthesis />} />
          <Route path="/cure-rooms" element={<CureRooms />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<AdminLayoutV3 />}>
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/software" element={<Software />} />
          <Route path="/updates" element={<Software />} />
          {/* <Route path="/data-source" element={<DataSource />} /> */}
        </Route>
        <Route path="/zwhoosh" element={<Zwhoosh />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
