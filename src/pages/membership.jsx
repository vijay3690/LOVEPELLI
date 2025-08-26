import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import Header from "../component/layout/header";
import {TITLE,SUBTITLE,MEMBERSHIPLIST} from "./pagesconsts"; // Adjusted import to match the new const name



class MembershipPage extends Component {
    render() { 
        return (
            <Fragment>
              <Header />
                <PageHeader title={'Membership Levels'} curPage={'Membership'} />
                <div className="membership padding-top padding-bottom">
                    <div className="container">
                        <div className="section__header style-2 text-center">
                            <h2>{TITLE}</h2>
                            <p>{SUBTITLE}</p>
                        </div>
                        <div className="section__wrapper">
                            <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                                {MEMBERSHIPLIST.map((val, i) => (
                                    <div className="col" key={i}>
                                        <div className="membership__item">
                                            <div className="membership__inner">
                                                <div className="membership__head">
                                                    <h4>{val.daycount}</h4>
                                                    <p>{val.perMonth}</p>
                                                </div>
                                                <div className="membership__body">
                                                    <h4>{val.price}</h4>
                                                    <ul>
                                                        {val.faciList.map((val, i) => (
                                                            <li key={i}><i className={val.iconName}></i> <span>{val.text}</span></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="membership__footer">
                                                    <Link to="/login" className="default-btn reverse"><span>{val.btnText}</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
 
export default MembershipPage;