const express = require("express");
const router = express.Router();
const connectionCtrl = require('../controllers/connection');
router.post('/api/connection/create', connectionCtrl.createConnection);
router.post('/api/connection/get', connectionCtrl.getConnection);
router.post('/api/connection/check', connectionCtrl.checkConnection);
router.get('/api/connection/expired', connectionCtrl.deleteExpiredConnections);
router.post('/api/connection/logout', connectionCtrl.logoutDeletion);
module.exports = router;
