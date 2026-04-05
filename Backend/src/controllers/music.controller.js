const { uploadFile } = require("../services/storage.service");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const userId = req.user.id;

  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const result = await uploadFile(file.buffer.toString("base64"));

  console.log(result);

  try {
    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: userId,
    });

    res.status(201).json({
      message: "music created successfully",

      music: {
        id: music.id,
        uri: music.uri,
        tital: music.title,
        artist: userId,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: "music created fail",
    });
  }
}

async function getAllMusic(req, res) {
  const allMusic = await musicModel.find();

  return res.status(200).json({
    messaage: "music featched successfully",
    allMusic,
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const user = req.user;

  const album = await albumModel.create({
    title: title,
    musics: musics,
    artist: user.id,
  });

  res.status(201).json({
    message: "album created successfully",
    album,
  });
}

async function getAllAlbums(req, res) {
  try {
    const allAlbums = await albumModel
      .find()
      .limit(3)
      .populate("musics", "title , uri")
      .populate("artist", "username email");

    return res.status(200).json({
      message: "albums feteched successfully",
      allAlbums,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getAlbumById(req, res){
  const albumId = req.params.id;


  if(!albumId){
    return res.status(409).json({
      message: "invilade or empty id"
    })
  }

try {

  const album = await albumModel.findById(albumId)
  .populate('musics', 'title uri')
  .populate("artist", "username email")

  return res.status(200).json({
    message: "album is feached",
    album
  })


}
  catch(err){
    res.status(409).json({
      message: "can't find album"
    })
  }

}


module.exports = { createMusic, getAllMusic, createAlbum, getAllAlbums, getAlbumById };
