const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');

const writeOrgFileRouter = express.Router();
writeOrgFileRouter.use(bodyParser.json());

const orgFile = './data/orgs.json';

writeOrgFileRouter.route('/').post((req, res) => {
  console.log(req.body.orgObj);
  const { orgObj } = req.body;

  jsonfile.writeFile(orgFile, orgObj, error => {
    res.statusCode = 200;
    res.send({ message: 'success' });
  });
});

module.exports = writeOrgFileRouter;
