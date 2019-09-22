const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const createUserRouter = express.Router();

createUserRouter.use(bodyParser.json());

createUserRouter.route('/').post((req, res) => {
  const { org } = req.body;
  cmd.get(`sfdx force:user:create -u ${org} --json`, (err, data, stderr) => {
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

module.exports = createUserRouter;
