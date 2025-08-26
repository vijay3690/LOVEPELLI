import { Component } from "react";
import { Link } from "react-router-dom";
import { MEMBERTHREETITLE,MEMBERTHREEDESC,MEMBERTHREEBTNTEXT,MEMBERSECTIONTHREECONTENTLIST } from "./sectionconsts";


class MemberSectionThree extends Component {
    render() { 
        return (
            <div className="member member--style3 padding-top padding-bottom">
                <div className="container">
                    <div className="section__header style-2 text-center wow fadeInUp" data-wow-duration="1.5s">
                        <h2>{MEMBERTHREETITLE}</h2>
                        <p>{MEMBERTHREEDESC}</p>
                    </div>
                    <div className="section__wrapper">
                        <div className="row g-0 mx-12-none justify-content-center wow fadeInUp" data-wow-duration="1.5s">
                            {MEMBERSECTIONTHREECONTENTLIST.map((val, i) => (
                                <div className="member__item" key={i}>
                                    <div className="member__inner">
                                        <div className="member__thumb">
                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                        </div>
                                        <div className="member__content">
                                            <Link to="/member-single"><h5>{val.name}</h5></Link>
                                            <p>{val.activity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4 wow fadeInUp" data-wow-duration="2s">
                            <Link to="/members" className="default-btn"><span>{MEMBERTHREEBTNTEXT} <i className="ms-2 fas fa-users"></i></span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MemberSectionThree;