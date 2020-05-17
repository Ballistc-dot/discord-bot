const connection = require('../../models/database/connection')

module.exports = async(client,message,args,embed) => {
  const matchId = args[1]

  await connection('apostas')
    .where('match_id',matchId)
    .update({
      no_more_bets:1
    })
}