const errorHandler ={
	error(app,logger){
		app.use(async(ctx,next)=>{
			try{
				await next();
			}catch(error){
				// console.log(error);
				logger.error(error);
				ctx.status =ctx.status || 500;
				ctx.body ='<img style="width:100%" src="https://img.zcool.cn/community/0161455ab3af3aa80120be14bfba9e.png@2o.png">';
			}
		})
		app.use(async(ctx,next)=>{
			await next();
			if(404 !=ctx.status) return;
			ctx.body ='<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>'
		})
	}
}

export default errorHandler;