const path = require('path');
const express = require('express');
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Amarnath"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About",
        name: "Amarnath"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help",
        content: "This is help page",
        name: "Amarnath"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        res.send({
            error: "Address must be provided"
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error) {
                        return res.send({
                            error
                        })
                    } else {
                        res.send({
                            location,
                            forecastData,
                            address: req.query.address
                        })
                    }
                }) 
            }
        })
    }
})

app.get("/help/*", (req, res) => {
    res.render('error', {
        code: 404,
        message: "Help article not found!"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        code: 404,
        message: "Page not found!"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})