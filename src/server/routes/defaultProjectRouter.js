const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const util = require('../util');

const defaultProjectRouter = express.Router();
defaultProjectRouter.use(bodyParser.json());

const userDataPath = util.getSettingsFolder();
const projectFile = path.join(userDataPath, './data/projects.json');

defaultProjectRouter.route('/').post((req, res) => {
  const newProj = {};
  newProj.alias = req.body.alias;
  newProj.directory = req.body.directory;

  jsonfile.readFile(projectFile, (error, obj) => {
    for (let i = 0; i < obj.projects.length; i += 1) {
      if (obj.projects[i].alias === newProj.alias && obj.projects[i].directory === newProj.directory) {
        obj.projects[i].isDefault = true;
      } else {
        obj.projects[i].isDefault = false;
      }
    }
    jsonfile.writeFile(projectFile, obj, err => {
      if (err == null) {
        res.send(JSON.stringify(obj));
      } else {
        res.statusCode = 400;
        res.send({ result: 'error' });
        console.log(err);
      }
    });
  });
});

module.exports = defaultProjectRouter;
