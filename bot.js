const Discord = require('discord.js');
const black = new Discord.Client();

black.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
black.on('message',msg=>{
   if(msg.content === 'السلام عليكم') return msg.reply('وعليكم السلام');
 black.on('guildMemberAdd',async member => {
  const Canvas = require('canvas');
  const jimp = require('jimp');
  const w = ['welcome_4.png'];
        let Image = Canvas.Image,
            canvas = new Canvas(800, 300),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.beginPath();
 
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 800, 300);
 
})
 
                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                 if (err) return console.log(err);
 
          ctx.font = '36px Arial';
          ctx.fontSize = '72px';
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(member.user.username, 545, 177);
         
          ctx.font = '16px Arial Bold';
          ctx.fontSize = '72px';
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
         
          let Avatar = Canvas.Image;
          let ava = new Avatar;
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 36, 21, 260, 260);
           
          const c = hero.channels.get(" اي دي الروم ");
          c.sendFile(canvas.toBuffer());
 
});
});
});const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const prefix = '1';
black.on('ready', function() {
    console.log(`i am ready ${client.user.username}`);
});

      client.on('ready', () => {
              client.user.setActivity("1play |تجربتي", {type: 'LISTENING'});
      
      });
/*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];
/*
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
*/
client.on('ready', () => {});
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

client.on('message', function(message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(' ').slice(1).join(' ');

    if (mess.startsWith(prefix + 'play')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        // if user is not insert the URL or song title
        if (args.length == 0) {
message.channel.send('Add a song name or song link :drum: ')
            return;
        }
        if (queue.length > 0 || isPlaying) {
            getID(args, function(id) {
                add_to_queue(id);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
message.channel.send(`aded : **( ${videoInfo.title} )** on the list :musical_note:`)
                    queueNames.push(videoInfo.title);
                    now_playing.push(videoInfo.title);

                });
            });
        }
        else {

            isPlaying = true;
            getID(args, function(id) {
                queue.push('placeholder');
                playMusic(id, message);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
message.channel.send(`Now playing : **( ${videoInfo.title} )** :musical_note: `)
                    // client.user.setGame(videoInfo.title,'https://www.twitch.tv/Abdulmohsen');
                });
            });
        }
    }
    else if (mess.startsWith(prefix + 'skip')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        message.channel.send('**Done , :white_check_mark: **').then(() => {
            skip_song(message);
            var server = server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        });
    }
    else if (message.content.startsWith(prefix + 'vol')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        // console.log(args)
        if (args > 100) return message.channel.send('Only : 1 || 100 :microphone2:')
        if (args < 1) return message.channel.send('Only : 1 || 100 :microphone2:')
        dispatcher.setVolume(1 * args / 50);
        message.channel.sendMessage(`Now vol : ${dispatcher.volume*50}% :musical_note: `);
    }
    else if (mess.startsWith(prefix + 'pause')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        message.channel.send('**Done , :white_check_mark: **').then(() => {
            dispatcher.pause();
        });
    }
    else if (mess.startsWith(prefix + 'resume')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
            message.channel.send('**Done , :white_check_mark: **').then(() => {
            dispatcher.resume();
        });
    }
    else if (mess.startsWith(prefix + 'stop')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        message.channel.send('**Done , :white_check_mark: **');
        var server = server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
    else if (mess.startsWith(prefix + 'join')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        message.member.voiceChannel.join().then(message.channel.send('**Done , ::white_check_mark: **'));
    }
    else if (mess.startsWith(prefix + 'play')) {
        if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
        if (isPlaying == false) return message.channel.send('**Done , :white_check_mark: **');
message.channel.send('Now playing : ${videoInfo.title} :musical_note:')
    }
});

function skip_song(message) {
    if (!message.member.voiceChannel) return message.channel.send('You must be in my audio room :microphone2:');
    dispatcher.end();
}

function playMusic(id, message) {
    voiceChannel = message.member.voiceChannel;


    voiceChannel.join().then(function(connectoin) {
        let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];

        dispatcher = connectoin.playStream(stream);
        dispatcher.on('end', function() {
            skipReq = 0;
            skippers = [];
            queue.shift();
            queueNames.shift();
            if (queue.length === 0) {
                queue = [];
                queueNames = [];
                isPlaying = false;
            }
            else {
                setTimeout(function() {
                    playMusic(queue[0], message);
                }, 500);
            }
        });
    });
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYoutubeID(str));
    }
    else {
        search_video(str, function(id) {
            cb(id);
        });
    }
}

function add_to_queue(strID) {
    if (isYoutube(strID)) {
        queue.push(getYoutubeID(strID));
    }
    else {
        queue.push(strID);
    }
}

function search_video(query, cb) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        cb(json.items[0].id.videoId);
    });
}


function isYoutube(str) {
    return str.toLowerCase().indexOf('youtube.com') > -1;
}
 client.on('message', message => {
  if (message.content === `${prefix}`) {
    const embed = new Discord.RichEmbed()
     .setColor("RANDOM")
.setFooter('Thank You For use this bot ! .')
      message.channel.send({embed});
     }
    });
black.login('process.env.BOT_TOKEN')
