import React from "react";
import { Link,NavLink} from 'react-router-dom';
import { profilesData } from "./userprofile"; // adjust path as needed
import "./userprofile.css"; // make sure your css file matches classNames
import HeaderOne from "../../component/layout/headerone";
// import Footer from "../component/layout/footer";


const Interests = () => (
    <>
    <HeaderOne />
    <div className="matchmaking-container">
            <aside className="sidebar">
                <div className="sidebar-section">
                    <h3>Interests Received</h3>
                    <ul>
                        <li className="active">All (3)</li>
                        <li>Pending</li>
                        <li>Accepted/Replied</li>
                        <li>Declined (3)</li>
                    </ul>
                </div>
                <div className="sidebar-section">
                    <h3>Interests Sent</h3>
                    <ul>
                        <li>All (16)</li>
                        <li>Pending (13)</li>
                        <li>Accepted/Replied</li>
                        <li>Declined (3)</li>
                    </ul>
                </div>
            </aside>
            <main className="cards-area">
                <h2>All interests received (3)</h2>
                <small>Interests and responses from free members</small>
                {profilesData.map(profile => (
                    <div className="profile-card" key={profile.name}>
                        <img className="profile-photo" src={profile.imgSrc} alt={profile.name} />
                        <div className="profile-main">
                            <div className="profile-header">
                                <span className="profile-name">{profile.name}</span>
                                {profile.isVerified && <span className="verified-badge">ID verified</span>}
                                {profile.isPaid && <span className="paid-badge">Paid Member</span>}
                            </div>
                            <div className="profile-details">
                                <span>{profile.age} yrs</span>
                                <span>• {profile.height}</span>
                                <span>• {profile.religion}</span>
                                <span>• {profile.education}</span>
                                <span>• {profile.occupation}</span>
                                <span>• {profile.city}</span>
                            </div>
                            <div className="profile-status">
                                She declined your interest <span className="declined-date">- {profile.declinedDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
            {/* <Footer /> */}
        </div></>
);

export default Interests;
