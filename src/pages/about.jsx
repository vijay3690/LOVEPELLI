import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import AboutSection from "../component/section/about";
import AboutSectionSix from "../component/section/aboutsix";
import StorySection from "../component/section/story";
import WorkSectionTwo from "../component/section/worktwo";
import HeaderFour from "../component/layout/headerfour";




class AboutPage extends Component {
    render() { 
        return (
            <Fragment>
                <HeaderFour />
                <PageHeader title={'About Our LovePelli'} curPage={'About Us'} />
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