# SomeBoringImageHost

it's a simple image host for sharex meant to be used on discord.

READ THE LICENSE BEFORE USAGE !!

# How to deploy

first, install Node.JS :

https://nodejs.org/en/
***

open a terminal in the folder and type "npm run install"

it will install all the dependancy 
***

open config.json and set everything up (trial and error is a good idea to set up the different values)
***

depending on your OS, use either sharenix.json or sharex.sxcu as your image uploader (i expect you to know how to use one of the two)
change your token and url if needed
***

open a terminal in the folder and type "node index.js". it is recommanded to use screen, docker, or ng to keep the webserver online.

# reverse proxy

if you use a reverse proxy like nginx, proxypass http://localhost:8069 for /i and that's it :

```
location /i {
    proxy_pass http://localhost:8069
}
```