import { Component } from "react";
import {COMMENTSTITLE,COMMENTSLIST } from "./sectionConstants";


class Comments extends Component {
    render() { 
        return (
            <div className="comments">
                <h4 className="comment-title">{COMMENTSTITLE}</h4>
                <ul className="lab-ul comment-list">
                    {COMMENTSLIST.map((val, i) => (
                        <li className="comment" key={i}>
                            <div className="com-item">
                                <div className="com-thumb">
                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                </div>
                                <div className="com-content">
                                    <div className="com-title">
                                        <div className="com-title-meta">
                                            <a href="#" className="h7">{val.Name}</a>
                                            <span> {val.Date} </span>
                                        </div>
                                        <span className="reply">
                                            <a className="comment-reply-link" href="#"><i className="icofont-reply-all"></i>Reply</a>
                                        </span>
                                    </div>
                                    <p>{val.Massage}</p>
                                    <div className="reply-btn"></div>
                                </div>

                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default Comments;