import { Component } from "react";
import { Link } from "react-router-dom";
import {WORKSECTIONCONTENTLIST} from "./sectionconsts";


class WorkSectionTwo extends Component {
    render() { 
        return (
            <div className="work work--style2 padding-top padding-bottom bg_img" style={{backgroundImage: "url(/assets/images/bg-img/01.jpg)"}}>
                <div className="container">
                    <div className="section__wrapper">
                        <div className="row g-4 justify-content-center">
                            {WORKSECTIONCONTENTLIST.map((val, i) => (
                                <div className="col-xl-6 col-lg-8 col-12 wow fadeInLeft" data-wow-duration="1.5s" key={i}>
                                    <div className="work__item">
                                        <div className="work__inner">
                                            <div className="work__thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="work__content">
                                                <h3>{val.title}</h3>
                                                <p>{val.desc} </p>
                                                <Link to={val.btnLink} className="default-btn"><span>{val.btnText}</span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default WorkSectionTwo;

