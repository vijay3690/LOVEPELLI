import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import Pagination from "../component/section/pagination";
import SelectAge from "../component/select/selectage";
import SelectState from "../component/select/selectstate";
import SelectGender from "../component/select/selectgender";
import { MEMBERCONTENTLIST } from "./pagesconsts";
import HeaderOne from "../component/layout/headerone";
import { fetchAllMembers } from "../data-services/members-data-service";
import ChatMembersList from "../component/chat/ChatMembersList";
import ChatWindowContainer from "../component/chat/ChatWindowContainer";
import { SignalRProvider } from "../component/chat/SignalRService";


import "./members.css";

const MembersPage = () => {
  const [allUserProfiles, setAllUserProfiles] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await fetchAllMembers();
      console.log("API RESPONSE", data);
      try {
        // Extract only what Members page needs
      const members = data.map(user => ({
        userId: user.userId,
        fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`
      }));
        setAllUserProfiles(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }

    };

    fetchMembers();
  }, []);

  const modalview = () => {
    document.querySelector(".modal").classList.toggle("show");
    document.querySelector("body").classList.toggle("overlay");
  };

  return (
    <Fragment>
      <HeaderOne />
      <SignalRProvider>
        <ChatWindowContainer />
        <div className="members-page-container">
          <div className="members-header-row">
            <div className="members-header-left">
              <PageHeader
                title={"LovePelli All Members"}
                curPage={"All Members"}
              />
            </div>
            <div className="members-header-right">
              <ChatMembersList members={allUserProfiles} onSelectMember={() => {}} />
            </div>
          </div>

          <div className="members-content-row">
            <div className="member member--style2 padding-top padding-bottom">
              <div className="container">
                <div className="section__wrapper">
                  <div className="member__info mb-4">
                    <div className="member__info--left">
                      <div className="member__info--filter">
                        <div className="default-btn" onClick={modalview}>
                          <span>
                            Filter Your Search{" "}
                            <i className="fa-solid fa-sliders"></i>
                          </span>
                        </div>
                      </div>
                      <div className="member__info--count">
                        <div className="default-btn">
                          <span>All Members</span>
                        </div>
                        <p>20365587</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-0 justify-content-center mx-12-none">
                    {allUserProfiles.map((member) => (
                      <div className="member__item" key={member.userId}>
                        <div className="member__inner">
                          
                          <div className="member__thumb">
                            {/* SAME IMAGE FOR ALL */}
                            <img
                             src ='/assets/images/member/home2/02.jpg' alt="Member"
                            />
                            <span className="member__activity"></span>
                          </div>

                          <div className="member__content">
                            <Link to={`/member-single/${member.userId}`}>
                              <h5>{member.fullName}</h5>
                            </Link>
                            <p>Active</p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="member__pagination mt-4">
                    <div className="member__pagination--left">
                      <p>Viewing 1 - 20 of 12,345 Members</p>
                    </div>
                    <div className="member__pagination--right">
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="exampleModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Filter your search
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={modalview}
                ></button>
              </div>
              <div className="modal-body">
                <form action="#">
                  <div className="banner__list">
                    <div className="row align-items-center row-cols-1">
                      <div className="col">
                        <label>I am a</label>
                        <div className="banner__inputlist">
                          <SelectGender select={"male"} />
                        </div>
                      </div>
                      <div className="col">
                        <label>Looking for</label>
                        <div className="banner__inputlist">
                          <SelectGender select={"female"} />
                        </div>
                      </div>
                      <div className="col">
                        <label>Age</label>
                        <div className="row g-3">
                          <div className="col-6">
                            <div className="banner__inputlist">
                              <SelectAge select={"18"} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="banner__inputlist">
                              <SelectAge select={"25"} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <label>Country</label>
                        <div className="banner__inputlist">
                          <SelectState select={"Andhra Pradesh"} />
                        </div>
                      </div>
                      <div className="col">
                        <Link to="/members">
                          <button
                            type="button"
                            className="default-btn reverse d-block"
                          >
                            <span>Find Your Partner</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </SignalRProvider>
    </Fragment>
  );
};

export default MembersPage;
