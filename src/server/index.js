#! /usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');

const orgRouter = require('./routes/orgRouter');
const listOrgRouter = require('./routes/listOrgRouter');
const defaultOrgRouter = require('./routes/defaultOrgRouter');
const defaultDevhubRouter = require('./routes/defaultDevhubRouter');
const connectOrgRouter = require('./routes/connectOrgRouter');
const createOrgRouter = require('./routes/createOrgRouter');
const deleteOrgRouter = require('./routes/deleteOrgRouter');
const projectRouter = require('./routes/projectRouter');
const addProjectRouter = require('./routes/addProjectRouter');
const removeProjectRouter = require('./routes/removeProjectRouter');
const defaultProjectRouter = require('./routes/defaultProjectRouter');
const convertProjectRouter = require('./routes/convertProjectRouter');
const reverseConvertProjectRouter = require('./routes/reverseConvertProjectRouter');
const sourceRouter = require('./routes/sourceRouter');
const pushSourceRouter = require('./routes/pushSourceRouter');
const pullSourceRouter = require('./routes/pullSourceRouter');
const retrieveSourceRouter = require('./routes/retrieveSourceRouter');
const retrieveLimitsRouter = require('./routes/retrieveLimitsRouter');
const createRouter = require('./routes/createRouter');
const userRouter = require('./routes/userRouter');
const createUserRouter = require('./routes/createUserRouter');
const generatePasswordRouter = require('./routes/generatePasswordRouter');
const writeOrgFileRouter = require('./routes/writeOrgFileRouter');
const changeAliasRouter = require('./routes/changeAliasRouter');
const createPackage2Router = require('./routes/createPackage2Router');
const listPackage2Router = require('./routes/listPackage2Router');
const listPackage2VersionRouter = require('./routes/listPackage2VersionRouter');
const assignPermissionRouter = require('./routes/assignPermissionRouter');

const app = express();
const port = process.env.PORT || 3666;
app.use(bodyParser.json());

app.use('/api/org', orgRouter);
app.use('/api/listOrg', listOrgRouter);
app.use('/api/defaultOrg', defaultOrgRouter);
app.use('/api/defaultDevhub', defaultDevhubRouter);
app.use('/api/connectOrg', connectOrgRouter);
app.use('/api/createOrg', createOrgRouter);
app.use('/api/deleteOrg', deleteOrgRouter);
app.use('/api/project', projectRouter);
app.use('/api/addProject', addProjectRouter);
app.use('/api/defaultProject', defaultProjectRouter);
app.use('/api/convertProject', convertProjectRouter);
app.use('/api/reverseCovertProject', reverseConvertProjectRouter);
app.use('/api/removeProject', removeProjectRouter);
app.use('/api/source', sourceRouter);
app.use('/api/pushSource', pushSourceRouter);
app.use('/api/pullSource', pullSourceRouter);
app.use('/api/retrieveSource', retrieveSourceRouter);
app.use('/api/retrieveLimits', retrieveLimitsRouter);
app.use('/api/create', createRouter);
app.use('/api/user', userRouter);
app.use('/api/createUser', createUserRouter);
app.use('/api/generatePassword', generatePasswordRouter);
app.use('/api/writeOrgFile', writeOrgFileRouter);
app.use('/api/changeAlias', changeAliasRouter);
app.use('/api/createPackage2', createPackage2Router);
app.use('/api/listPackage2', listPackage2Router);
app.use('/api/listPackage2Version', listPackage2VersionRouter);
app.use('/api/assignPermission', assignPermissionRouter);

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening to port ${port}`));
