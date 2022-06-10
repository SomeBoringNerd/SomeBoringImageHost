const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'img/' })
const fs = require('fs');
const express = require('express')

const app = express();

const config = require('./config.json')
const sub = '/i'
const port = config.port

app.use(sub + '/img', express.static(path.join(__dirname, 'img/')))
app.use(sub + '/css', express.static(path.join(__dirname, 'css/')))

app.listen(port, () => {
    console.log("image host loaded !")
})

app.post(sub + '/host', upload.single('sharex') ,(req, res) => 
{

    if(req.body.secret != config.img_secret) return res.send('wrong token!');

    

    let def = generateRandomString(8)

    const oldPath = path.join(__dirname, "/img/" + req.file.filename)  
    const newPath = path.join(__dirname, "/img/" + def)

    fs.rename(oldPath, newPath, () => console.log('error'))
    
    res.send(config.url + sub + "/" + def);
})

app.get(sub + '/:img_id', (req, res) => {
    if(!fs.existsSync(path.join(__dirname, '/img/' + req.params.img_id))) return res.send('Not your lucky day, there\'s nothing here.');

    let content = '<html>\n' +
    '   <head>\n' +
    '       <meta name="twitter:card" content="summary_large_image">\n' +
    '       <meta property="og:title" content="' + config.img_title + '" />\n' +
    '       <meta property="og:type" content="website" />\n' +
    '       <meta property="og:site_name" content="' + config.img_site_name + '"/>\n' +
    '       <meta property="og:image" content="'+ config.url + sub +'/img/' + req.params.img_id + '"/>\n' +
    '       <meta property="og:description" content="' + config.img_description + '">\n' +
    '       <meta name="theme-color" content="#0C2C63">\n' +
    '       <link type="application/json+oembed" href="">\n' +
    '       <link rel="stylesheet" href="'+ sub +'/css/upload.css">\n' +
    '   </head>\n' +
    '   <body>\n' +
    '       <center>\n' +
    '           <h1>here you go ! :-)</h1>\n' +
    '           <img src="'+ sub +'/img/' + req.params.img_id + '">\n' +
    '           <h3>Honestly, i don\'t think you should open weird links on discord, or anywhere on the internet for what matter</h3>\n' +
    '           <h4>made by <a href="https://github.com/SomeBoringNerd/SomeBoringImageHost">SomeBoringNerd</a></h4><br>\n' +
    '      </center>\n' +
    '   </body>\n' +
    '</html>\n';

    res.send(content)
})

const generateRandomString = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";

    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};