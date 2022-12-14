const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');

createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    const playlist = new Playlist(body);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));

        // does this new playlist email match this user's email?
        console.log("user : " + user.email)
        console.log("req : " + body.ownerEmail)
        if(user.email != body.ownerEmail) {
            return res.status(400).json({
                errorMessage: 'Playlist Not Created! can not modify other user playlist'
            })
        }

        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({success:true});
                    }).catch(err => console.log(err))
                    console.log("user playlist ids: "+user.playlists);
                    user.playlists = user.playlists.filter((value,_) => value != req.params.id);
                    user.save();
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        success: false,
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));
    
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));


        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        if(list.isPublished){
            return res.status(200).json({ success: true, playlist: list })
        }else{
            asyncFindUser(list);
        }
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    console.log("getPlaylistPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        if(!user) {
            return res.status(400).json({ success: false, error: 'user does not exist'})
        }
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name,
                            public: list.isPublished,
                            likes: list.likes,
                            dislikes: list.dislikes,
                            ownerName: user.firstName + " " + user.lastName,
                            datePublished: list.datePublished,
                            email: list.ownerEmail,
                            listens: list.listens,
                            createdAt: list.createdAt,
                            updatedAt: list.updatedAt
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPublicPlaylistPairs = async (req,res) => {
    console.log("getPublicPlaylistPairs");
    await Playlist.find({isPublished: true}, (err,playlists)=>{
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }else {
            async function asyncReturnPairs() {
                console.log("Send the Public Playlist pairs");
                let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let user = await User.findOne({email: list.ownerEmail});
                    let pair = {
                        _id: list._id,
                        name: list.name,
                        public: list.isPublished,
                        likes: list.likes,
                        dislikes: list.dislikes,
                        ownerName: user.firstName + " " + user.lastName,
                        datePublished: list.datePublished,
                        email: list.ownerEmail,
                        listens: list.listens,
                        createdAt: list.createdAt,
                        updatedAt: list.updatedAt
                    };
                    pairs.push(pair);
                }
                return res.status(200).json({ success: true, idNamePairs: pairs })   
            }
            asyncReturnPairs();
        }
    })
}
getPlaylists = async (req, res) => {
    user = await getUser(req.userId);
    email = user.email;
    await Playlist.find({ownerEmail: email}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}

updatePlaylist = async (req, res) => {
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    if (req.userId == "GUEST"){
        Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
            console.log("playlist found: " + JSON.stringify(playlist));
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Playlist not found!',
                })
            }   
            if(!playlist.isPublished){
                console.log('playlist is not published. cannot update as regular user')
                return res.status(401).json({
                    success: false,
                    message: 'unauthorized',
                })
            }
            console.log("GUEST user! Updating only listens");
            playlist.listens = body.playlist.listens;
            playlist
                .save()
                .then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: playlist._id,
                        message: 'This is not your playlist. So only listens were updated',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: 'Playlist not updated!',
                    })
                })
        })
    }else{
        Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
            console.log("playlist found: " + JSON.stringify(playlist));
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Playlist not found!',
                })
            }
    
    
            
            // DOES THIS LIST BELONG TO THIS USER?
            async function asyncFindUser(list) {
                await User.findOne({ email: list.ownerEmail }, (err, user) => {
                    if (user._id == req.userId) {
                        console.log("correct user!");
    
                        list.name = body.playlist.name;
                        list.likes = body.playlist.likes;
                        list.dislikes = body.playlist.dislikes;
                        list.isPublished = body.playlist.isPublished;
                        list.songs = body.playlist.songs;
                        list.comments = body.playlist.comments;
                        list.datePublished = body.playlist.datePublished;
                        list.listens = body.playlist.listens;
                        list
                            .save()
                            .then(() => {
                                console.log("SUCCESS!!!");
                                return res.status(200).json({
                                    success: true,
                                    id: list._id,
                                    message: 'Playlist updated!',
                                })
                            })
                            .catch(error => {
                                console.log("FAILURE: " + JSON.stringify(error));
                                return res.status(404).json({
                                    error,
                                    message: 'Playlist not updated!',
                                })
                            })
                    }else {
    
                        if(!list.isPublished){
                            console.log('playlist is not published. cannot update as regular user')
                            return res.status(401).json({
                                success: false,
                                message: 'unauthorized',
                            })
                        }
                        console.log("regular user! Updating only comments, likes, and dislikes");
                        list.likes = body.playlist.likes;
                        list.dislikes = body.playlist.dislikes;
                        list.comments = body.playlist.comments;
                        list.listens = body.playlist.listens;
                        list
                            .save()
                            .then(() => {
                                console.log("SUCCESS!!!");
                                return res.status(200).json({
                                    success: true,
                                    id: list._id,
                                    message: 'This is not your playlist. So only comments, likes, and dislikes were updated',
                                })
                            })
                            .catch(error => {
                                console.log("FAILURE: " + JSON.stringify(error));
                                return res.status(404).json({
                                    error,
                                    message: 'Playlist not updated!',
                                })
                            })
                    }
                    
                });
            }
            asyncFindUser(playlist);
        })
    }
}
getUser = async (id) =>{
    user = User.findById(id,(err,user) => {
        if(err){
            console.log('not found user')
            return null
        }
        console.log("found user: "+user);
        return user
    }) 
    return user;
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPublicPlaylistPairs,
    getPlaylists,
    updatePlaylist,
}