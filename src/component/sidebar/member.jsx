import { Component } from "react";
import { Link } from "react-router-dom";
import {MEMBERTITLE, ACTIVEMEMBERLISTONE, ACTIVEMEMBERLISTTWO} from "./sidebarconsts";



class ActiveMember extends Component {
    render() { 
        return (
            <div className="active-member bg-white mb-4">
                <div className="modal-header">
                    <h6>{MEMBERTITLE}</h6>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="Newest-tab" data-bs-toggle="tab" data-bs-target="#Newest" type="button" role="tab" aria-controls="Newest" aria-selected="true">Newest </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="Popular-tab" data-bs-toggle="tab" data-bs-target="#Popular" type="button" role="tab" aria-controls="Popular" aria-selected="false">Popular</button>
                        </li>
                    </ul>
                </div>
                <div className="modal-body group__bottom--body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="Newest" role="tabpanel" aria-labelledby="Newest-tab">
                            <ul>
                                {ACTIVEMEMBERLISTONE.map((val, i) => (
                                    <li key={i}>
                                        <div className="top">
                                            <div className="left member--style2">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <span className="member__activity"></span>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <Link to="/member-single"><h6>{val.title}</h6></Link>
                                                <span>{val.activety}</span>
                                            </div>
                                        </div>
                                    </li>   
                                ))}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="Popular" role="tabpanel" aria-labelledby="Popular-tab">
                            <ul>
                                {ACTIVEMEMBERLISTTWO.map((val, i) => (
                                    <li key={i}>
                                        <div className="top">
                                            <div className="left member--style2">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <span className="member__activity"></span>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <Link to="/member-single"><h6>{val.title}</h6></Link>
                                                <span>{val.activety}</span>
                                            </div>
                                        </div>
                                    </li>   
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ActiveMember;