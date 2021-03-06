import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../store/actions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id, this.props.history);
  }

  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td> {exp.company} </td>
        <td> {exp.title} </td>
        <td>
          {" "}
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Present"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          {" "}
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            Delete
          </button>{" "}
        </td>
      </tr>
    ));

    return (
      <div className="experience">
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr className="text-dark">
              <th> Company </th>
              <th> Title </th>
              <th> Years </th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
