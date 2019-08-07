import getToken from "./token.js"

const request = (context)=>{ //(url, method, data)
    const nPromise = new Promise((resolve, reject)=>{
        $.ajax(context)
            .done(res=>resolve(res))
            .fail(err=>reject(err))
    })
    return nPromise
}

export default {
    async searchMovie(query){
        var title = query.split(' ').join('@')
        const apiToken = await getToken
        var url = `http://localhost:8080/api/find/${title}/${apiToken}`
        var method = "get"
        
        return request({url, method})
    },
    async getRank(){
        const apiToken = await getToken
        var url = `http://localhost:8080/api/rank/${apiToken}`
        var method = "get"
        request({method, url})
    }
}