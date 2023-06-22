const Connection = require('../models/connection');
const uuid = require("uuid").v4;

exports.createConnection = (req, res) => {
    const newConnection = new Connection({userid: req.body.userid, connid: uuid(), expire: new Date().getTime() + 1000 * 60 * 60 * 24 * 7});
    newConnection.save()
    .then(() => res.status(200).json({userid: newConnection.userid, connid: newConnection.connid}))
    .catch(() => res.status(400).json({error: "error"}));
}

exports.getConnection = (req, res) => {
    Connection.findOne({userid: req.body.userid, connid: req.body.connid})
    .then(connection => res.status(200).json({userid: connection.userid}))
    .catch(() => res.status(400).json({error: "error"}));
}

exports.checkConnection = (req, res) => {
    Connection.findOne({userid: req.body.userid, connid: req.body.connid})
    .then(connection => connection == null ? res.status(200).json({res: false}) : res.status(200).json({res: true}))
    .catch(() => res.status(400).json({error: "error"}));
}

exports.deleteExpiredConnections = (req, res) => {
    Connection.deleteMany({expire: {$lt: new Date().getTime()}}).then(() => res.status(200).json('ok'));
}

exports.logoutDeletion = (req, res) => {
    Connection.deleteOne({connid: req.body.connid})
    .then(() => res.status(200).json({res: "deleted"}))
    .catch(() => res.status(400).json({error: "error"}));
}