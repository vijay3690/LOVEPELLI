import { Component } from "react";
import { TAGSTITLE, TAGSLIST } from "./sidebarconsts";





class Tags extends Component {
    render() { 
        return (
            <div className="widget widget-tags">
                <div className="widget-header">
                    <h5>{tagsTitle}</h5>
                </div>
                <ul className="lab-ul widget-wrapper">
                    {TagsList.map((val, i) => (
                        <li key={i}><a href={`${val.SiteLink}`}>{val.Name}</a></li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default Tags;