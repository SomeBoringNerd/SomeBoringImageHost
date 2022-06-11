// imports

const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'img/' })
const fs = require('fs');
const express = require('express')
const port = config.port

// variables
const app = express();

const config = require('./config.json')
const sub = '/i'

// app.use
app.use(sub + '/img', express.static(path.join(__dirname, 'img/')))
app.use(sub + '/css', express.static(path.join(__dirname, 'css/')))

// start server
app.listen(port, () => {
    console.log("image host loaded !")
})

// upload logic
app.post(sub + '/host', upload.single('sharex') ,(req, res) => 
{
    // token check
    if(req.body.secret != config.img_secret) return res.send('wrong token!');
    
    let def = generateRandomString(8)

    // rename file for a shorter one
    const oldPath = path.join(__dirname, "/img/" + req.file.filename)  
    const newPath = path.join(__dirname, "/img/" + def)

    fs.rename(oldPath, newPath, () => {})
    
    // send back url to copypaste
    res.send(config.url + sub + "/" + def);
})

// image's page
app.get(sub + '/:img_id', (req, res) => {
    // check if file exist
    if(!fs.existsSync(path.join(__dirname, '/img/' + req.params.img_id))) return res.send('Not your lucky day, there\'s nothing here.');

    let content = `<html>
    <head>
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:title" content="${config.img_title}" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="${config.img_site_name}"/>
        <meta property="og:image" content="${config.url}${sub}/img/${req.params.img_id}"/>
        <meta property="og:description" content="${config.img_description}">
        <meta name="theme-color" content="#E74C3C">
        <link rel="stylesheet" href="${sub/css/upload.css}">
    </head>
    <body>
        <center>
            <h1>here you go ! :-)</h1>
            <img src="${sub}/img/${req.params.img_id}">
            <h3>Honestly, i don\'t think you should open weird links on discord, or anywhere on the internet for what matter</h3>
            <h4>made by <a href="https://github.com/SomeBoringNerd/SomeBoringImageHost">SomeBoringNerd</a></h4><br>
        </center>
    </body>
</html>`;

    // send page
    res.send(content)
})

// generate a random set of strings
const generateRandomString = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";

    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};