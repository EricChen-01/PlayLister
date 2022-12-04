const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        isPublished: { type: Boolean, required: true},
        likes: { type: Number, required: true }, 
        dislikes: { type: Number, required: true},
        listens: {type: Number, required: true},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },

        comments: { type: [{
            userId: { type: String, required: true},
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            message: { type: String, required: true}
        }],required: true},
        datePublished: {type: Date},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
