const Client = require('../models/client');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid").v4;

exports.createClient = (req, res) => {
    const newClient = new Client({username: req.body.username, userid: uuid(), password: bcrypt.hashSync(req.body.password, saltRounds)});
    Client.findOne({username: req.body.username})
    .then(client => client == null ? newClient.save().then(resp => res.status(200).json({username: newClient.username})) : res.status(400).json({error:"error"}));
}

exports.getClientByNameAndPassword = (req, res) => {
    Client.findOne({username: req.body.username})
    .then(client => bcrypt.compareSync(req.body.password, client.password) ? res.json({username: client.username, userid: client.userid}) : res.json({error:"error"}))
    .catch(() => res.status(200).json({error: "error"}));
}

exports.getClientWithUserid = (req, res) => {
    Client.findOne({userid: req.body.userid})
    .then(client => res.status(200).json({username: client.username, userid: client.userid}))
    .catch(error => res.status(400).json({error}));
}