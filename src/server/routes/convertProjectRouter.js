const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const convertProjectRouter = express.Router();
convertProjectRouter.use(bodyParser.json());

convertProjectRouter.route('/').post((req, res) => {
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
      res.send({ err: 'The project directory doesnot exist or doesnot contain a valid sfdx project!' });
      console.log(err);
      return;
    }

    cmd.get(`cd ${directory} && sfdx force:source:convert -d outputTmp/ --json`, (cmdErr, data, stderr) => {
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

module.exports = convertProjectRouter;
