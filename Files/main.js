var canvas = document.getElementById("playBoard");
var ctx = canvas.getContext("2d");
var f = new food();
var s = new Snake();
function draw(offsetX, offsetY, color)
{
		
	ctx.beginPath();
	ctx.rect(offsetX, offsetY, 10, 10);
	ctx.fillStyle = color;
	ctx.fill();
}

function food()
{
this.x = Math.floor(Math.random()*50)*10;
this.y = Math.floor(Math.random()*50)*10;
draw(this.x,this.y,"red");
}

function Snake()
{
this.x = canvas.width/2;
this.y = canvas.height/2;
this.xSpeed = 10;
this.ySpeed = 0;

}

var Update = setInterval(function(){
	if(s.x>canvas.width || s.y>canvas.height || s.x < 0 || s.y < 0)
	{
	console.log("SnakeDead");
	}
	else
	{
		if(s.x == f.x && s.y == f.y)
		{
		console.log("Red dot down!");
		f = new food();
		}
		s.y += s.ySpeed;
		s.x += s.xSpeed;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw(s.x,s.y,"white");
		draw(f.x,f.y,"red");
	}
},100);

document.addEventListener("keydown", function(event) 
{
	if(event.keyCode == 37)
	{
		s.ySpeed = 0;
		s.xSpeed = -10;
	}
	else if(event.keyCode == 38)
	{
		s.ySpeed = -10;
		s.xSpeed = 0;
	}
	else if(event.keyCode == 39)
	{
		s.ySpeed = 0;
		s.xSpeed = 10;
	}
	else if(event.keyCode == 40)
	{
		s.ySpeed = 10;
		s.xSpeed = 0;
	}
	else if(event.keyCode == 82)
	{
		s = new Snake();
	}
	else
	{
		console.log(event.keyCode);
	}
});