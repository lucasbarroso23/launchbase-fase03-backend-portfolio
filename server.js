const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/55262061?s=460&u=afd5e36a1928c45b184a72081834fe19a88b7046&v=4",
        name: "Lucas Barroso",
        role: "Aluno - Rocketseat",
        description: 'Programador full-stack jr buscando oportunidade no mercado.<br><a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            {name: "Github", url: "https://github.com/lucasbarroso23"},
            {name: "Linkdin", url: "https://www.linkedin.com/in/lucas-barroso23/"}
        ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video) {
        return video.id == id
    })

    if(!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log('server is running')
})