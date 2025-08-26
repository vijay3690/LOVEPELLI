import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { HEADERS_INFOLIST, HEADERS_SOCIALLIST } from "./layoutconsts";



class HeaderFour extends Component {
    render() { 
        window.addEventListener('scroll', function() {
            var value = window.scrollY;
            if (value > 200) {
                document.querySelector('.header').classList.add(['header-fixed'], ['animated'], ['fadeInDown'])
            }else{
                document.querySelector('.header').classList.remove(['header-fixed'], ['animated'], ['fadeInDown'])
            }
        });
        return (
            <header className="header header--style2" id="navbar">
                <div className="header__top d-none d-lg-block">
                    <div className="container">
                        <div className="header__top--area">
                            <div className="header__top--left">
                                <ul>
                                    {HEADERS_INFOLIST.map((val, i) => (
                                        <li key={i}>
                                             <span>{val.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="header__top--right">
                                <ul>
                                    {HEADERS_SOCIALLIST.map((val, i) => (
                                        <li key={i}><a href={val.link}>{/* <i className={val.iconName}></i> */}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="header__bottom">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg">
                            <Link className="navbar-brand" to="/"><img src="assets/images/logo/lovepelli_logo_big.png" alt="log" /></Link>
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler--icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav mainmenu">
                                    <ul>
                                        <li className="menu-item-has-children">
                                            {/* <a href="#" role="button" data-bs-offset="0,0"></a> */}
                                        </li>
                                        <li><NavLink to="/">Home</NavLink></li>

                                        <li className="menu-item-has-children"></li>
                                        <li><NavLink to="/membership">Membership</NavLink></li>

                                     <li className="menu-item-has-children">
                                           
                                            <li><NavLink to="/community">Community</NavLink></li>
                                            <ul className="dropdown-menu">
                                     
                                                <li><NavLink to="/members">All Members</NavLink></li>
                                                <li><NavLink to="/activity">Activity</NavLink></li>
                                                </ul>
                                        </li>
                                     
                                        <li><NavLink to="/contact">contact</NavLink></li>
                                        <li><NavLink to="/about">About Us</NavLink></li>
                                          
                                       
                                    
                                    </ul>
                                </div>
                                <ul className="button-group">
                                <li><Link to="/logout" className="default-btn login"> {/* <i className="fa-solid fa-user"></i> */} <span>LOGOUT</span> </Link></li>
                                    
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
 
export default HeaderFour;




