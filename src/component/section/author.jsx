import { Component } from "react";
import { AUTHORNAME, AUTHORDESC, AUTHORSOCIALLIST } from "../section/sectionconsts"; // Importing constants


class Author extends Component {
    render() { 
        return (
            <div className="author">
                <div className="author__thumb">


                    <img src="assets/images/blog/author/01.jpg" alt="author" />
                </div>
                <div className="author__content">
                    <h6 className="mb-2">{AUTHORNAME}</h6>
                    <p>{AUTHORDESC}</p>
                    <div className="social-media">
                        {AUTHORSOCIALLIST.map((val, i) => (
                            <a href={`${val.IconLink}`} key={i}><i className={`${val.IconName}`}></i></a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Author;



