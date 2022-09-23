const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var db = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'hit2021112250',
	database:'db_01',
	port:'3306'
});

var indexpath = path.join(__dirname, "/Login.html")
app.get('/', (req, res) => {
	res.sendFile(indexpath)
})

var server = app.listen(8888, () => {
	console.log("Server Start");
})

app.post('/loginpost',(req,res) => {
	console.log("Get loginpost:",req.body.username);
	var selectsql='select * from users where username = "'+req.body.username+'" and password = "'+req.body.password+'"';
	db.query(selectsql,(err,rs) => {
		if (err) {
			console.log(err);
			res.end('<script>alert("未知错误");</script>');
		} 
		else {
			if (rs=='') {
				res.end('<script>alert("账号或密码错误！");</script>');
			}
			else {
				res.end('<script>alert("登录成功！");</script>');
			}
		}
	})
})