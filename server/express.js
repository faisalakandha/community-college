import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';

// comment out before building for production
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// comment out before building for production
devBundle.compile(app)

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Static Assets folder
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,'dist')));

// Catch unauthorised errors

app.use((err, req, res, next) => {
	if(err.name === 'UnauthorizedError'){
		res.status(401).json({"error": err.name + ": " + err.message});
	} else if(err){
		res.status(400).json({"error": err.name + ": " + err.message});
		console.log(err);
	}
});

export default app;