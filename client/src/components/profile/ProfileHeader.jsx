import isEmpty from "../../validation/is-empty";

const ProfileHeader = ({ profile }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body  text-white mb-3">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="display-4 text-center text-dark">
            {" "}
            {profile.user.name}{" "}
          </h1>
          <p className="lead text-center text-dark">
            {profile.status}
            {isEmpty(profile.company) ? null : (
              <span> at {profile.company} </span>
            )}
          </p>

          {isEmpty(profile.location) ? null : <p>{profile.location} </p>}

          <p>
            {isEmpty(profile.website) ? null : (
              <a
                className="p-2"
                href={profile.website}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fa-globe fa-2x website"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a
                className="p-2"
                href={profile.social.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter fa-2x twitter"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a
                className="p-2"
                href={profile.social.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook fa-2x facebook"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <a
                className="p-2"
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin fa-2x linkedin"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a
                className="p-2"
                href={profile.social.youtube}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-youtube fa-2x youtube"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a
                className="text-white p-2"
                href={profile.social.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram fa-2x instagram"></i>
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
