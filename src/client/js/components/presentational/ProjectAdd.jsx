/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { dialog } = require('electron').remote;

class ProjectAdd extends Component {
  constructor() {
    super();

    this.state = {
      alias: '',
      directory: '',
      isDefault: false,
    };

    this.handleAliasChange = this.handleAliasChange.bind(this);
    this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleDefaultChange = this.handleDefaultChange.bind(this);
    this.handleBrowseFolder = this.handleBrowseFolder.bind(this);
  }

  handleAliasChange(event) {
    this.setState({ alias: event.target.value });
  }

  handleDirectoryChange(event) {
    this.setState({ directory: event.target.value });
  }

  handleDefaultChange() {
    const { isDefault } = this.state;
    this.setState({ isDefault: !isDefault });
  }

  handleAddProject() {
    const { alias, directory, isDefault } = this.state;
    const { showAlertMessage, addProject } = this.props;
    if (alias === '') {
      showAlertMessage('danger', 'Please populate the alias of the project');
      return;
    }
    if (directory === '') {
      showAlertMessage(
        'danger',
        'Please populate the directory of the project (Where you store your project in your local machine)'
      );
      return;
    }

    const project = {
      alias,
      directory,
      isDefault,
    };

    addProject(project);

    this.setState({
      alias: '',
      directory: '',
      isDefault: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleBrowseFolder() {
    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory'],
      },
      folderPaths => {
        // folderPaths is an array that contains all the selected paths
        if (folderPaths === undefined) {
          console.log('No destination folder selected');
        } else {
          this.setState({
            directory: folderPaths[0],
          });
        }
      }
    );
  }

  render() {
    const { isDefault, directory, alias } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <strong>Add a Project</strong>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Add an existing project into Easy DX</h6>
          <div className="row from-group">
            <div className="checkbox form-check">
              <input
                type="checkbox"
                defaultChecked={isDefault}
                onChange={this.handleDefaultChange}
                className="form-check-input form-check-input"
              />
              <label className="form-check-label form-check-label">Is it default project?</label>
            </div>
          </div>
          <div className="row from-group input-bar">
            <label>Please specify the project&apos;s directory</label>
            <div className="input-group">
              <input type="text" className="form-control" value={directory} onChange={this.handleDirectoryChange} />
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary btn-md" onClick={this.handleBrowseFolder}>
                  Browse
                </button>
              </span>
            </div>
          </div>
          <div className="card-footer todo-list-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-md"
                placeholder="Alias"
                value={alias}
                onChange={this.handleAliasChange}
              />
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary btn-md" onClick={this.handleAddProject}>
                  Add Project
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectAdd.propTypes = {
  showAlertMessage: PropTypes.func,
  addProject: PropTypes.func,
};

export default ProjectAdd;
