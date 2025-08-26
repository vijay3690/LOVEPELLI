import { Component } from "react";
import {INSTAGRAMTITLE,INSTAGRAMLIST} from "./sidebarconsts";




class Instagram extends Component {
    render() { 
        return (
            <div className="widget widget-instagram">
                <div className="widget-header">
                    <h5>{INSTAGRAMTITLE}</h5>
                </div>
                <ul className="lab-ul widget-wrapper d-flex flex-wrap justify-content-center">
                    {INSTAGRAMLIST.map((val, i) => (
                        <li key={i}><a href={`${val.imgUrl}`} target="_blank"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></a></li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default Instagram;