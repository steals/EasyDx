const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const retrieveLimitsRouter = express.Router();

retrieveLimitsRouter.use(bodyParser.json());

retrieveLimitsRouter.route('/').post((req, res) => {
  const { directory } = req.body;
  const sfdxProjFileName = 'sfdx-project.json';
  const isWin = process.platform === 'win32';
  let directoryDelimeter = '/';
  if (isWin) {
    directoryDelimeter = '\\';
  }

  fs.access(directory + directoryDelimeter + sfdxProjFileName, err => {
    if (err) {
      res.statusCode = 202;
      res.send({ err: 'The default project directory doesnot exist or doesnot contain a valid sfdx project!' });
      console.log(err);
      return;
    }

    let orgStr = '';
    if (req.body.otherOrg && req.body.alias !== undefined && req.body.alias !== '') {
      orgStr = ` -u ${req.body.alias}`;
    }
    cmd.get(`cd ${directory} && sfdx force:limits:api:display${orgStr} --json`, (cmdErr, data, stderr) => {
      if (!cmdErr) {
        res.statusCode = 200;
        res.send(data);
      } else {
        res.statusCode = 202;
        const errObj = JSON.parse(stderr);
        res.send({ err: errObj.message });
      }
    });
  });
});

module.exports = retrieveLimitsRouter;
