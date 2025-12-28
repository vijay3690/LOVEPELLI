import { Component } from "react";
import { Link } from "react-router-dom";
import './layout.css';
import {
NEWS_TITLE,
JOIN_TITLE,
INFO_TITLE,
ACCOUNT_TITLE,
HELP_TITLE,
COMMUNITY_TITLE,
SOCIAL_LIST,
INFO_LIST,
INFO_LISTTWO,
INFO_LISTTHREE,
INFO_LISTFOUR,
CONTACT_INFOLIST
} from './layoutconsts'; // Adjust path if stored in a subfolder like ./constants

 

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            newsEmail: '',
        };
    }
    render() { 
        return (
            <footer className="footer overflow-hidden">
                <div className="footer__top bg_img" style={{backgroundImage: "url(/assets/images/footer/bg-3.jpg)"}}>
                    <div className="footer__newsletter wow fadeInUp" data-wow-duration="1.5s">
                        <div className="container">
                            <div className="row g-4 justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="footer__newsletter--area">
                                        <div className="footer__newsletter--title">
                                            <h4>{NEWS_TITLE}</h4>
                                        </div>
                                        <div className="footer__newsletter--form">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                if (this.state.newsEmail) {
                                                    // Here you can add your API call or logic to handle the subscription
                                                    alert(`Subscribed with: ${this.state.newsEmail}`);
                                                    this.setState({ newsEmail: '' });
                                                } else {
                                                    alert('Please enter a valid email address.');
                                                }
                                            }}>
                                                <input 
                                                    type="email"
                                                    name="email"
                                                    id="item01"
                                                    value={this.state.newsEmail}
                                                    onChange={(e)=>{this.setState({newsEmail: e.target.value});}}
                                                    placeholder="Your email address *" 
                                                />
                                                <button type="submit" className="default-btn"><span>Subscribe</span></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="footer__newsletter--area justify-content-xxl-end">
                                        <div className="footer__newsletter--title me-xl-4">
                                            <h4>{JOIN_TITLE}</h4>
                                        </div>
                                        <div className="footer__newsletter--social">
                                            <ul>
                                                {SOCIAL_LIST.map((social, index) => (
                                                    <li key={index}><Link to={social.visitLink}><i className={social.iconName}></i></Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__toparea padding-top padding-bottom wow fadeInUp" data-wow-duration="1.5s">
                        <div className="container">
                            <div className="row g-5 g-lg-0">
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="footer__item">
                                        <div className="footer__inner">
                                            <div className="footer__content">
                                                <div className="footer__content--title">
                                                    <h4>{INFO_TITLE}</h4>
                                                </div>
                                                <div className="footer__content--desc">
                                                    <ul>
                                                        {INFO_LIST.map((info, index) => (
                                                            <li key={index}><Link to={info.pageLink}><i className="fa-solid fa-angle-right"></i> {info.pageName}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="footer__item">
                                        <div className="footer__inner">
                                            <div className="footer__content">
                                                <div className="footer__content--title">
                                                    <h4>{ACCOUNT_TITLE}</h4>
                                                </div>
                                                <div className="footer__content--desc">
                                                    <ul>
                                                        {INFO_LISTTWO.map((info, index) => (
                                                            <li key={index}><Link to={info.pageLink}><i className="fa-solid fa-angle-right"></i> {info.pageName}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="footer__item">
                                        <div className="footer__inner">
                                            <div className="footer__content">
                                                <div className="footer__content--title">
                                                    <h4>{HELP_TITLE}</h4>
                                                </div>
                                                <div className="footer__content--desc">
                                                    <ul>
                                                        {INFO_LISTTHREE.map((info, index) => (
                                                            <li key={index}><Link to={info.pageLink}><i className="fa-solid fa-angle-right"></i> {info.pageName}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="footer__item">
                                        <div className="footer__inner">
                                            <div className="footer__content">
                                                <div className="footer__content--title">
                                                    <h4>{COMMUNITY_TITLE}</h4>
                                                </div>
                                                <div className="footer__content--desc">
                                                    <ul>
                                                        {INFO_LISTFOUR.map((info, index) => (
                                                            <li key={index}><Link to={info.pageLink}><i className="fa-solid fa-angle-right"></i> {info.pageName}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="footer__bottom wow fadeInUp" data-wow-duration="1.5s">
                    <div className="container">
                        <div className="footer__content text-center">
                            <p className="mb-0 footer-line">All Rights Reserved &copy; <Link to="/"> LovePelli </Link>   {" "} || Design By:<a href="https://www.weddysoft.com" target="_blank" rel="noopener noreferrer">
                             <img src="/assets/images/footer/clg.jpg" alt="Company Logo" class="weddysoft-logo" /></a></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
 
export default Footer;