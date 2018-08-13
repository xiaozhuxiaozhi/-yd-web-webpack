
import { GET,route } from 'awilix-koa'
export default
@route("/test/:id")
 class IndexController{
     @GET()
    async indexAction(ctx){
        console.log(ctx.params.id);
        ctx.body ='Hello world!!!'
         
     }
 }
