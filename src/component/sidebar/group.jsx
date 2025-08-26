import { Component } from "react";
import { Link } from "react-router-dom";
import {GROUPTITLE,ACTIVEGROUPLISTONE,ACTIVEGROUPLISTTWO} from "./sidebarconsts";




class ActiveGroup extends Component {
    render() { 
        return (
            <div className="active-group bg-white">
                <div className="modal-header">
                    <h6>{GROUPTITLE}</h6>
                    <ul className="nav nav-tabs" id="myTab2" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="aNewest-tab" data-bs-toggle="tab" data-bs-target="#aNewest" type="button" role="tab" aria-controls="aNewest" aria-selected="true">Newest </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="aPopular-tab" data-bs-toggle="tab" data-bs-target="#aPopular" type="button" role="tab" aria-controls="aPopular" aria-selected="false">Popular</button>
                        </li>
                    </ul>
                </div>
                <div className="modal-body group__bottom--body">
                    <div className="tab-content" id="myTabContent2">
                        <div className="tab-pane fade show active" id="aNewest" role="tabpanel" aria-labelledby="aNewest-tab">
                            <ul>
                                {ACTIVEGROUPLISTONE.map((val, i) => (
                                    <li key={i}>
                                        <div className="top">
                                            <div className="left member--style2">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <Link to="/group-single"><h6>{val.title}</h6></Link>
                                                <span>{val.activety}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="aPopular" role="tabpanel" aria-labelledby="aPopular-tab">
                            <ul>
                                {ACTIVEGROUPLISTTWO.map((val, i) => (
                                    <li key={i}>
                                        <div className="top">
                                            <div className="left member--style2">
                                                <div className="member__thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <Link to="/group-single"><h6>{val.title}</h6></Link>
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
 
export default ActiveGroup;