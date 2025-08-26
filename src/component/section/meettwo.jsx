import { Component } from "react";
import { Link } from "react-router-dom";
import { MEETTWOTITLE, MEETTWODESC, MEETTWOBTNTEXT, MEETSECTIONTWOCONTENTLISTONE, MEETSECTIONTWOCONTENTLISTTWO } from "./sectionconsts";


class MeetSectionTwo extends Component {
    render() { 
        return (
            <div className="meet meet--style2 padding-top padding-bottom">
                <div className="container">
                    <div className="section__wrapper">
                        <div className="row g-4 justify-content-center align-items-center">
                            <div className="col-lg-6 col-12 wow fadeInUp" data-wow-duration="1.5s">
                                <div className="section__header">
                                    <h2>{MEETTWOTITLE}</h2>
                                    <p>{MEETTWODESC}</p>
                                    <Link to="/members" className="default-btn"><span>{MEETTWOBTNTEXT}  <i className="fas fa-map-marker-alt ms-2"></i></span></Link>
                                </div>
                            </div>
                            {MEETSECTIONTWOCONTENTLISTONE.map((val, i) => (
                                <div className="col-lg-3 col-sm-6 col-12" key={i}>
                                    <div className="meet__item">
                                        <div className="meet__inner">
                                            <div className="meet__thumb">
                                                <Link to="/members"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                            </div>
                                            <div className="meet__content">
                                                <img src={`${val.imgIconUrl}`} alt={`${val.imgIconAlt}`} />
                                                <Link to="/members"><h4>{val.title}</h4></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {MEETSECTIONTWOCONTENTLISTTWO.map((val, i) => (
                                <div className="col-lg-6 col-12" key={i}>
                                    <div className="meet__item">
                                        <div className="meet__inner">
                                            <div className="meet__thumb">
                                                <Link to="/members"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                            </div>
                                            <div className="meet__content">
                                                <img src={`${val.imgIconUrl}`} alt={`${val.imgIconAlt}`} />
                                                <Link to="/members"><h4>{val.title}</h4></Link>
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
 
export default MeetSectionTwo;