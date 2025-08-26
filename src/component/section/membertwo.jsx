import { Component } from "react";
import { Link } from "react-router-dom";
import {MEMBERTWOTITLE,MEMBERTWODESC,MEMBERTWOBTNTEXT,MEMBERCONTENTLISTNEWER,MEMBERCONTENTLISTACTIVE,
    MEMBERCONTENTLISTPOPULAR} from "./sectionconsts";


class MemberSectionTwo extends Component {
    render() { 
        return (
            <div className="member member--style2 padding-top padding-bottom">
                <div className="container">
                    <div className="section__header style-2 text-center wow fadeInUp" data-wow-duration="1.5s">
                        <h2>{MEMBERTWOTITLE}</h2>
                        <p>{MEMBERTWODESC}</p>
                    </div>
                    <div className="section__wrapper wow fadeInUp" data-wow-duration="1.5s">
                        <ul className="nav nav-tabs member__tab" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="newest-tab" data-bs-toggle="tab" data-bs-target="#newest" type="button" role="tab" aria-controls="newest" aria-selected="true">Newest Members</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="activemember-tab" data-bs-toggle="tab" data-bs-target="#activemember" type="button" role="tab" aria-controls="activemember" aria-selected="false">Active Members</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="popularmember-tab" data-bs-toggle="tab" data-bs-target="#popularmember" type="button" role="tab" aria-controls="popularmember" aria-selected="false">Popular Members</button>
                            </li>
                        </ul>
                        <div className="tab-content mx-12-none" id="myTabContent">
                            <div className="tab-pane fade show active" id="newest" role="tabpanel" aria-labelledby="newest-tab">
                                <div className="row g-0 justify-content-center">
                                    {MEMBERCONTENTLISTNEWER.map((val, i) => (
                                        <div className="member__item" key={i}>
                                            <div className="member__inner">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <span className="member__activity"></span>
                                                </div>
                                                <div className="member__content">
                                                    <Link to="/member-single"><h5>{val.name}</h5></Link>
                                                    <p>{val.activity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="activemember" role="tabpanel" aria-labelledby="activemember-tab">
                                <div className="row g-0 justify-content-center">
                                    {MEMBERCONTENTLISTACTIVE.map((val, i) => (
                                        <div className="member__item" key={i}>
                                            <div className="member__inner">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <span className="member__activity"></span>
                                                </div>
                                                <div className="member__content">
                                                    <Link to="/member-single"><h5>{val.name}</h5></Link>
                                                    <p>{val.activity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="popularmember" role="tabpanel" aria-labelledby="popularmember-tab">
                                <div className="row g-0 justify-content-center">
                                    {MEMBERCONTENTLISTPOPULAR.map((val, i) => (
                                        <div className="member__item" key={i}>
                                            <div className="member__inner">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <span className="member__activity"></span>
                                                </div>
                                                <div className="member__content">
                                                    <Link to="/member-single"><h5>{val.name}</h5></Link>
                                                    <p>{val.activity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/members" className="default-btn"><span>{MEMBERTWOBTNTEXT}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MemberSectionTwo;