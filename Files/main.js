//set of needed variable for the game
var canvas = document.getElementById("playBoard");
var ctx = canvas.getContext("2d");
var f = new food();
var s = new Snake();
var d = new Display();
var timelapse = 100;

function Display()
{
	this.time = document.getElementById("time");
	this.length = document.getElementById("length");
	this.totaltime = 0;
}

//function draw, who draw square with the info provided
function draw(offsetX, offsetY, color)
{
		
	ctx.beginPath();
	ctx.rect(offsetX, offsetY, 10, 10);
	ctx.fillStyle = color;
	ctx.fill();
}

//food object
function food()
{
this.x = Math.floor(Math.random()*50)*10;
this.y = Math.floor(Math.random()*50)*10;
draw(this.x,this.y,"red");
}

//snake object
function Snake()
{
this.x = canvas.width/2;
this.y = canvas.height/2;
this.xSpeed = 10;
this.ySpeed = 0;
this.len = 0;
this.tail = [];
this.play = true;
}

//game loop
var Update = setInterval(function(){
	if(s.x>canvas.width || s.y>canvas.height || s.x < 0 || s.y < 0||s.dead)
	{
	if(s.play) //need to use s.play to prevent clearing interval, so we can restart with 'R'
	alert("you are dead! \n press 'R' to restart");
	s.play = false;
	}
	else if(!s.dead)
	{
		//check for food collision
		if(s.x == f.x && s.y == f.y)
		{
			s.len++;
			d.length.innerHTML = "tail lenght : "+s.len;
			f = new food();
		}
		//init value of head before body loop
		s.tail[s.len]=[s.x,s.y];
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//pushing snake body toward head
		for(i = 0; i < s.len; i++)
		{
			s.tail[i] = s.tail[i+1];
			draw(s.tail[i][0],s.tail[i][1],"purple");
		}
		//moving head
		s.y += s.ySpeed;
		s.x += s.xSpeed;
		s.tail[s.len]=[s.x,s.y];
		//checking after moving head, if head toutch body
		for(i = 0; i < s.len; i++)
		{
		if(s.tail[s.len][0]==s.tail[i][0]&&s.tail[s.len][1]==s.tail[i][1])
		s.dead = true;
		}
		//draw everything in the canvas
		draw(s.x,s.y,"white");
		draw(f.x,f.y,"red");
		d.totaltime += timelapse;
		d.time.innerHTML = "time played : "+Math.round(d.totaltime/1000);
	}
},timelapse);

//key action
document.addEventListener("keydown", function(event) 
{
	if(event.keyCode == 37&&s.xSpeed!=10)
	{
		s.ySpeed = 0;
		s.xSpeed = -10;
		 event.preventDefault();
	}
	else if(event.keyCode == 38&&s.ySpeed!=10)
	{
		s.ySpeed = -10;
		s.xSpeed = 0;
		 event.preventDefault();
	}
	else if(event.keyCode == 39&&s.xSpeed!=-10)
	{
		s.ySpeed = 0;
		s.xSpeed = 10;
		 event.preventDefault();
	}
	else if(event.keyCode == 40&&s.ySpeed!=-10)
	{
		s.ySpeed = 10;
		s.xSpeed = 0;
		 event.preventDefault();
	}
	else if(event.keyCode == 82)
	{
		s = new Snake();
	}
});