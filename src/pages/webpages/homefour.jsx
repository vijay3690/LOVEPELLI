import {Component,Fragment} from "react";
import WorkSection from "../../component/section/work";
import Footer from "../../component/layout/footer";
import BannerThree from "../../component/section/bannerthree";
import WorkSectionTwo from "../../component/section/worktwo";
import HeaderFour from "../../component/layout/headerfour";
import AboutSection from "../../component/section/about";
import AboutSectionTwo from "../../component/section/abouttwo";

class HomePageFour extends Component{
    render(){
        return(
          <Fragment>
                <HeaderFour/>
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







































