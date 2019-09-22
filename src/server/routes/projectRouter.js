const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');

const projectRouter = express.Router();
projectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';
const { ncp } = require('ncp');

projectRouter
  .route('/')
  .get((req, res) => {
    const dir = './data';
    if (!fs.existsSync(dir)) {
      ncp('./dataSample', './data', () => {
        jsonfile.readFile(projectFile, (err, obj) => {
          res.send(JSON.stringify(obj));
        });
      });
    } else {
      jsonfile.readFile(projectFile, (err, obj) => {
        res.send(JSON.stringify(obj));
      });
    }
  })
  .post((req, res) => {
    const newProj = {};
    newProj.alias = req.body.alias;
    newProj.directory = req.body.directory;
    newProj.isDefault = req.body.isDefault;
    console.log(`newPro isDefault is: ${newProj.isDefault}`);
    const sfdxProjFileName = 'sfdx-project.json';
    const isWin = process.platform === 'win32';
    let directoryDelimeter = '/';
    if (isWin) {
      directoryDelimeter = '\\';
    }

    fs.access(newProj.directory + directoryDelimeter + sfdxProjFileName, err => {
      if (err) {
        res.statusCode = 202;
        res.send({ err: 'The filepath doesnot exist or doesnot contain a valid sfdx project!' });
        console.log(err);
        return;
      }

      jsonfile.readFile(projectFile, (readErr, obj) => {
        if (newProj.isDefault) {
          for (let i = 0; i < obj.projects.length; i += 1) {
            obj.projects[i].isDefault = false;
          }
        }
        obj.projects.push(newProj);

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
  });

module.exports = projectRouter;
