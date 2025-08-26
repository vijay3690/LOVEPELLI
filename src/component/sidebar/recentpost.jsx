import { Component } from "react";
import { Link } from "react-router-dom";
import { RECENTPOSTTITLE, RECENTPOSTLIST } from "./sidebarconsts";





class RecentPost extends Component {
    render() { 
        return (
            <div className="widget widget-post">
                <div className="widget-header">
                    <h5>{RECENTPOSTTITLE}</h5>
                </div>
                <ul className="lab-ul widget-wrapper">
                    {RECENTPOSTLIST.map((val, i) => (
                        <li className="d-flex flex-wrap justify-content-between" key={i}>
                            <div className="post-thumb">
                                <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                            </div>
                            <div className="post-content ps-4">
                                <Link to="/blog-single">
                                    <h6>{val.title}</h6>
                                </Link>
                                <p>{val.pubDate}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default RecentPost;