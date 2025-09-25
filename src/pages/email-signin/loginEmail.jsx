import { Component } from "react";
import { Link, Navigate } from "react-router-dom";


const title = "Welcome to LovePelli";
const BASE_API = "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net";


  const safeFetch = async (url, setter, label, options = {}) => {
  try {
    const res = await fetch(url, options); // 👈 now using options
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    if (setter) setter(data); // only call setter if provided
    return data; // 👈 return data so caller can use it
  } catch (err) {
    console.error(`Error ${label} from ${url}:`, err);
    throw err; // 👈 rethrow so handleSubmit can catch it
  }
};

class LogInEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPass: "",
      redirect: false, // used for navigation after login
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginToken = await safeFetch(
        `${BASE_API}/api/Login`,
        null,
        "token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.userEmail,
            password: this.state.userPass,
          }),
        }
      );

      localStorage.setItem("token", loginToken.token);

      // redirect to /members after login
      this.setState({ redirect: true });
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password!");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/members" replace />;
    }

    return (
      <section className="log-reg">
        <div className="top-menu-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-7">
                <div className="logo">
                  <Link to="/index-4">
                    <img src="assets/images/logo/pics.png" alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-5">
                <Link to="/login" className="backto-home">
                  <i className="fas fa-chevron-left"></i> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="image image-log"></div>
            <div className="col-lg-7">
              <div className="log-reg-inner">
                <div className="section-header inloginp">
                  <h2 className="title">{title}</h2>
                </div>
                <div className="main-content inloginp">
                  <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={this.state.userEmail}
                        onChange={(e) =>
                          this.setState({ userEmail: e.target.value })
                        }
                        placeholder="Enter Your Email *"
                        className="my-form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={this.state.userPass}
                        onChange={(e) =>
                          this.setState({ userPass: e.target.value })
                        }
                        placeholder="Enter Your Password *"
                        className="my-form-control"
                        required
                      />
                    </div>
                    <p className="f-pass">
                      Forgot your password? <Link to="/forgotpassword">Recover password</Link>
                    </p>
                    <div className="text-center">
                      <button type="submit" className="default-btn">
                        <span>Log In</span>
                      </button>
                    </div>

                    <div className="or-content">
                      <p className="or-signup">
                        {" "}
                        Don't have an account? <Link to="/register">Register</Link>
                      </p>
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

export default LogInEmail;
