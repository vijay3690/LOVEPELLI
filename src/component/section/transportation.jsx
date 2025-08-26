import { Component } from "react";
import { Link } from "react-router-dom";

class TransportationSection extends Component {
    render() { 
        return (
            <section className="transportation padding-top padding-bottom">
                <div className="container">
                    <div className="section__wrapper">
                        <div className="row">
                            <div className="col-lg-4 col-12">
                                <div className="left">
                                    <div className="section__header style-2 mb-lg-0 wow fadeInUp" data-wow-duration="1.5s">
                                        <h2>Meet Singles in Your Area</h2>
                                        <p>If you want to meet local singles for dating, companionship, friendship or even more, you have come to the right place.</p>
                                        <ul>
                                            {TransportContentList.map((val, i) => (
                                                <li key={i}>
                                                    <div className="thumb"> <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></div>
                                                    <div className="content"><Link to="/members">{val.countryName}</Link></div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-12">
                                <div className="right wow fadeInUp" data-wow-duration="1.5s">
                                    {TransportContentList.map((val, i) => (
                                        <div className="lab-line" key={i}>
                                            <span></span>
                                            <div className="lab-tooltip"><Link to="/members">{val.countryName}</Link></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default TransportationSection;

// TransportationSection constants
export const transportationTitle = "Meet Singles in Your Area";
export const transportationDesc = "If you want to meet local singles for dating, companionship, friendship or even more, you have come to the right place.";
export const TransportContentList = [
    // ...existing code...
];