export default class RiotApiService {

    token

    constructor( token:string ){
        this.token = token
    }

   async getUserByName( name:string ){
    const response = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`, {
        headers:{"X-Riot-Token":this.token}
    })
    return await response.json()
   }

   async getCurrentGameFromSummonerId( summonerId:string ){
    const response = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        headers:{"X-Riot-Token": this.token}
    })
    return await response.json()
   }
   async getTopRankPlayer(){
    const response = await fetch(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1`, {
        headers:{"X-Riot-Token": this.token}
    })
    return await response.json()
   }
    
}