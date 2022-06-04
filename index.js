const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'img/' })
const fs = require('fs');
const express = require('express')

const app = express();
const port = 8080

app.use('/img', express.static(path.join(__dirname, 'img/')))
app.use('/host', express.static(path.join(__dirname, 'host/')))

app.listen(port, () => {
    console.log("image host loaded !")
})

app.post('/host', upload.single('sharex') ,(req, res) => 
{

    if(req.body.secret != config.img_secret) return res.send('wrong token!');

    let content = '<html>' +
    '   <head>' +
    '       <meta name="twitter:card" content="summary_large_image">' +
    '       <meta property="og:title" content="' + config.img_title + '" />' +
    '       <meta property="og:type" content="website" />' +
    '       <meta property="og:site_name" content="' + config.img_site_name + '"/>' +
    '       <meta property="og:image" content="/app/img/' + req.file.filename + '"/>' +
    '       <meta property="og:description" content="' + config.img_description + '">' +
    '       <meta name="theme-color" content="#0C2C63">' +
    '       <link type="application/json+oembed" href="">' +
    '       <link rel="stylesheet" href="/upload.css">' +
    '   </head>' +
    '   <body>' +
    '       <center>' +
    '           <h1>here you go ! :-)</h1>' +
'               <img src="/app/img/' + req.file.filename + '">' +
    '           <h3>Honestly, i don\'t think you should open weird links on discord, or anywhere on the internet for what matter</h3>' +
    '           <h4>made by <a href="https://github.com/SomeBoringNerd/SomeBoringImageHost">SomeBoringNerd</a></h4><br>' +
    '      </center>' +
    '   </body>' +
    '</html>';

    let def = generateRandomString(8)

    fs.writeFile(path.join(__dirname, '/host/' + def + '.html'), content, (err) => {
        if (err)
          console.log(err);
    });
    
    res.send("https://someboringnerd.xyz/api/host/" + def);
})

app.get('/host/:img_id', (req, res) => {
    if(!fs.existsSync(path.join(__dirname, '/host/' + req.params.img_id + '.html'))) return res.send('Not your lucky day, there\'s nothing here.');
    res.sendFile(path.join(__dirname, '/host/' + req.params.img_id + '.html'));
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