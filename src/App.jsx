import {BrowserRouter, Routes, Route } from "react-router-dom";
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
import SignUp from "./pages/otp-signs/signup";
import Register from "./pages/registration/register";




function App() {


	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
				    <Route path="/" element={<HomePage/>}/>
				    <Route path="homefour" element={<HomePageFour />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="membership" element={<MembershipPage />} />
					<Route path="*" element={<ErrorPage />} />
					<Route path="community" element={<CommunityPage />} />
					<Route path="group" element={<GroupPage />} />
					<Route path="group-single" element={<GroupDetails />} />
					<Route path="members" element={<MembersPage />} />
					<Route path="activity" element={<ActivityPage />} />
				    <Route path="contact" element={<ContactUs />} />
					<Route path="login" element={<LogIn />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="member-single" element={<MemberDetails />} />
					<Route path="policy" element={<Policy />} />
					<Route path="SignUp" element={<SignUp />} />
	    	        <Route path="register" element={<Register />} />
				</Routes>
			</BrowserRouter>

			
			
		</div>
	);
}

export default App;





