// import IndexModel from '../models/IndexModel'
 import { GET,route } from 'awilix-koa'
export default
@route("/")
@route("/index.html")
 class IndexController{
     constructor({indexService}){
     	this.indexService =indexService;
     }
     @GET()
    async indexAction(ctx){
         
             // const IndexModelIns =new IndexModel();
             // const result =await IndexModelIns.getData();
             //前端传数据
             //ctx.query =>ajax
             //ctx.params.id => /test/:id
             const result = await this.indexService.getData();
             ctx.body =await ctx.render('index',{data:result})
         
     }
 }
