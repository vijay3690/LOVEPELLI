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
import HomePageFour from "./pages/homepages/homefour";
import HomePage from "./pages/homepages/home";
import Logout from "./pages/authentication/logout";
import SignUp from "./pages/otp-signin/signup";
import Register from "./pages/registration/register";
import ProtectedRoute from "/src/protectedroute";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					{/* Public Routes */}
					<Route path="/login" element={<LogIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/register" element={<Register />} />
					<Route path="/logout" element={<Logout />} />

					{/* Protected Routes */}
					<Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
					<Route path="/homefour" element={<ProtectedRoute><HomePageFour /></ProtectedRoute>} />
					<Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
					<Route path="/membership" element={<ProtectedRoute><MembershipPage /></ProtectedRoute>} />
					<Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
					<Route path="/group" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
					<Route path="/group-single" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
					<Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
					<Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
					<Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
					<Route path="/member-single" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
					<Route path="/policy" element={<ProtectedRoute><Policy /></ProtectedRoute>} />
					<Route path="errorpage" element={<ProtectedRoute><ErrorPage/></ProtectedRoute>}/>

					{/* Catch-all → redirect */}
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
