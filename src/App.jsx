import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./landingPage";
import CommitteePage from "./components/CommitteePage";
import FeedbackPage from "./pages/FeedbackPage";
/* USER */
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import RaiseIssue from "./pages/user/RaiseIssue";
import MyIssues from "./pages/user/MyIssues";
import Profile from "./pages/user/Profile";
import Notices from "./pages/user/Notices";
import ChangePassword from "./pages/user/Changepassword";
import GovSchemes from "./pages/user/GovSchemes";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageIssues from "./pages/admin/ManageIssues";
import ManageNotices from "./pages/admin/ManageNotices";
import PublishNotice from "./pages/admin/PublishNotice";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* //<Route path="/" element={<Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/committee" element={<CommitteePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="raise-issue" element={<RaiseIssue />} />
        <Route path="my-issues" element={<MyIssues />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notices" element={<Notices />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="gov-schemes" element={<GovSchemes />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="issues" element={<ManageIssues />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="notices/new" element={<PublishNotice />} />
      </Route>
    </Routes>
  );
}

export default App;
