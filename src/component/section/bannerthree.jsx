import { Component } from "react";
import { Link } from "react-router-dom";
import { BANNERTHREETITLE,
BANNERTHREEDESC,
BANNERTHREEBTNTEXT } from "./sectionconsts";


class BannerThree extends Component {
    render() { 
        return (
            <div className="banner banner---style3 padding-top bg_img" style={{backgroundImage: "url(/assets/images/banner/bg_couple1.jpg)"}}>
                <div className="container">
                    <div className="row g-0 justify-content-center justify-content-xl-between">
                        <div className="col-lg-5 col-12 wow fadeInLeft" data-wow-duration="1.5s">
                            <div className="banner__content">
                                <div className="banner__title">
                                    <h3>{BANNERTHREETITLE}</h3>
                                    <p>{BANNERTHREEDESC}</p>
                                    <Link to="/register" className="default-btn style-2"><span>{BANNERTHREEBTNTEXT}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default BannerThree;