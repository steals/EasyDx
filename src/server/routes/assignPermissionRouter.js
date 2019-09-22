const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const assignPermissionRouter = express.Router();

assignPermissionRouter.use(bodyParser.json());

assignPermissionRouter.route('/').post((req, res) => {
  const { permissionSet, userName } = req.body;
  cmd.get(`sfdx force:user:permset:assign -n ${permissionSet} -u ${userName} --json`, (err, data, stderr) => {
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

module.exports = assignPermissionRouter;
