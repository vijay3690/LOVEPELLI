import React, { Fragment, useState} from "react";
import { Link } from 'react-router-dom';
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import axios from "axios";
import "../pages/userprofile/userprofile.css";
import {MEMBERNAME,MEMBERACTIVITY,MEMBERDESC,MEMBERINFO, GROUPCONTENTLIST,FRIENDLIST,SITELINKLIST,ACTIVEGROUPLIST,ACTIVEFRIENDLIST} from "./pagesconsts";
import HeaderOne from "../component/layout/headerone";



const MemberDetails = () => {

      const [profile, setProfile] = useState({
    address: "",
    age: "",
    dateOfBirth: "",
    maritalStatus: "",
    // Add other fields as needed
 }); //  to store API data

 const Base_api = import.meta.env.VITE_BASE_URL;
 
  const handleProfileClick = async () => {
    try {
      // Example API call
      const response = await axios.get(`${Base_api}/api/UserProfile/30137`);
      console.log("Profile Data:", response.data);
      setProfile([response.data]); //  Store the fetched profile data
      alert("Profile data fetched successfully!");
      alert(JSON.stringify(response.data));
      console.log("Fetched Profile Data:", response.data);
      console.log("Profile State:", profile);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Failed to fetch profile data!");
    } 
  };


     { 
        return (
            <Fragment>
              <HeaderOne />
                <PageHeader title={'Member Single Page'} curPage={'Member Single'} />
                <div className="group group--single padding-bottom">
                    <div className="group__top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-3 d-none d-xl-block"></div>
                                <div className="col-xl-9">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="gt1-tab" data-bs-toggle="tab" data-bs-target="#gt1" type="button" role="tab" aria-controls="gt1" aria-selected="true"><i className="fa-solid fa-house"></i> Activity</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="gt2-tab" data-bs-toggle="tab" data-bs-target="#gt2" onClick={handleProfileClick} type="button" role="tab" aria-controls="gt2" aria-selected="false"><i className="fa-solid fa-users"></i> Profile <span>30</span></button>
                                        </li>
                                    
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="gt6-tab" data-bs-toggle="tab" data-bs-target="#gt6" type="button" role="tab" aria-controls="gt6" aria-selected="false"><i className="fa-solid fa-photo-film"></i> Media <span>06</span></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group__bottom">
                        <div className="container">
                            <div className="row g-4">
                                <div className="col-xl-6 order-xl-1">
                                    <div className="group__bottom--left">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="gt1" role="tabpanel" aria-labelledby="gt1-tab">
                                                <div className="group__bottom--head group__bottom--activity bg-white mb-4 border-0">
                                                    <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="Personal-tab" data-bs-toggle="tab" data-bs-target="#Personal" type="button" role="tab" aria-controls="Personal" aria-selected="true">Personal</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="Mentions-tab" data-bs-toggle="tab" data-bs-target="#Mentions" type="button" role="tab" aria-controls="Mentions" aria-selected="false">Mentions</button>
                                                        </li>
  
                                                          <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="Favorites-tab" data-bs-toggle="tab" data-bs-target="#Favorites" type="button" role="tab" aria-controls="Favorites" aria-selected="false">Favorites</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="Friends-tab" data-bs-toggle="tab" data-bs-target="#Friends" type="button" role="tab" aria-controls="Friends" aria-selected="false">Friends</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="Groups-tab" data-bs-toggle="tab" data-bs-target="#Groups" type="button" role="tab" aria-controls="Groups" aria-selected="false">Groups</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                                
                                                <div className="group__bottom--area group__bottom--memberactivity">
                                                    <div className="group__bottom--body">
                                                        <div className="group__bottom--allmedia">
                                                            <div className="media-wrapper">
                                                                <div className="tab-content" id="myTabContent2">
                                                                    <div className="tab-pane fade show active" id="Personal"
                                                                        role="tabpanel" aria-labelledby="Personal-tab">
                                                                        <div className="create-post mb-4">
                                                                            <div className="lab-inner">
                                                                                <div className="lab-thumb">
                                                                                    <div className="thumb-inner">
                                                                                        <div className="thumb-img">
                                                                                            <img src="assets/images/member/profile/profile.jpg" alt="datting thumb" />
                                                                                        </div>
                                                                                        <div className="thumb-content">
                                                                                            <h6><a href="#"> William Smith</a></h6>
                                                                                            <div className="custom-select">
                                                                                                <select>
                                                                                                    <option value="1"> Public</option>
                                                                                                    <option value="2"> Private</option>
                                                                                                    <option value="3"> Friends</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="lab-content">
                                                                                    <form action="#" className="post-form">
                                                                                        <input type="text" placeholder="Whats on your mind. William?" />
                                                                                        <div className="content-type">
                                                                                            <ul className="content-list">
                                                                                                <li className="text"><a href="#"><i className="fa-solid fa-pen-to-square"></i>Text </a></li>
                                                                                                <li className="image-video">
                                                                                                    <div className="file-btn"><i className="fa-solid fa-camera"></i>Photo/Videos</div>
                                                                                                    <input type="file" />
                                                                                                </li>
                                                                                                <li className="attach-file">
                                                                                                    <div className="file-btn"><i className="fa-solid fa-link"></i>Attach File</div>
                                                                                                    <input type="file" />
                                                                                                </li>
                                                                                                <li className="post-submit">
                                                                                                    <input type="submit" value="Post" className="default-btn" />
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="post-item mb-4">
                                                                            <div className="post-content">
                                                                                <div className="post-author">
                                                                                    <div className="post-author-inner">
                                                                                        <div className="author-thumb">
                                                                                            <img src="assets/images/member/profile/profile.jpg" alt="datting thumb" />
                                                                                        </div>
                                                                                        <div className="author-details">
                                                                                            <h6><a href="#">William Smith</a></h6>
                                                                                            <ul className="post-status">
                                                                                                <li className="post-privacy"><i className="icofont-world"></i> Public</li>
                                                                                                <li className="post-time">6 Mintues Ago</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="post-description">
                                                                                    <p>Quickly deliver going forward methods info create empowerment before with client centered bandwdth Credibly pontficate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="post-meta">
                                                                                <div className="post-meta-top">
                                                                                    <p><a href="#"><i className="fa-solid fa-thumbs-up"></i> <i className="fa-solid fa-heart"></i> <i className="fa-solid fa-face-laugh"></i> <span>Julia, Petrova and 306 like this</span></a></p>
                                                                                    <p><a href="#">136 Comments</a></p>
                                                                                </div>
                                                                                <div className="post-meta-bottom">
                                                                                    <ul className="react-list">
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-thumbs-up"></i>Like</a> </li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-comment"></i>Comment</a></li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-share-nodes"></i>Share</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="post-item mb-4">
                                                                            <div className="post-content">
                                                                                <div className="post-author">
                                                                                    <div className="post-author-inner">
                                                                                        <div className="author-thumb">
                                                                                            <img src="assets/images/member/profile/profile.jpg" alt="datting thumb" />
                                                                                        </div>
                                                                                        <div className="author-details">
                                                                                            <h6><a href="#">William Smith</a></h6>
                                                                                            <ul className="post-status">
                                                                                                <li className="post-privacy"><i className="icofont-world"></i> Public</li>
                                                                                                <li className="post-time">6 Mintues Ago </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="post-description">
                                                                                    <p>Quickly deliver going forward methods info create empowerment before with client centered bandwdth Credibly pontficate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
                                                                                    <div className="post-desc-img">
                                                                                        <img src="assets/images/group/single/01.jpg" alt="dating thumb" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="post-meta">
                                                                                <div className="post-meta-top">
                                                                                    <p><a href="#"><i className="fa-solid fa-thumbs-up"></i> <i className="fa-solid fa-heart"></i> <i className="fa-solid fa-face-laugh"></i><span>Julia, Petrova and 306 like this</span></a></p>
                                                                                    <p><a href="#">136 Comments</a></p>
                                                                                </div>
                                                                                <div className="post-meta-bottom">
                                                                                    <ul className="react-list">
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-thumbs-up"></i>Like</a> </li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-comment"></i>Comment</a></li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-share-nodes"></i> Share </a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="post-item mb-4">
                                                                            <div className="post-content">
                                                                                <div className="post-author">
                                                                                    <div className="post-author-inner">
                                                                                        <div className="author-thumb">
                                                                                            <img src="assets/images/member/profile/profile.jpg" alt="datting thumb" />
                                                                                        </div>
                                                                                        <div className="author-details">
                                                                                            <h6><a href="#">William Smith</a></h6>
                                                                                            <ul className="post-status">
                                                                                                <li className="post-privacy"><i className="icofont-world"></i> Public</li>
                                                                                                <li className="post-time">6 Mintues Ago </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="post-description">
                                                                                    <p>Quickly deliver going forward methods info create empowerment before with client centered bandwdth Credibly pontficate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
                                                                                    <div className="post-desc-img">
                                                                                        <div className="row g-3">
                                                                                            <div className="col-md-6">
                                                                                                <img src="assets/images/group/single/01.jpg" alt="dating thumb" />
                                                                                            </div>
                                                                                            <div className="col-md-6">
                                                                                                <img src="assets/images/group/single/02.jpg" alt="dating thumb" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="post-meta">
                                                                                <div className="post-meta-top">
                                                                                    <p><a href="#"><i className="fa-solid fa-thumbs-up"></i> <i className="fa-solid fa-heart"></i> <i className="fa-solid fa-face-laugh"></i><span>Julia, Petrova and 306 like this</span></a></p>
                                                                                    <p><a href="#">136 Comments</a></p>
                                                                                </div>
                                                                                <div className="post-meta-bottom">
                                                                                    <ul className="react-list">
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-thumbs-up"></i>Like</a> </li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-comment"></i>Comment</a></li>
                                                                                        <li className="react"><a href="#"><i className="fa-solid fa-share-nodes"></i> Share </a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="text-center mt-4">
                                                                            <a href="#" className="default-btn"><span>Load More Post</span></a>
                                                                        </div>
                                                                    </div>
                
                                                                    <div className="tab-pane fade" id="Mentions" role="tabpanel" aria-labelledby="Mentions-tab">
                                                                        <div className="post-item">
                                                                            <div className="post-content">
                                                                                <div className="post-author pb-3">
                                                                                    <div className="post-author-inner">
                                                                                        <div className="author-thumb">
                                                                                            <img src="assets/images/member/home2/01.jpg" alt="datting thumb" />
                                                                                        </div>
                                                                                        <div className="author-details">
                                                                                            <h6><a href="#">David Baecker</a></h6>
                                                                                            <ul className="post-status">
                                                                                                <li className="post-privacy"><i className="icofont-world"></i> Public</li>
                                                                                                <li className="post-time">46 Mintues Ago</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="post-description ps-5">
                                                                                    <p className="ms-5 ps-2">Hello @<a href="#">Sara Hartmann</a></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="tab-pane fade" id="Favorites" role="tabpanel" aria-labelledby="Favorites-tab">
                                                                        <div className="post-item mb-4">
                                                                            <div className="post-content p-4">
                                                                                <p className="mb-0">Sorry, there was no activity found. Please try a different filter.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="tab-pane fade" id="Friends" role="tabpanel" aria-labelledby="Friends-tab">
                                                                        {ACTIVEFRIENDLIST.map((val, i) => (
                                                                            <div className="activity__item mb-3" key={i}>
                                                                                <div className="activity__inner bg-white">
                                                                                    <div className="activity__thumb">
                                                                                        <Link to="/member-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                                                    </div>
                                                                                    <div className="activity__content">
                                                                                        <h5><Link to="/member-single">{val.title} </Link><span>{val.titleSpan} <Link to="/member-single"> {val.title2}</Link></span></h5>
                                                                                        <p>{val.activity}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    
                                                                    <div className="tab-pane fade" id="Groups" role="tabpanel" aria-labelledby="Groups-tab">
                                                                        {ACTIVEGROUPLIST.map((val, i) => (
                                                                            <div className="activity__item mb-3" key={i}>
                                                                                <div className="activity__inner bg-white">
                                                                                    <div className="activity__thumb">
                                                                                        <Link to="/member-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                                                    </div>
                                                                                    <div className="activity__content">
                                                                                        <h5><Link to="/member-single">{val.title} </Link><span>{val.titleSpan}</span></h5>
                                                                                        <p>{val.activity}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="gt2" role="tabpanel" aria-labelledby="gt2-tab">
                                                <div className="info">
                                                    <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Personal Information</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                <li>
                                                                    <p className="info-name">Name</p>
                                                                    <p className="info-details">{profile.name}</p>
                                                                </li>
                                                               <li>
  <p className="info-name">Age</p>
  <p className="info-details">{profile.age}</p>
</li>
<li>
  <p className="info-name">Height</p>
  <p className="info-details">{profile.height}</p>
</li>
<li>
  <p className="info-name">Weight</p>
  <p className="info-details">{profile.weight}</p>
</li>
<li>
  <p className="info-name">Body Type</p>
  <p className="info-details">{profile.bodyType}</p>
</li>
<li>
  <p className="info-name">Spoken Languages</p>
  <p className="info-details">{profile.spokenLanguages}</p>
</li>
<li>
  <p className="info-name">Profile Created By</p>
  <p className="info-details">{profile.profileCreatedBy}</p>
</li>
<li>
  <p className="info-name">Marital Status</p>
  <p className="info-details">{profile.maritalStatus}</p>
</li>
<li>
  <p className="info-name">Lives In</p>
  <p className="info-details">{profile.livesIn}</p>
</li>
<li>
  <p className="info-name">Eating Habits</p>
  <p className="info-details">{profile.eatingHabits}</p>
</li>
<li>
  <p className="info-name">Religion</p>
  <p className="info-details">{profile.religion}</p>
</li>
<li>
  <p className="info-name">Caste</p>
  <p className="info-details">{profile.caste}</p>
</li>
<li>
  <p className="info-name">Subcaste</p>
  <p className="info-details">{profile.subcaste}</p>
</li>
<li>
  <p className="info-name">Date Of Birth</p>
  <p className="info-details">{profile.dateOfBirth}</p>
</li>
<li>
  <p className="info-name">Time Of Birth</p>
  <p className="info-details">{profile.timeOfBirth}</p>
</li>
<li>
  <p className="info-name">Star</p>
  <p className="info-details">{profile.star}</p>
</li>
<li>
  <p className="info-name">Raasi</p>
  <p className="info-details">{profile.raasi}</p>
</li>
<li>
  <p className="info-name">Place Of Birth</p>
  <p className="info-details">{profile.placeOfBirth}</p>
</li>
<li>
  <p className="info-name">Employment</p>
  <p className="info-details">{profile.employment}</p>
</li>
<li>
  <p className="info-name">Income</p>
  <p className="info-details">{profile.income}</p>
</li>
<li>
  <p className="info-name">Education</p>
  <p className="info-details">{profile.education}</p>
</li>
<li>
  <p className="info-name">Occupation</p>
  <p className="info-details">{profile.occupation}</p>
</li>
</ul>
 </div>
</div>
                                                     <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Family Info</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                               <li>
                                                                    <p className="info-name">Father</p>
                                                                    <p className="info-details">{profile.father}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Mother</p>
                                                                    <p className="info-details">{profile.mother}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Brothers</p>
                                                                    <p className="info-details">{profile.brothers}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Sisters</p>
                                                                    <p className="info-details">{profile.sisters}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Family Location</p>
                                                                    <p className="info-details">{profile.familyLocation}</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Myself Summary</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <p>Collaboratively innovate compelling mindshare after prospective partnership Competently sereiz long-term high-impact internal or "organic" sources vias user friendly strategic themesr areas creat Dramatically coordinate premium partnerships rather than standards compliant technologies ernd Dramaticaly matrix ethical collaboration and idea-sharing through opensour methodolog and Intrinsicly grow collaborative platforms vis-a-vis effective scenarios. The energistically strategize cost effective ideas before the worke unde.</p>
                                                        </div>
                                                    </div>
                                                    <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Lifestyle</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                <li>
                                                                    <p className="info-name">Interest</p>
                                                                    <p className="info-details">Dogs,Cats</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Favorite vocations</p>
                                                                    <p className="info-details">Maldives, Bangladesh</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Looking for</p>
                                                                    <p className="info-details">Serious Relationshiop,Affair</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Smoking</p>
                                                                    <p className="info-details">Casual Smoker</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Language</p>
                                                                    <p className="info-details">English, French, Italian</p>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                        <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h3>Life-Partner Preferences</h3>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                 <h6>Basic Preferences</h6>
                                                                <li>
  <p className="info-name">Preferred Bride's Age</p>
  <p className="info-details">{profile.preferredBrideAge}</p>
</li>
<li>
  <p className="info-name">Preferred Height</p>
  <p className="info-details">{profile.preferredHeight}</p>
</li>
<li>
  <p className="info-name">Preferred Marital Status</p>
  <p className="info-details">{profile.preferredMaritalStatus}</p>
</li>
<li>
  <p className="info-name">Preferred Mother Tongue</p>
  <p className="info-details">{profile.preferredMotherTongue}</p>
</li>
<li>
  <p className="info-name">Preferred Physical Status</p>
  <p className="info-details">{profile.preferredPhysicalStatus}</p>
</li>
<li>
  <p className="info-name">Preferred Eating Habits</p>
  <p className="info-details">{profile.preferredEatingHabits}</p>
</li>
<li>
  <p className="info-name">Preferred Smoking Habits</p>
  <p className="info-details">{profile.preferredSmokingHabits}</p>
</li>
<li>
  <p className="info-name">Preferred Drinking Habits</p>
  <p className="info-details">{profile.preferredDrinkingHabits}</p>
</li>

                                                            </ul>

                                                        </div>
                                                    </div>

                                                    <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Religious Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                   <li>
                                                                        <p className="info-name">Preferred Religion</p>
                                                                        <p className="info-details">{profile.preferredReligion}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Caste</p>
                                                                        <p className="info-details">{profile.preferredCaste}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Star</p>
                                                                        <p className="info-details">{profile.preferredStar}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Dosham</p>
                                                                        <p className="info-details">{profile.preferredDosham}</p>
                                                                    </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                    
                                                    <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Professional Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                              <li>
                                                                        <p className="info-name">Preferred Education</p>
                                                                        <p className="info-details">{profile.preferredEducation}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Employment Type</p>
                                                                        <p className="info-details">{profile.preferredEmploymentType}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Occupation</p>
                                                                        <p className="info-details">{profile.preferredOccupation}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Annual Income</p>
                                                                        <p className="info-details">{profile.preferredAnnualIncome}</p>
                                                                </li>
                                                           </ul>

                                                        </div>
                                                    </div>
                                                    
                                                    <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Location Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                              <li>
                                                                    <p className="info-name">Preferred Country</p>
                                                                    <p className="info-details">{profile.preferredCountry}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Preferred Residing State</p>
                                                                    <p className="info-details">{profile.preferredResidingState}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Preferred Residing City</p>
                                                                    <p className="info-details">{profile.preferredResidingCity}</p>
                                                                    </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="gt3" role="tabpanel" aria-labelledby="gt3-tab">
                                                <div className="site">
                                                    <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Site Link</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                {SITELINKLIST.map((val, i) => (
                                                                    <li key={i}>
                                                                        <div className="info-details">
                                                                            <div className="id-left">
                                                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                                            </div>
                                                                            <div className="id-right">
                                                                                <a href={val.btnLink} target="_blank"><h5>{val.title}</h5></a>
                                                                                <p>{val.activity}</p>
                                                                            </div>
                                                                        </div>
                                                                        <a href={val.btnLink} className="default-btn" target="_blank"><span>{val.btnText}</span></a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="info-card-title info-card-pagination">
                                                            <p>Viewing 1 - 2 of 2 sites</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="gt4" role="tabpanel" aria-labelledby="gt4-tab">
                                                <div className="group__bottom--area">
                                                    <div className="group__bottom--head">
                                                        <div className="left">
                                                            <form action="#">
                                                                <input type="text" name="search" placeholder="search" />
                                                                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                                            </form>
                                                        </div>
                                                     
                                                    </div>
                                                    <div className="group__bottom--body">
                                                        <div className="member">
                                                            <div className="row g-3 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                                                                {FRIENDLIST.map((val, i) => (
                                                                    <div className="col" key={i}>
                                                                        <div className="member__item w-100">
                                                                            <div className="member__inner m-0">
                                                                                <div className="member__thumb">
                                                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                                                    <span className="member__activity">{val.activity}</span>
                                                                                </div>
                                                                                <div className="member__content">
                                                                                    <Link to="/member-single"><h6>{val.name}</h6></Link>
                                                                                    <p>{val.age} <i className="fa-solid fa-mars"></i></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="text-center mt-5">
                                                            <a href="#" className="default-btn"><span><i className="fa-solid fa-spinner"></i> Load More</span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="gt5" role="tabpanel" aria-labelledby="gt5-tab">
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
                                                            <div className="row g-3 justify-content-center mx-12-none row-cols-lg-2 row-cols-sm-2 row-cols-1">
                                                                {GROUPCONTENTLIST.map((val, i) => (
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
                                                                                                    <a href="#">
                                                                                                        <img src={val.imgUrl} alt={val.imgAlt} />
                                                                                                        <div className="time-tooltip">
                                                                                                            <div className="time-tooltip-holder">
                                                                                                                <span className="tooltip-info">{val.name}</span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                            <li className="bg-theme">
                                                                                                <a href="#">
                                                                                                    {val.moreMember}
                                                                                                    <div className="time-tooltip">
                                                                                                        <div className="time-tooltip-holder">
                                                                                                            <span className="tooltip-info">More</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            
                                                            <div className="text-center mt-5">
                                                                <a href="#" className="default-btn"><i className="fa-solid fa-spinner"></i> Load More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="gt6" role="tabpanel" aria-labelledby="gt6-tab">
                                                <div className="group__bottom--body bg-white">
                                                    <div className="group__bottom--allmedia">
                                                        <div className="media-wrapper">
                                                            <ul className="nav nav-tabs" id="myTab3" role="tablist">
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link active" id="all-media-tab" data-bs-toggle="tab" data-bs-target="#all-media" type="button" role="tab" aria-controls="all-media" aria-selected="true"><i className="fa-solid fa-table-cells-large"></i> All <span>12</span></button>
                                                                </li>
                
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link" id="photos-media-tab" data-bs-toggle="tab" data-bs-target="#photos-media" type="button" role="tab" aria-controls="photos-media" aria-selected="false"><i className="fa-solid fa-image"></i> Photos <span>4</span></button>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="false"><i className="fa-solid fa-video"></i> Videos <span>4</span></button>
                                                                </li>
                                                           
                                                            </ul>
                                                            <div className="tab-content" id="myTabContent3">
                                                                <div className="tab-pane fade show active" id="all-media"
                                                                    role="tabpanel" aria-labelledby="all-media-tab">
                                                                    <div className="media-content">
                                                                        <ul className="media-upload">
                                                                            <li className="upload-now">
                                                                                <div className="custom-upload">
                                                                                    <div className="file-btn"><i className="fa-solid fa-upload"></i> Upload</div>
                                                                                    <input type="file" />
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-3 g-3">
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/01.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/01.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/02.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/02.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/03.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/03.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/04.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/04.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/05.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/05.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/06.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/06.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/07.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/07.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/08.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/08.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/09.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/09.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/10.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/10.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/11.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/11.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/12.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/12.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-center mt-5">
                                                                            <a href="#" className="default-btn"><i className="fa-solid fa-spinner"></i> Load More</a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="tab-pane fade" id="album" role="tabpanel" aria-labelledby="album-tab">
                                                                    <div className="media-content">
                                                                        <ul className="media-upload">
                                                                            <li className="upload-now">
                                                                                <div className="custom-upload">
                                                                                    <div className="file-btn"><i className="fa-solid fa-upload"></i> Upload</div>
                                                                                    <input type="file" />
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-3 g-3">
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/02.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/02.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/06.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/06.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/10.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/10.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb albam-thumb">
                                                                                    <img src="assets/images/allmedia/12.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/12.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-camera"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="text-center mt-5">
                                                                            <a href="#" className="default-btn"><i className="fa-solid fa-spinner"></i> Load More</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="tab-pane fade" id="photos-media" role="tabpanel" aria-labelledby="photos-media-tab">
                                                                    <div className="media-content">
                                                                        <ul className="media-upload">
                                                                            <li className="upload-now">
                                                                                <div className="custom-upload">
                                                                                    <div className="file-btn"><i className="fa-solid fa-upload"></i> Upload</div>
                                                                                    <input type="file" />
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-3 g-3">
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/03.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/03.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/04.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/04.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/08.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/08.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb">
                                                                                    <img src="assets/images/allmedia/09.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/09.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-image"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="text-center mt-5">
                                                                            <a href="#" className="default-btn"><i className="fa-solid fa-spinner"></i> Load More</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="tab-pane fade" id="video" role="tabpanel" aria-labelledby="video-tab">
                                                                    <div className="media-content">
                                                                        <ul className="media-upload">
                                                                            <li className="upload-now">
                                                                                <div className="custom-upload">
                                                                                    <div className="file-btn"><i className="fa-solid fa-upload"></i> Upload</div>
                                                                                    <input type="file" />
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-3 g-3">
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/01.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/01.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/05.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/05.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/07.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/07.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="media-thumb video-thumb">
                                                                                    <img src="assets/images/allmedia/11.jpg" alt="dating thumb" />
                                                                                    <a href="assets/images/allmedia/11.jpg" target="_blank" className="icon">
                                                                                        <i className="fa-solid fa-circle-play"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="text-center mt-5">
                                                                            <a href="#" className="default-btn"><i className="fa-solid fa-spinner"></i> Load More</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="tab-pane fade" id="music" role="tabpanel" aria-labelledby="music-tab">
                                                                    <div className="media-content">
                                                                        <ul className="media-upload">
                                                                            <li className="upload-now">
                                                                                <div className="custom-upload">
                                                                                    <div className="file-btn"><i className="fa-solid fa-upload"></i> Upload</div>
                                                                                    <input type="file" />
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <p><i className="icofont-worried"></i> Sorry !!
                                                                                    There's no media found for the
                                                                                    request !! </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 order-xl-0">
                                    <div className="group__bottom--center">
                                        <div className="story__item style2">
                                            <div className="story__inner">
                                                <div className="story__thumb position-relative">
                                                    <img src="assets/images/member/profile/profile.jpg" alt="dating thumb" />
                                                </div>
                                                <div className="story__content px-0 pb-0">
                                                    <h4>{MEMBERNAME}</h4>
                                                    <div className="story__content--content mb-2 pb-3">
                                                        <p><i className="fa-solid fa-clock"></i> {MEMBERACTIVITY}</p>
                                                    </div>
                                                    <p className="mb-2">{MEMBERDESC}</p>
                                                    <div className="story__content--author mt-3 pb-2">
                                                        <h6 className="d-block w-100 mb-3">Photos</h6>
                                                        <div className="row g-2">
                                                            {MEMBERINFO.map((val, i) => (
                                                                <div className="col-4" key={i}>
                                                                    <a href={`${val.imgLink}`} target="_blank"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 order-xl-2">
                                    <div className="group__bottom--right">
                                    </div>
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

export default MemberDetails;
