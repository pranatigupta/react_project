import React from "react";
import { Link } from 'react-router-dom';
import UserProfileData from "../interface/UserProfileData";

const UserProfile:React.FC<UserProfileData> = ({name,id,image,status,gender}) => {
    return (
      <Link key={id} to={`/user/${id}`}>
        <div className="Container">
          <div className="User">
            <div className="row">
              <div className="column">
                <img src={image}></img>
              </div>
              <div className="column">
                  <h2>{name}</h2>
                  <p>{status} - {gender}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  export default UserProfile;