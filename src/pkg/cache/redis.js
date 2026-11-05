import Redis from "ioredis";

export class RedisCacheProvider {
    clint;

    constructor(config){
        this.clint = new Redis({
            host:config.host,
            port:config.port,
            password:config.password,
            lasyConnect:true,
            maxLoadingRetryTime: 3
        })

        this.clint.on('error', (err)=>console.log('redis server error', err.message));
        this.clint.connect().catch(err=>console.log('fail to connect to redis', err.message));
    }


    set(key, value, ttl){
        return this.clint.set(key, value, 'EX' , ttl)
    }

    get(key){
        return this.clint.get(key)
    }

    del(key){
        return this.clint.del(key)
    }
}