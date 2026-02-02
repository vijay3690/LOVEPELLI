import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import ActiveGroup from "../component/sidebar/group";
import ActiveMember from "../component/sidebar/member";
import ModalSearch from "../component/sidebar/modalsearch";
import HeaderFour from "../component/layout/headerfour";
import {ACTIVITYBTNTEXT,ACTIVITYPAGECONTENTLIST} from "./pagesconsts"; // Adjusted import to match the new const name


class ActivityPage extends Component {
    render() {
        return (
            <Fragment>
                <HeaderFour />
                <PageHeader title={"Activity Page"} curPage={"Activity"} />
                <div className="activity padding-top padding-bottom">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-9">
                                <div className="group__bottom--area">
                                    <div className="group__bottom--head">
                                        <div className="left">
                                            <form action="#">
                                                <input type="text" name="search" placeholder="search" className="" />
                                                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="group__bottom--body bg-white">
                                        <div className="group__bottom--group">
                                            <div className="row g-4 justify-content-center mx-12-none row-cols-1">
                                                {ACTIVITYPAGECONTENTLIST.map((val, i) => (
                                                    <div className="col" key={i}>
                                                        <div className="activity__item">
                                                            <div className="activity__inner">
                                                                <div className="activity__thumb">
                                                                    <Link to="/member-single"><img src={val.imgUrl} alt={val.imgAlt} /></Link>
                                                                </div>
                                                                <div className="activity__content">
                                                                    <h5>
                                                                        <Link to="/member-single">{val.name} </Link>
                                                                        <span>{val.text}</span>
                                                                    </h5>
                                                                    <p>{val.activety}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-center mt-5">
                                                <a href="#" className="default-btn reverse"><span><i className="fa-solid fa-spinner"></i> {ACTIVITYBTNTEXT}</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="group__bottom--right">
                                    <ModalSearch />
                                    <ActiveMember />
                                    <ActiveGroup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export default ActivityPage;