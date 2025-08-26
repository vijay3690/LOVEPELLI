import { Component } from "react";
import { ABOUTTITLE, ABOUTSUBTITLE, ABOUTCONTENTTITLE } from "../section/sectionconsts"; // Importing constants


class AboutSection extends Component {
    render() { 
        return (
            <div className="about padding-top padding-bottom">
                <img  src="assets/images/logo/log.png" alt="log"/>
                <div className="container">
                    <div className="section__header style-2 text-center wow fadeInUp" data-wow-duration="1.5s">
                        <h2>{ABOUTTITLE}</h2>
                        <p>{ABOUTSUBTITLE}</p>
                    </div>
                    <div className="section__wrapper">
                        <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                            {ABOUTCONTENTTITLE.map((val, i) => (
                                <div className="col wow fadeInUp" data-wow-duration="1.5s" key={i}>
                                    <div className="about__item text-center">
                                        <div className="about__inner">
                                            <div className="about__thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="about__content">
                                                <h4>{val.title}</h4>
                                                <p>{val.desc}</p>
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
 
export default AboutSection;