const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const util = require('../util');

const removeProjectRouter = express.Router();
removeProjectRouter.use(bodyParser.json());

const userDataPath = util.getSettingsFolder();
const projectFile = path.join(userDataPath, './data/projects.json');

removeProjectRouter.route('/').post((req, res) => {
  const projectToRemove = {};
  projectToRemove.alias = req.body.alias;
  projectToRemove.directory = req.body.directory;

  jsonfile.readFile(projectFile, (readErr, obj) => {
    for (let i = 0; i < obj.projects.length; i += 1) {
      if (obj.projects[i].alias === projectToRemove.alias && obj.projects[i].directory === projectToRemove.directory) {
        obj.projects.splice(i, 1);
        break;
      }
    }

    jsonfile.writeFile(projectFile, obj, error => {
      if (error == null) {
        res.statusCode = 200;
        res.send(JSON.stringify(obj));
      } else {
        res.statusCode = 202;
        res.send({ err: 'Failed to write to data file. Please try again. ' });
        console.log(error);
      }
    });
  });
});

module.exports = removeProjectRouter;
