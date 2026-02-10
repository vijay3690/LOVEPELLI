import { Component} from "react";
import { Link } from "react-router-dom";


 const ERRORPAGETITLE = 'Oops! This Page Not Pound';
 const ERRORPAGEDESC = 'We are Really Sorry But the Page you Requested is Missing :('; 
 const ERRORPAGEBTNTEXT = 'Go Back to Home';
 
class ErrorPage extends Component {
    render() { 
        return (
            <section className="log-reg forezero">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="image image-404"></div>
                        <div className="col-lg-7 ">
                            <div className="log-reg-inner">
                                <div className="main-thumb mb-5">
                                    <img src="assets/images/404.png" alt="datting thumb" />
                                </div>
                                <div className="main-content inloginp">
                                    <div className="text-content text-center">
                                        <h2>{ERRORPAGETITLE}</h2>
                                        <p>{ERRORPAGEDESC}</p>
                                        <Link to="/homeone" className="default-btn reverse"><span>{ERRORPAGEBTNTEXT}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default ErrorPage;