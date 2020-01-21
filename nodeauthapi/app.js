const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/',(req,res) => {
	res.json('Welcome to the api');
});

app.post('/api/login',(req,res) => {

	//MockUser
	const user = {
		id:1,
		username:'Sushant',
		email:'ssuhant.sss@gmail.com'
	}
	jwt.sign({user},{expiresIn: '1day'},'secretkey',(err,token) => {
		res.json({
			token:token,
		})
	});

})


app.post('/api/posts',verifyToken,(req,res) => {
	jwt.verify(req.token,'secretkey',(err,authData) => {
		if(err){
			res.sendStatus(403);
		}
		else{
			res.json({message:'Post created',
					 authData,authData
				 });
		}
	})
});


//format of token
// Authorizaion:Bearer <access_token>

//middleware function
function verifyToken(req,res,next){
	//get auth header value
	const bearerHeader = req.headers['authorization'];

	// checkif bearer is undefined
	if(typeof bearerHeader == 'undefined'){
		//forbidden
		res.sendStatus(403);
	}
	else{
		//Split at the space
		const bearer = bearerHeader.split(' ')
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		//next middleware
		next();
	}
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server started on port ${5000}`);
});

 