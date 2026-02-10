import React, { Fragment } from "react";
import BannerThree from "../../component/section/bannerthree";
import MeetSectionTwo from "../../component/section/meettwo";
import MemberSectionTwo from "../../component/section/membertwo";
import StorySection from "../../component/section/story";
import Footer from "../../component/layout/footer";
import Header from "../../component/layout/header";

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <BannerThree />
      <MeetSectionTwo />
      <MemberSectionTwo />
      <StorySection />
      <Footer />
    </Fragment>
  );
};

export default HomePage;








































