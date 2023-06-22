const Suggestion = require('../models/suggestion');

exports.createSuggestion = (req, res) => {
    const newSuggestion = new Suggestion(req.body);
    Suggestion.findOne({username: req.body.username, title: req.body.title})
    .then(suggestion => suggestion == null ? newSuggestion.save().then(resp => res.status(200).json(resp)) : res.status(400).json({error:"error"}));
}

exports.getSuggestions = (req, res) => {
    Suggestion.find({userid: req.body.userid})
    .then(suggestions => res.status(200).json(suggestions))
    .catch(error => res.status(400).json({error}));
}