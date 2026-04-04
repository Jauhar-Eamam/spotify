const ImageKit = require('@imagekit/nodejs')



const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT,
})


async function uploadFile(file){
    const result = await imagekit.files.upload({
        file,
        filename: "music_" + Date.now(),
        folder: "eamam/music",
    })

    return result;
}

module.exports = { uploadFile }

