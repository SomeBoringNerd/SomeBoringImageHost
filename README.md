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

open config.json and set everything up (trial and tribulation is a good idea to set up the different values)
***

depending on your OS, use either sharenix.json or sharex.sxcu as your image uploader (i expect you to know how to use one of the other)
***

open a terminal in the folder and type "node index.js"

# other

if you use a reverse proxy like nginx, proxypass http://localhost:8080 for /host and that's it.