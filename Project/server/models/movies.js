const mongoose = require('mongoose');

const movieSchema=new mongoose.Schema({
    title:{
        type: String,
    },
    type:{
        type: String
    },
    description:{
        type: String
    },
    release_year:{
        type: Number,
    },
    age_certification:{
        type: Object,
    },
    runtime:{
        type: Number,
    },
    genres:{
        type: mongoose.Schema.Types.Mixed
    },
    seasons:{
        type: Number
    },
    imdb_score:{
        type:Number
    }
});

module.exports = mongoose.model('Entertainment',movieSchema);