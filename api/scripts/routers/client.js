const express = require("express");
const router = express.Router();
const clientCtrl = require('../controllers/client');
router.post('/api/client/create', clientCtrl.createClient);
router.post('/api/client/get', clientCtrl.getClientByNameAndPassword);
router.post('/api/client/connect', clientCtrl.getClientWithUserid);
module.exports = router;
