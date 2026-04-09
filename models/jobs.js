const mongoose = require('mongoose')

const jobschema = new mongoose.Schema({
    company:{type: String, required: true},
    title: {type: String, required: true},
    status: {type: String, default:'Applied'},
    date:{type: Date, required: false}

})

module.exports = mongoose.model('Job', jobschema)