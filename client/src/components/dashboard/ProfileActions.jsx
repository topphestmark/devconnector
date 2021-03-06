import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="edit-profile" className="btn btn-light">
        <i className="fas primary fa-user-circle text-info mr-2"></i>
        Edit Profile
      </Link>
      <Link to="add-experience" className="btn btn-light">
        <i className="fab primary fa-black-tie text-info mr-2"></i>
        Add Experience
      </Link>
      <Link to="add-education" className="btn btn-light">
        <i className="fas primary fa-graduation-cap text-info mr-2"></i>
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
