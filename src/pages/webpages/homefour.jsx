import {Component,Fragment} from "react";
import WorkSection from "../../component/section/work";
import Footer from "../../component/layout/footer";
import BannerThree from "../../component/section/bannerthree";
import WorkSectionTwo from "../../component/section/worktwo";
import AboutSection from "../../component/section/about";
import AboutSectionTwo from "../../component/section/abouttwo";
import HeaderOne from "component/layout/headerone";

class HomePageFour extends Component{
    render(){
        return(
          <Fragment>
                <HeaderOne/>
                <BannerThree/>
                <AboutSectionTwo />
                <AboutSection />
                <WorkSection/>
                <WorkSectionTwo/>
                <Footer/>
          </Fragment>
             
           
        );
    }
}

export default HomePageFour;







































