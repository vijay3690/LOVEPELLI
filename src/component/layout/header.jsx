import { Component } from "react";
import { Link,NavLink} from "react-router-dom";
import { HEADER_INFOLIST, HEADER_SOCIALLIST } from "./layoutconsts";

const header = document.querySelector('.header');

class Header extends Component {
    render() { 
        window.addEventListener('scroll', function() {
            var value = window.scrollY;

        const header = document.querySelector('.header');

if (header) {
    if (value > 200) {
        header.classList.add('header-fixed', 'animated', 'fadeInDown');
    } else {
        header.classList.remove('header-fixed', 'animated', 'fadeInDown');
    }
}

        });
        return (
            <header className="header header--style2" id="navbar">
                <div className="header__top d-none d-lg-block">
                    <div className="container">
                        <div className="header__top--area">
                            <div className="header__top--left">
                                <ul>
                                    {HEADER_INFOLIST.map((val, i) => (
                                        <li key={i}>
                                            <i className={val.iconName}></i> <span>{val.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="header__top--right">
                                <ul>
                                    {HEADER_SOCIALLIST.map((val, i) => (
                                        <li key={i}><a href={val.link}><i className={val.iconName}></i></a></li>
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
                                        <li className="menu-item-has-children"></li>
                                        {/* <li><NavLink to="/">HOME</NavLink></li> */}
                                            <li><NavLink to="/login">LOGIN</NavLink></li>
                                            <li><NavLink to="/register">REGISTRATION</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div> 
            </header>
        );
    }
}
 
export default Header;




