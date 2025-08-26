import { Component } from "react";
import {TITLE,CATEGORYLIST} from "./sidebarconsts";



class CategorieTwo extends Component {
    render() { 
        return (
            <div className="widget widget-category">
                <div className="widget-header">
                    <h5>{TITLE}</h5>
                </div>
                <ul className="lab-ul widget-wrapper list-bg-none">
                    {CATEGORYLIST.map((val, i) => (
                        <li key={i}>
                            <a href="#" className="d-flex flex-wrap justify-content-between"><span><i className="icofont-rounded-double-right"></i>{val.name}</span><span>{val.count}</span></a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default CategorieTwo;