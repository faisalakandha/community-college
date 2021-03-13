import path from 'path';
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose';


let port = config.port || 3000;

app.listen(port, function onStart(err){
	if(err){
		console.log(err)
	}
	console.info('Server started on port %s', port)
	
});

// Database Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Successfully Connected...'))
  .catch(err => console.log(err));

