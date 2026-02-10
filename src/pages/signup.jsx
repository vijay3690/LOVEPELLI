import { Component } from "react";
import { Link } from "react-router-dom";
import SelectMarid from "../component/select/selectmarid";


 const signupTitle = "Welcome to ";
 const signupDesc = "Let's create your profile! Just fill in the fields below, and we’ll get a new account.";
 const signupAccTitle = "Acount Details";


class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            regName: '',
            regEmail: '',
            regPassword: '',
            regConPassword: '',
        };
    }
    render() { 
        return (
            <section className="log-reg">
                <div className="top-menu-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-7">
                                <div className="logo">
                                    <Link to="/homeone"><img src="assets/images/logo/lovepelli_logo_big.png" alt="log" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-5">
                                <Link to="/homeone" className="backto-home"><i className="fas fa-chevron-left"></i> Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="image"></div>
                        <div className="col-lg-7">
                            <div className="log-reg-inner">
                                <div className="section-header">
                                    <h2 className="title">{signupTitle} </h2>
                                    <p>{signupDesc} </p>
                                </div>
                                <div className="main-content">
                                    <form action="#">
                                        <h4 className="content-title">{signupAccTitle}</h4>
                                        <div className="form-group">
                                            <label>Username*</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="item01"
                                                value={this.state.regName}
                                                onChange={(e)=>{this.setState({regName: e.target.value});}}
                                                placeholder="Enter Your Usewrname *"
                                                className="my-form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address*</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="item02"
                                                value={this.state.regEmail}
                                                onChange={(e)=>{this.setState({regEmail: e.target.value});}}
                                                placeholder="Enter Your Email *"
                                                className="my-form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password*</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="item03"
                                                value={this.state.regPassword}
                                                onChange={(e)=>{this.setState({regPassword: e.target.value});}}
                                                placeholder="Enter Your Password *"
                                                className="my-form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password*</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="item04"
                                                value={this.state.regConPassword}
                                                onChange={(e)=>{this.setState({regConPassword: e.target.value});}}
                                                placeholder="Enter Your Password *"
                                                className="my-form-control"
                                            />
                                        </div>
                                        <h4 className="content-title mt-5">Profile Details</h4>
                                        <div className="form-group">
                                            <label>Name*</label>
                                            <input type="text" className="my-form-control" placeholder="Enter Your Full Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Birthday*</label>
                                            <input type="date" className="my-form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>I am a*</label>
                                            <div className="banner__inputlist">
                                                <div className="s-input me-3">
                                                    <input type="radio" name="gender1" id="males1" />
                                                    <label htmlFor="males1">Man</label>
                                                </div>
                                                <div className="s-input">
                                                    <input type="radio" name="gender1" id="females1" />
                                                    <label htmlFor="females1">Woman</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Looking for a*</label>
                                            <div className="banner__inputlist">
                                                <div className="s-input me-3">
                                                    <input type="radio" name="gender2" id="females" />
                                                    <label htmlFor="females">Bride</label>
                                                </div>
                                                <div className="s-input">
                                                    <input type="radio" name="gender2" id="males" />
                                                    <label htmlFor="males">Groom</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Marial status*</label>
                                            <div className="banner__inputlist">
                                                <SelectMarid select={'Married'} />
                                            
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>City*</label>
                                            <input type="text" className="my-form-control" placeholder="Enter Your City" />
                                        </div>
                                        <Link to="/" style={{ padding: '10px', background: 'skyblue', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                                            Continue
                                        </Link> 
                                      
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
 
export default SignUp;