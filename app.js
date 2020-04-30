var express = require('express');

var http = require('http');

// install body-parser 
var bodyParser = require('body-parser');

var app = express();

 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//post 데이터 받음 
app.post('/message', function(req, res){
	var msg = req.body.content;
	console.log('전달 메시지: ' + msg);

	var send = {};

	switch(msg){
		case '열람실 자리 현황':
			send = {
				'message' : {
					'text' : '열람실 조회'
				}
			}
			break;

		case '오늘의 학식':
			send = {
				'message' : {
					'text' : '학식 조회'
				},
				'keyboard' : {
					'type' : 'buttons',
					'buttons' : ['학생회관', '대학원동']
				}
			}
			break;

		default :
			send = {
				'message' : {
					'text' : '미등록'
				}
			}
			break;
	}
	res.json(send);
});

//keyboard 들어오면 버튼 data를 json형식으로 응답
app.get('/keyboard', function(req, res){

	var data = {
		'type' : 'buttons',
		'buttons' : ['과일', '채소', '정보']
	};

	res.json(data);
});

http.createServer(app).listen(9090, function(){
	console.log('서버 실행 중..');
});
