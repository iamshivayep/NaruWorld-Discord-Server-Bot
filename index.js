const { Client, GatewayIntentBits,  channelLink, ActivityType } = require('discord.js')
const Discord = require('discord.js')
require('dotenv/config')
const { EmbedBuilder } = require('discord.js');
const client = new Discord.Client({
    allowedMentions: {
        parse: [`users`, `roles`],
        repliedUser: true,

    },
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        
    ],
})
const prefix = "nw!";





client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    if (command === `warn`) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase()) === argument.slice(0).join(" " || x.user.username === argument[0]);

        if (!message.member.permissions.has("KickMembers")) return message.channel.send("*you do not have proper permissions to execute this command!*")
        if (!member.kickable) return message.channel.send("i cannot warn this person!")
        if (message.member === member) return message.channel.send(":red_circle: wtf are you trying to do you dumb little shit you cant warn yourself get a life bruh")

        if (!argument[0]) return message.channel.send('*you must specify a user to warn*') 
        let reason = argument.slice(1).join(" ") || '*No reason given.*'
        
        const embed1 = new EmbedBuilder()
        .setTitle(`:red_circle: Warn of ${member.mentions}`)
        .setDescription(`:white_check_mark: *Warned for: ${reason}, you will be timeouted for 1 week after 3 warns!*`)
        
        .setColor('Blue')

        message.channel.send({embeds: [embed1]})
    }   
    if (command === `ban`) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase()) === argument.slice(0).join(" " || x.user.username === argument[0]);

        if (!message.member.permissions.has("BanMembers")) return message.channel.send("*you do not have proper permissions to execute this command!*")
        if (!member.kickable) return message.channel.send("i cannot ban this person!")
        if (message.member === member) return message.channel.send(":red_circle: wtf are you trying to do you dumb little shit you cant warn yourself get a life bruh")

        if (!argument[0]) return message.channel.send('*you must specify a user to ban*') 
        let reason = argument.slice(1).join(" ") || '*No reason given.*'
        member.ban().catch(err => {message.channel.send("*there was a failure in banning this member!*")})
        const embed1 = new EmbedBuilder()
        .setTitle(`:red_circle: *Ban of ${member.displayName}*`)
        .setDescription(`:white_check_mark: *Banned for: ${reason}, deserved it*`)
        
        .setColor('Blue')

        message.channel.send({embeds: [embed1]})
    }   
    if (command === `kick`) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase()) === argument.slice(0).join(" " || x.user.username === argument[0]);

        if (!message.member.permissions.has("BanMembers")) return message.channel.send("*you do not have proper permissions to execute this command!*")
        if (!member.kickable) return message.channel.send("*i cannot kick this person!*")
        if (message.member === member) return message.channel.send(":red_circle: wtf are you trying to do you dumb little shit you cant warn yourself get a life bruh")

        if (!argument[0]) return message.channel.send('*you must specify a user to kick*') 
        let reason = argument.slice(1).join(" ") || '*No reason given.*'
        member.kick().catch(err => {message.channel.send("*there was a failure in kicking this member!*")})
        const embed1 = new EmbedBuilder()
        .setTitle(`:red_circle: *Kick of ${member.displayName}*`)
        .setDescription(`:white_check_mark: kicked for => ${reason}`)
        
        .setColor('Blue')

        message.channel.send({embeds: [embed1]})
    }   
    if (command === `help`) {
        const embed2 = new EmbedBuilder()
        .setTitle('Help')
        .setDescription(`*Useful commands of this bot*`)
        .setColor('Blurple')
        .addFields(
            { name: '`nw!help`', value: '*this command is used to show the commands of this server with their information.*' },
            {name: '`Format:`', value: '*nw!help*'},
            { name: '`nw!ban`', value: '*this command is used to ban a user from the server for offending the rules.*' },
            {name: '`Format:`', value: '*nw!ban <user> <reason>*'},
            { name: '`nw!kick`', value: '*this command is used to kick the users as a final warning for offending.*' },
            {name: '`Format:`', value: '*nw!kick <user> <reason>*'},
            { name: '`nw!warn`', value: '*this command is used to let users know that they have broken a rule and to give them 3 chances before a final strike timeout.*' },
            {name: '`Format:`', value: '*nw!warn <user> <reason>*'},
            { name: '`nw!timeout`', value: '*If an offender has broken a rule, you can timeout them which will prevent them from typing and block their access to the server for the specified duration, however, they will still remain in the server*' },
            {name: '`Format:`', value: '*nw!timeout <user> <duration(seconds)> <reason>*'},
            {name: '`Fun Category (Experimental)`', value: "*Fun commands are just some minigames, for NaruWorld! bot, they are currently under experimental development.*"},
            {name: '`nw!8ball`', value: '*Make the bot do a random response, like yes, no. you need to ask the question!*'},
            {name: '`Format:`', value: "nw!8ball <Question>"}
        )
        message.channel.send({embeds: [embed2]})
    }
    if (command === `timeout`) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase()) === argument.slice(0).join(" " || x.user.username === argument[0]);
        const duration = argument[1];
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("*You cannot timeout as you do not have proper permissions!*")
        if (!member.timeout) return message.channel.send(`i cannot timeout ${member.displayName}`)
        if (message.member === member) return message.channel.send(":red_circle: wtf are you trying to do you dumb little shit you cant warn yourself get a life bruh")
        if (!duration) return message.channel.send('*Specify a duration in (milliseconds)*')
        if (!argument[0]) return message.channel.send('*you must specify a user to timeout*') 
        if (duration > 604800) return message.channel.send("*you must specify a value between the range of 1 to 604800 (one week), morever, the value must only be in seconds*")
        let reason = argument.slice(2).join(" ") || '*No reason given.*'
        member.timeout(duration * 1000).catch(err => {message.channel.send("*there was a failure in timing out this member!*")})
        const embed3 = new EmbedBuilder()
        .setTitle(`:red_circle: *Timeout of ${member.displayName}*`)
        .setDescription(`:white_check_mark: *Timeouted for: ${reason}, Duration in seconds => ${duration}*`)
        
        .setColor('Blue')

        message.channel.send({embeds: [embed3]})
    }   
    if (command === `8ball`) {
        if (!argument[0]) return message.channel.send("***You need to specify a question.***")
        var responses = [
            "***Yes, definetly.***",
            "***No doubt on that.***",
            "***I say no***",
            "***I think it should be a no***"
        ]
        var randomAnswer = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(randomAnswer).catch(err => message.channel.send("***Failure in applying a response***"))
        
    }
    
})
client.login(process.env.TOKEN)

client.on('ready', () => {
    console.log("Ready.")
    // Set the client user's presence
    client.user.setPresence({ activities: [{ name: 'nw!help' }], status: 'idle' });
})



client.login(process.env.TOKEN)