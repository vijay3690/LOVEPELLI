import { Component } from "react";
import { Link } from "react-router-dom";
import SignUp from "../otp-signs/signup";



class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            userPass: '',
        };
    }
    render() { 
        return (
            <section className="log-reg">
                <div className="top-menu-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-7">
                            
                            </div>
                            <div className="col-lg-4 col-5">
                                <Link to="/" className="backto-home" ><i className="fas fa-chevron-left"></i> Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                     
                        <div className="col-lg-7">
                            <div>
                                <div className="section-header inloginp">
                                    
                                </div>
                                <div className="main-content inloginp">
                                    <form action="#">
                                           
                                    
                                        
                                        <div className = "or-content">
                                          
                                            
                                          
                                           <SignUp/>
                                          

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default LogIn;


