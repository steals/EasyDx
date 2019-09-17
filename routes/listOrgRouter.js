const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');
const jsonfile = require('jsonfile');

const listOrgRouter = express.Router();
const orgFile = './data/orgs.json';

listOrgRouter.use(bodyParser.json());

listOrgRouter.route('/')
.post((req, res) => {
    cmd.get(
        'sfdx force:org:list --json',
        function(err, data, stderr) {
            if(!err) {
                let dataObj = JSON.parse(data);
                for(let i = 0; i < dataObj.result.nonScratchOrgs.length; i++) {
                    dataObj.result.nonScratchOrgs[i].accessToken = "";
                }
                for(let i = 0; i < dataObj.result.scratchOrgs.length; i++) {
                    dataObj.result.scratchOrgs[i].accessToken = "";
                }
                res.statusCode = 200;
                res.send(JSON.stringify(dataObj));

                const orgs = dataObj.result;
                const jsonObj = {};
                jsonObj.orgs = orgs;

                jsonfile.writeFile(orgFile, jsonObj, function(error) {

                });
            } else {
                res.statusCode = 202;
                let errObj = JSON.parse(stderr);
                res.send({"err": errObj.message});
            }
        }
    );
});

module.exports = listOrgRouter;