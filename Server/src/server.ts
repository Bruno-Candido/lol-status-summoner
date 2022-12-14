import  Fastify from 'fastify'

import { allRoutes } from '../src/rotasApi'


async function bootstrap(){
    const fastify = Fastify({
        logger:true
    })

    fastify.register(allRoutes)

    await fastify.listen({ port:3333, host:'0.0.0.0'})
}

bootstrap()