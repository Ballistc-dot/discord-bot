const Cassino = require('../../functions/index') 
const cassino = new Cassino

module.exports = async(client,message,args,embed)=>{
    if(args && typeof(args[0])){
        const user ={
            id:message.author.id,
            username:message.author.username,
            game_id:args[1]
        }
        const cassino = new Cassino(user)
        
        embed
        .setTitle(`Bem vindo ${user.username}`)
        .setDescription(
        `Usuário  **${user.username}**, id: **${user.game_id}** registrado com sucesso.
        Saldo inicial: **$1000**`)
        .setColor("#fff")
        
        cassino.createAccount(user).then(r => {
            if(r.code =='SQLITE_CONSTRAINT'){
                message.reply("você só pode se registrar uma unica vez!")
            }else{
                message.reply(embed)
            }

        })
    }else{
        message.reply('necessário informar o ID')
    }
}   