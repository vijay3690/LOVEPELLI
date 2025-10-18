import { Component } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import SelectState from "../select/selectstate";
import SelectAge from "../select/selectage";
import SelectGender from "../select/selectgender";
import {ABOUTTWOTITLE,
ABOUTTWODESC,
ABOUTTWOSUBTITLE,
ABOUTTWORIGHTTITLE,
ABOUTTWOLABLECHANGEONE,
ABOUTTWOLABLECHANGETWO ,
ABOUTTWOLABLECHANGETHREE,
ABOUTTWOLABLECHANGEFOUR,
ABOUTTWOBTNTEXT,ABOUTTWOREGSLIDERLIST} from "../section/sectionconsts"; // Importing constants

class AboutSectionTwo extends Component {
    render() { 
        return (
            <div className="about about--style2 padding-top pt-xl-0">
                <div className="container">
                    <div className="section__wrapper wow fadeInUp" data-wow-duration="1.5s">
                        <div className="row g-0 justify-content-center row-cols-lg-2 row-cols-1">
                            <div className="col">
                                <div className="about__left">
                                    <div className="about__top">
                                        <div className="about__content">
                                            <h3>{ABOUTTWOTITLE}</h3>
                                            <p>{ABOUTTWODESC}</p>
                                        </div>
                                    </div>
                                    <div className="about__bottom">
                                        <div className="about__bottom--head">
                                            <h5>{ABOUTTWOSUBTITLE}</h5>
                                            <div className="about__bottom--navi">
                                                <div className="ragi-prev"><i className="fa-solid fa-chevron-left"></i></div>
                                                <div className="ragi-next active"><i className="fa-solid fa-chevron-right"></i></div>
                                            </div>
                                        </div>
                                        <div className="about__bottom--body">
                                            <div className="ragi__slider overflow-hidden">
                                                <Swiper
                                                    spaceBetween={15}
                                                    centeredSlides={true}
                                                    autoplay={{
                                                        delay: 5000,
                                                        disableOnInteraction: false,
                                                    }}
                                                    navigation={{
                                                        prevEl: '.ragi-prev',
                                                        nextEl: '.ragi-next',
                                                    }}
                                                    loop={true}
                                                    modules={[Autoplay, Navigation]}
                                                    breakpoints={{
                                                        0: {
                                                        width: 0,
                                                        slidesPerView: 2,
                                                        },
                                                        768: {
                                                        width: 768,
                                                        slidesPerView: 4,
                                                        },
                                                        1200: {
                                                        width: 1200,
                                                        slidesPerView: 10,
                                                        },
                                                    }}
                                                >
                                                    {ABOUTTWOREGSLIDERLIST.map((val, i) => (
                                                        <SwiperSlide key={i}>
                                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="about__right">
                                    <div className="about__title">
                                        <h3>{ABOUTTWORIGHTTITLE}</h3>
                                    </div>
                                    <form action="#">
                                        <div className="banner__list">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>{ABOUTTWOLABLECHANGEONE}</label>
                                                    <div className="banner__inputlist">
                                                        <SelectGender select={'male'} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label>{ABOUTTWOLABLECHANGETWO}</label>
                                                    <div className="banner__inputlist">
                                                        <SelectGender select={'female'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="banner__list">
                                            <div className="row">
                                                <div className="col-lg-6 col-12">
                                                    <label>{ABOUTTWOLABLECHANGETHREE}</label>
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
                                                <div className="col-lg-6 col-12">
                                                    <label>{ABOUTTWOLABLECHANGEFOUR}</label>
                                                    <div className="banner__inputlist">
                                                        <SelectState select={'Andhra Pradesh'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                               <Link to="/members">
                                                    <button type="button" className="default-btn reverse d-block">
                                                        <span>{ABOUTTWOBTNTEXT}</span>
                                                   </button>
                                              </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AboutSectionTwo;