const discord = require('discord.js');
const mysql = require('mysql');
const settings = require("../settings.json");
const prefix = '!';
const ModCommands = require('./mod/config/GetCommands')(prefix);
const UserCommands = require('./users/config/GetCommands')(prefix);
const CasinoCommands = require('./cassino/config/GetCommands')(prefix);
const CasinoAdmCommands = require('./cassinoadm/config/GetCommands')(prefix);
const embed = new discord.MessageEmbed();
const Bot = new discord.Client();
const db = settings.sqlDatabase;


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : db
  });


  
  Bot.on("ready",()=>{
    console.log("bot online")
    Bot.user.setActivity('Belga é gay', { type: 'WATCHING' })
    .then()
    .catch(console.error);
  });
  
  Bot.on("message",(message)=>{
    try{
      const client = Bot.channels
      const args = message.content.trim().split(" ")
      let { cache } = message.guild.roles
      if(!message.author) return false;
      if(message.author.bot) return false;
      if(message.channel.id == settings.cassinoChannel)if(CasinoCommands[args[0].toLowerCase()]) CasinoCommands[args[0].toLowerCase()](client,message,args,embed,connection)
      if(message.channel.id == settings.cassinoAdmChannel && message.member.hasPermission('BAN_MEMBERS'))if(CasinoAdmCommands[args[0].toLowerCase()]) CasinoAdmCommands[args[0].toLowerCase()](client,message,args,embed,connection)
      if(message.channel.id == settings.channelId && message.member.hasPermission('BAN_MEMBERS')) if(ModCommands[args[0].toLowerCase()]) ModCommands[args[0].toLowerCase()](client,message,args,embed,connection)
      if(message.channel.id == settings.channelIdWhitelist) if(UserCommands[args[0].toLowerCase()]) UserCommands[args[0].toLowerCase()](client,message,args,embed,connection)
    }catch{
      return false
    };
  });
  
connection.connect();
  
Bot.login(settings.token);



