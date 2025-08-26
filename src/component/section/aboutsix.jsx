import { Component } from "react";
import { Link } from "react-router-dom";
import {ABOUTSIXTITLE,
ABOUTSIXSUBTITLE,
ABOUTSIXDESC,
ABOUTSIXBTNTEXT,
ABOUTSIXIMGURL,
ABOUTSIXIMGALT} from "../section/sectionconsts"; // Importing constants

class AboutSectionSix extends Component {
    render() { 
        return (
            <div className="about about--style5 padding-top padding-bottom">
                <div className="container">
                    <div className="row justify-content-center g-4 align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="about__thumb">
                                <img src={`${ABOUTSIXIMGURL}`} alt={`${ABOUTSIXIMGALT}`} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="about__content">
                                <h2>{ABOUTSIXTITLE}</h2>
                                <h5>{ABOUTSIXSUBTITLE}</h5>
                                <p>{ABOUTSIXDESC}</p>
                                <Link to="/membership" className="default-btn reverse"><span>{ABOUTSIXBTNTEXT}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AboutSectionSix;