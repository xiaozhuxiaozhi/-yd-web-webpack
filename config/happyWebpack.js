const HappyWebpack =require('happypack');
const os = require('os');
const happyThreadPool =HappyWebpack.ThreadPool({
	size:os.cpus().length
});

module.exports= [
	new HappyWebpack({
		id:"happyTS",
		threadPool:happyThreadPool,
		verbose:true,
		loaders:[{
			path:'ts-loader',
			query:{
				happyPackMode:true
			}
		}]
	})
];