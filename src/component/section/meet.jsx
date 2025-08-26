import { Component } from "react";
import { Link } from "react-router-dom";
import {MEETTITLE,MEETDESC,MEETBTNTEXT,MEETSECTIONCONTENTLISTONE,MEETSECTIONCONTENTLISTTWO,
    MEETSECTIONCONTENTLISTTHREE} from "./sectionconsts";


class MeetSection extends Component {
    render() { 
        return (
            <div className="meet padding-top padding-bottom">
                <div className="container">
                    <div className="section__header style-2 text-center wow fadeInUp" data-wow-duration="1.5s">
                        <h2>{MEETTITLE}</h2>
                        <p>{MEETDESC}</p>
                    </div>
                    <div className="section__wrapper">
                        <div className="row g-4 justify-content-center wow fadeInUp" data-wow-duration="1.5s">
                            {MEETSECTIONCONTENTLISTONE.map((val, i) => (
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

                            {MEETSECTIONCONTENTLISTTWO.map((val, i) => (
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
                           

                           {MEETSECTIONCONTENTLISTONE.map((val,i) => (
                            <div className="col-lg-3 col-sm-6 col-12" key={i}>
                                <div className="meet_item">
                                    <div className="meet_inner">
                                        <div className="meet_thumb">
                                          <Link to="/members"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                        </div>
                                        <div className="meet_content">
                                         <img src={`${val.imgIconUrl}`} alt={`${val.imgIconAlt}`} />
                                         <Link to="/members"><h4>{val.title}</h4></Link>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                           ))}


                            {MEETSECTIONCONTENTLISTTHREE.map((val, i) => (
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
                        <div className="text-center mt-5 wow fadeInUp" data-wow-duration="1.5s">
                            <Link to="/members" className="default-btn"><span>{MEETBTNTEXT}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MeetSection;