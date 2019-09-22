const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const deleteOrgRouter = express.Router();

deleteOrgRouter.use(bodyParser.json());

deleteOrgRouter.route('/').post((req, res) => {
  const { orgName } = req.body;
  cmd.get(`sfdx force:org:delete -u ${orgName} -p --json`, (err, data, stderr) => {
    if (!err) {
      res.statusCode = 200;
      res.send(data);
    } else {
      res.statusCode = 202;
      const errObj = JSON.parse(stderr);
      res.send({ err: errObj.message });
    }
  });
});

module.exports = deleteOrgRouter;
