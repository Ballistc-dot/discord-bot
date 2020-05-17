const connection = require('../../models/database/connection')

module.exports = (client,message,args,embed)=>{


  function showMatches(data){
    embed
    .setTitle('Partidas abertas')
    .setDescription(data.map((value) =>{
      return(
        `**${value.time_1.toUpperCase()}** vs **${value.time_2.toUpperCase()}**
        ID da partida: **${value.match_id}** 
        link da partida:**${value.link}**
        **OBS:USE ESSE ID PARA APOSTAR**
        `
      )
    }))
    message.reply(embed)
  }
  connection('apostas')
  .where({
    isEnded:0,
    no_more_bets:0
  })
  .then(r =>{
      showMatches(r)
    })
}

  