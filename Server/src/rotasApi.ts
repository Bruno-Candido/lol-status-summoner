import { FastifyInstance } from 'fastify'
import * as path from 'path'

import riotKey from './config/riotKey'
import RiotApiService from './services/RiotApiService'


export async function allRoutes(fastify:FastifyInstance) {
    fastify.get('/summoner/:name', async (request, reply) => {
        const {name} = request.params
        const services = new RiotApiService(riotKey.token)
        const userStatus = await services.getUserByName(name)

        const statusSummoner = await services.getCurrentGameFromSummonerId(userStatus.id)

        if(userStatus.status){
            reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({summoner:'summoner não encontrado'})
        }
        else{
            reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ 
                tier:statusSummoner[0].tier,
                rank:statusSummoner[0].rank,
                leaguePoints:statusSummoner[0].leaguePoints,
                wins:statusSummoner[0].wins,
                losses:statusSummoner[0].losses,
                icon:userStatus.profileIconId,
                lastGame:userStatus.revisionDate,
                level:userStatus.summonerLevel,
                name:userStatus.name,
            
            } )
        }
        
        /* reply.send({teste: userStatus.status.status_code        }) */

    })

    fastify.get('/topplayer', async(request, reply) => {
        const service = new RiotApiService(riotKey.token)
        const topPlayer = await service.getTopRankPlayer()

        reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            tier:topPlayer[0].tier,
            rank:topPlayer[0].rank,
            leaguePoints:topPlayer[0].leaguePoints,
            wins:topPlayer[0].wins,
            losses:topPlayer[0].losses,
            name:topPlayer[0].summonerName
        })
    })

    fastify.get('/icon/:icon', async (request, reply) => {
        const { icon } = request.params
        const iconPerfil = path.resolve(`../assets/12.22.1/img/profileicon/${icon}.png`)
        /* path.resolve('wwwroot', 'static_files/png/' */
        reply
        .code(200)
        .send(iconPerfil)
    })

}
