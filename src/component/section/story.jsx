import { Component } from "react";
import { Link } from "react-router-dom";
import {STORYTITLE,STORYDESC,STORYSECTIONCONTENTLIST} from "./sectionconsts";


class StorySection extends Component {
    render() { 
        return (
            <div className="story bg_img padding-top padding-bottom" style={{backgroundImage: "url(/assets/images/bg-img/02.jpg)"}}>
                <div className="container">
                    <div className="section__header style-2 text-center wow fadeInUp" data-wow-duration="1.5s">
                        <h2>{STORYTITLE}</h2>
                        <p>{STORYDESC}</p>
                    </div>
                    <div className="section__wrapper wow fadeInUp" data-wow-duration="1.5s">
                        <div className="row g-4 justify-content-center row-cols-lg-3 row-cols-sm-2 row-cols-1">
                            {STORYSECTIONCONTENTLIST.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="story__item">
                                        <div className="story__inner">
                                            <div className="story__thumb">
                                                <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                <span className="member__activity member__activity--ofline">{val.activity}</span>
                                            </div>
                                            <div className="story__content">
                                                <Link to="/blog-single"><h4>{val.title}</h4></Link>
                                                <div className="story__content--author">
                                                    <div className="story__content--thumb">
                                                        <img src={`${val.authorImg}`} alt={`${val.authorImgAlt}`} />
                                                    </div>
                                                    <div className="story__content--content">
                                                        <h6>{val.authorName}</h6>
                                                        <p>{val.postDate}</p>
                                                    </div>
                                                </div>
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
 
export default StorySection;