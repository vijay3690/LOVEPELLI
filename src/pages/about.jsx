import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import AboutSection from "../component/section/about";
import AboutSectionSix from "../component/section/aboutsix";
import StorySection from "../component/section/story";
import WorkSectionTwo from "../component/section/worktwo";
import HeaderOne from "../component/layout/headerone";




class AboutPage extends Component {
    render() { 
        return (
            <Fragment>
                <HeaderOne />
                <AboutSectionSix />
                <StorySection />
                <AboutSection />
				<WorkSectionTwo />
				<Footer />
            </Fragment>
        );
    }
}
 
export default AboutPage;