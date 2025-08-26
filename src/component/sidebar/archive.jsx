import { Component } from "react";
import { ARCHIVETITLE, ARCHIVELIST } from "./sidebarconsts";




class Archive extends Component {
    
    render() { 
        return (
            <div className="widget widget-archive">
                <div className="widget-header">
                    <h5>{ARCHIVETITLE}</h5>
                </div>
                <ul className="lab-ul widget-wrapper list-bg-none">
                    {ARCHIVELIST.map((val, i) => (
                        <li key={i}>
                            <a href="#" className="d-flex flex-wrap justify-content-between"><span><i className="icofont-ui-calendar"></i>{val.month}</span><span>{val.year}</span></a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default Archive;