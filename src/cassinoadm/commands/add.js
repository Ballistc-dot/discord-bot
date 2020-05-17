const connection = require('../../models/database/connection')
const cl = require('crypto')
const Cassino  =require('../../functions/index')

module.exports = async(client,message,args,embed) => {
  let msg = ''
  
  try{

    if(!args[3]) msg = "Atenção: Você não adicionou um link de partida, isso poderá gerar apostas duplicadas!"
    
    const user = {
      id:message.author.id,
      username:message.author.username
    }
    let matchLink;
    args[3] ?  matchLink = args[3] : matchLink
    const bet = {
      time_1:args[1],
      time_2:args[2],
      link:args[3],
      match_id:cl.randomBytes(3).toString('HEX'),
      create_user_id:user.id,
      create_user_name:user.username
    }
    
    const cassino = new Cassino(user)
    
    embed
      .setTitle('Apostas iniciadas com sucesso!')
      .setDescription(
      `Apostas criadas para **${bet.time_1.toUpperCase()}** vs **${bet.time_2.toUpperCase()}**.
        Pelo staff: **${user.username}**.
        Id da partida: **${bet.match_id}**.
        Obs: Anote o id da partida para poder pausar as apostas e setar o vencedor.
        **${msg}** `)
      .attachFiles(['./src/assets/aposta.jpg'])
      .setThumbnail('attachment://aposta.jpg')
  
    if(bet.time_1 && bet.time_2){
      cassino.createBet(bet).then(r =>{
        message.reply(embed)
      })
      .catch(err => message.reply('ocorreu um erro ao criar essa aposta,caso percisita contate o programador'))
      
    }else{
      message.reply("digite o nome de dois times")
    }
  }catch(err){
    message.reply(`ocorreu um erro ERROR CODE: ${err.code}`)
  }
}


        
    