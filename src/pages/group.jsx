import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import Pagination from "../component/section/pagination";
import SelectAge from "../component/select/selectage";
import SelectState from "../component/select/selectstate";
import SelectGender from "../component/select/selectgender";
import { Link } from "react-router-dom";
import { GROUPPAGECONTENTLIST, GROUPPAGECOUNT } from "./pagesconsts";
import HeaderOne from "../component/layout/headerone";



class GroupPage extends Component {
    modalview() {
        document.querySelector('.modal').classList.toggle('show')
        document.querySelector('body').classList.toggle('overlay')
    }
    render() { 
        return (
            <Fragment>
                <HeaderOne />
                <div className="member story story--style2 padding-top padding-bottom overflow-hidden">
                    <div className="container">
                        <div className="section__wrapper">
                            <div className="member__info mb-4">
                                <div className="member__info--left">
                                    <div className="member__info--filter">
                                        <div className="default-btn" onClick={this.modalview}><span>Filter Your Search <i className="fa-solid fa-sliders"></i></span></div>
                                    </div>
                                    <div className="member__info--count">
                                        <div className="default-btn"><span>All Members</span></div>
                                        <p>20365587</p>
                                    </div>
                                </div>
                                <div className="member__info--right">
                                    <div className="member__info--customselect right w-100">
                                        <div className="default-btn"><span>Order By:</span></div>
                                        <div className="banner__inputlist">
                                            <select>
                                                <option value="0">Last Active </option>
                                                <option value="1">Oldest</option>
                                                <option value="2">Popular</option>
                                                <option value="3">Most Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-center row-cols-lg-4 row-cols-sm-2 row-cols-1">
                                {GROUPPAGECONTENTLIST.map((val, i) => (
                                    <div className="col" key={i}>
                                        <div className="story__item style2 story--theme-color">
                                            <div className="story__inner">
                                                <div className="story__thumb position-relative">
                                                    <Link to="/group-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                    <span className="member__activity member__activity--ofline">{val.activety}</span>
                                                </div>
                                                <div className="story__content px-0 pb-0">
                                                    <Link to="/group-single"><h4>{val.title}</h4></Link>
                                                    <p>{val.desc}</p>
                                                    <div className="story__content--author justify-content-between border-top pt-3">
                                                        <div className="story__content--content">
                                                            <p><i className="fa-solid fa-earth-africa"></i> {val.group}</p>
                                                        </div>
                                                        <ul className="img-stack">
                                                            {val.groupMemList.map((val, i) => (
                                                                <li key={i}>
                                                                    <Link to="/member-single">
                                                                        <img src={val.imgUrl} alt={val.imgAlt} />
                                                                        <div className="time-tooltip">
                                                                            <div className="time-tooltip-holder">
                                                                                <span className="tooltip-info">{val.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                            <li className="bg-theme">
                                                                <Link to="/member-single">
                                                                    {val.moreMember}
                                                                    <div className="time-tooltip">
                                                                        <div className="time-tooltip-holder">
                                                                            <span className="tooltip-info">More</span>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="member__pagination mt-4">
                                <div className="member__pagination--left">
                                    <p>{GROUPPAGECOUNT}</p>
                                </div>
                                <div className="member__pagination--right">
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Filter your search</h5>
                                <button type="button" className="btn-close" onClick={this.modalview}></button>
                            </div>
                            <div className="modal-body">
                                <form action="#">
                                    <div className="banner__list">
                                        <div className="row align-items-center row-cols-1">
                                            <div className="col">
                                                <label>I am a</label>
                                                <div className="banner__inputlist">
                                                    <SelectGender select={'male'} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label>Looking for</label>
                                                <div className="banner__inputlist">
                                                    <SelectGender select={'female'} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label>Age</label>
                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <div className="banner__inputlist">
                                                            <SelectAge select={'18'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="banner__inputlist">
                                                            <SelectAge select={'25'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label>Country</label>
                                                <div className="banner__inputlist">
                                                    <SelectState select={'Andhra Pradesh'} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="submit" className="default-btn reverse d-block"><span>Find Your Partner</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
 
export default GroupPage;