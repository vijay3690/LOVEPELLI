import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'swiper/css';

import ScrollToTop from './component/layout/scrolltop';
import AboutPage from "./pages/about";
import ActivityPage from "./pages/activity";
import CommunityPage from "./pages/community";
import ContactUs from "./pages/contact";
import ErrorPage from "./pages/errorpage";
import GroupPage from "./pages/group";
import GroupDetails from "./pages/groupsingle";
import LogIn from "./pages/authentication/login";
import MemberDetails from "./pages/member-single";
import MembersPage from "./pages/members";
import MembershipPage from "./pages/membership";
import Policy from "./pages/policy";
import HomePageOne from "./pages/webpages/homeone";
import HomePage from "./pages/webpages/home";  //  this will be your first open public home page
import Logout from "./pages/authentication/logout";
import AuthPage from "./pages/otp-signin/authpage";
import Register from "./pages/registration/register";
import ProtectedRoute from "/src/protectedroute";
import LogInEmail from "./pages/email-signin/loginEmail";
import ForgotPassword from "./pages/email-signin/forgotpassword";
import ResetPassword from "./pages/email-signin/resetpassword";
import MobileLogin from "./pages/email-signin/mobilelogin";
import Interests from "./pages/userprofile/interests";
import Notification from "./pages/userprofile/notifications";
import EditProfile from "./pages/userprofile/EditProfile.jsx";
import PartnerPreferences from "./pages/partnerpreference/partnerpreferences.jsx";





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<HomePage />} />  {/*  Default public landing page */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/authpage" element={<AuthPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/loginEmail" element={<LogInEmail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/mobilelogin" element={<MobileLogin />} />
           {/* <Route path="/member-single/:profileId" element={<MemberDetails />} /> */}

          {/* ---------- Protected Routes ---------- */}
          <Route path="/homeone" element={<ProtectedRoute><HomePageOne /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/membership" element={<ProtectedRoute><MembershipPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          <Route path="/group" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
          <Route path="/group-single" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/member-single/" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
          <Route path="/policy" element={<ProtectedRoute><Policy /></ProtectedRoute>} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/partnerpreferences" element={<ProtectedRoute><PartnerPreferences /></ProtectedRoute>} />
         <Route path="/member-single/:profileId" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} /> 



          {/* ---------- Catch-All Route ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/*  redirect unknown routes to homepage */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
