import React, { Component } from "react";
import { connect } from "react-redux";
import { ICellRendererParams } from "ag-grid-community";
import { Cours, StatusCoursIdBody } from "../../../../generated/models";
import { STATE_ACTIVATED, STATE_DEACTIVATED } from "../../../../constants/STATE";
import { ReduxProps } from "../../../../redux/configureStore";
import { CoursApi } from "../../../../generated";
import environment from "../../../../environments/environment";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../../../constants/LOCAL_STORAGE";

interface StatusCoursBtnComponentProps extends ICellRendererParams {
  data: Cours;
}

class StatusCoursBtn extends Component<StatusCoursBtnComponentProps> {
  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newStatus = this.props.data.status === STATE_ACTIVATED ? STATE_DEACTIVATED : STATE_ACTIVATED;

    const coursApi = new CoursApi(environment);
    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const status: StatusCoursIdBody = { status: newStatus };

    coursApi
      .updateCours(status, 'Bearer ' + token, this.props.data.id)
      .then((response) => {
        this.props.data.status = newStatus;
        if (this.props.api && this.props.api.applyTransaction) {
          this.props.api.applyTransaction({ update: [this.props.data] });
        }
      })
      .catch((error) => {
        alert('Unable to update this cours status');
      });
  };

  render() {
    const { status } = this.props.data;
    const buttonClasses = `px-4 py-2 rounded ${
      status === STATE_ACTIVATED ? "bg-green-500 text-black" : "bg-blue-500 text-black"
    }`;

    return (
      <button className={buttonClasses} onClick={this.handleClick}>
        {this.props.data.status === STATE_ACTIVATED ? "Active" : "Inactive"}
      </button>
    );
  }
}

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(StatusCoursBtn);
