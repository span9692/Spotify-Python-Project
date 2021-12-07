import React from "react";
import { useSelector } from 'react-redux';
import Playlist from "../Playlists/Playlist"
import Player from '../Player/index'
import "./Dashboard.css";

const Dashboard = () => {

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-top-navbar"></div>
        <div className="dashboard-main">
          <div className="dashboard-main-leftnav">
            <div className="d-m-leftnav-top">
              
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-search"></i><span>Search</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-icons"></i><span>Your library</span>
                  </div>
                </li>
              </ul>
              <div className="liner"></div>
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fas fa-microphone-alt"></i><span>Add a song</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fab fa-napster"></i><span>Create a playlist</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="liner"></div>
            <Playlist />
          </div>
          <div className="dashboard-main-rightcontent">
            Welcome {user.first_name}!
          </div>
        </div>
        <div className="dashboard-bot-player"><Player /></div>
      </div>
    </>
  );
};

export default Dashboard;
