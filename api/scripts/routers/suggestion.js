const express = require("express");
const router = express.Router();
const suggestionCtrl = require('../controllers/suggestion');
router.post('/api/suggestion/create', suggestionCtrl.createSuggestion);
router.post('/api/suggestion/get', suggestionCtrl.getSuggestions);
module.exports = router;
