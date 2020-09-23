const config = require("../config")
const fetch = require("node-fetch");
const axios = require("axios");


module.exports = {
    async index(req, res) {
        const { city } = req.query

        try {
            fetch(config.OpenWeatherMaps + `?q=${city}&appid=${config.KEY}&units=metric`)
                .then(response => response.json())
                .then(async (data) => {
                    if (data.main.temp > 25) {

                        const musics = await getApiDeezer(1282483245)
                        return res.status(200).json({ message: "Ouça POP", data: musics })

                    } else if (data.main.temp >= 10 || data.main.temp <= 25) {

                        const musics = await getApiDeezer(1306931615)
                        return res.status(200).json({ message: "Ouça Rock", data: musics })

                    } else if (data.main.temp < 10) {

                        const musics = await getApiDeezer(6090626284)
                        return res.status(200).json({ message: "Ouça Clássica", data: musics })

                    }
                })
        } catch (err) {
            return res.status(400).json(err.data)
        }
    }
}

const getApiDeezer = async (id) => {

    const response = await axios.get(config.Deezer + `playlist/${id}`)

    const musics = []
    const tracks = response.data.tracks.data

    for (let i = 0; i < tracks.length; i++) {

        let obj = {
            tittle: tracks[i].title,
            artist: tracks[i].artist.name,
            album: tracks[i].album.title,
            image: tracks[i].album.cover_medium,
            link: tracks[i].link
        }

        musics.push(obj)
    }

    return musics;
}