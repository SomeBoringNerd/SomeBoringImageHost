# SomeBoringImageHost

it's a simple image host for sharex meant to be used on discord.

# notes

you need embed permission to use it.

depending on what url you use (y'know, i-stole-ur.vbucks.com for example) you may need to talk about it with staff.

in my experience, most owners are fine with you using it, but be careful nonetheless.

if you want a "no setup, simple to use" version of that tool, there's a lot of them like :

https://upload.systems (probably the best i've used and have a free tier, it's fast, reliable, and the owners often do giveaways of invitations code)

https://e-z.host/ (that have a terrible reputation, apparently, worked alright for me)

there's a bigger list with reviews here : 

https://bin.fbi.pics/doing_ur_mom/8eGIQZEXeOqaO9f920V4AFGjMQnLTj

That being said, my tool is made for people that already have their VPS and / or domain name, or dont want to pay a third party (even tough that make no sense and if you buy a vps + domain name for that only you'd be better off buying your domain name and give it to upload.systems as they will automatically set it up for you). 

# history 

That tool was made in june of 2022 because a friend skidded my old image host in php and dared me to remake it in javascript.

Took me 4h and that was the last time I was ever productive.

# How to deploy

first, install Node.JS :

https://nodejs.org/en/

open a terminal in the folder and type "npm run install"

it will install all the dependancy

open config.json and set everything up (trial and error is a good idea to set up the different values even if they are documented.)

depending on your OS, use either sharenix.json or sharex.sxcu as your image uploader (I expect you to know how to use one of the two) in the configs folder.
change your token and url if needed.

last but not least, change the author_name and author_url in static/embed.json for a even more flashy embed.


### systemd users : 
open image.service and change the necessary values (path and users for example), and move it to /etc/systemd/system.

once it's done, to start it, just type `systemctl enable image.service`  and `systemctl start image.service`.

that way, the imagehost will start automatically when the vps start.

# reverse proxy

if you use a reverse proxy like nginx, proxypass http://localhost:(your port in config.json) for /i and that's it :

```
location /i {
    proxy_pass http://localhost:8069;
}
```
