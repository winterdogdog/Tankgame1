/**
 * Created by 冬冬 on 2017/2/13.
 */

var heroColor = new Array("red","blue","green");
var enemyTankColor = new Array("orange","pink","yellow");
function Bullet(x,y,direct,speed) {
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed =speed;
    this.isLive = true;
    this.timer = null;
    this.run = function run() {
        if(this.x<0||this.x>400||this.y<0||this.y>300)
        {
            window.clearInterval(this.timer);
            this.isLive =false;
        }
        else {
            switch (this.direct) {
                case 0:
                    this.y -= this.speed;
                    break;
                case 1:
                    this.x += this.speed;
                    break;
                case 2:
                    this.y += this.speed;
                    break;
                case 3:
                    this.x -= this.speed;
                    break;
            }
        }
        document.getElementById("aa").innerText="子弹x="+this.x+" 子弹y="+this.y;
    }

}
function Tank(x,y,direct,color) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.direct = direct;
    this.color = color;
    this.moveUP = function () {
        this.y -= this.speed;
        this.direct = 0;
    }
    this.moveRight = function () {
        this.x += this.speed;
        this.direct = 1;
    }
    this.moveDown = function () {
        this.y += this.speed;
        this.direct = 2;

    }
    this.moveLeft = function () {
        this.x -= this.speed;
        this.direct = 3;

    }
}
function Hero(x,y,direct,color) {
    this.tank = Tank;
    this.tank(x,y,direct,color);
    this.shotEnemy=function () {
        switch(this.direct){
            case 0:
                heroBullet=new Bullet(this.x+9,this.y,this.direct,2);
                break;
            case 1:
                heroBullet=new Bullet(this.x+30,this.y+9,this.direct,2);
                break;
            case 2:
                heroBullet=new Bullet(this.x+9,this.y+30,this.direct,2);
                break;
            case 3: //右
                heroBullet=new Bullet(this.x,this.y+9,this.direct,2);
                break;
        }
        heroBullets.push(heroBullet);
        var timer;
        timer = window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
        heroBullets[heroBullets.length-1].timer = timer;
    }
}
function EnemyTank(x,y,direct,color) {
    this.tank = Tank;
    this.tank(x,y,direct,color);

}
//画出自己的子弹,多说一句，你也可以把该函数封装到Hero类中
function drawHeroBullet(){
    for(var i=0;i<heroBullets.length;i++) {
        var heroBullet = heroBullets[i];
        //这里，我们加入了一句话，但是要知道这里加，是需要对整个程序有把握
        if (heroBullet != null && heroBullet.isLive) {
            cxt.fillStyle = "#FEF26E";
            cxt.fillRect(heroBullet.x, heroBullet.y, 2, 2);
        }
    }
}
    function drawTank(tank) {

        switch (tank.direct) {
            case 0:
            case 2:
                cxt.fillStyle = tank.color[0];
                cxt.fillRect(tank.x, tank.y, 5, 30);
                //以坦克的左上角为参照点画坦克，这样好处当左上角坐标变幻时，坦克就会跟着变化
                cxt.fillRect(tank.x + 15, tank.y, 5, 30);
                cxt.fillRect(tank.x + 6, tank.y + 5, 8, 20);
                //坦克的盖子
                cxt.fillStyle = tank.color[1];
                cxt.arc(tank.x + 10, tank.y + 15, 4, 0, 360, false);
                cxt.fill();
                //坦克的炮筒 直线
                cxt.strokeStyle = tank.color[2];
                cxt.lineWidth = 1.5;
                cxt.beginPath();
                cxt.moveTo(tank.x + 10, tank.y + 15);
                if(tank.direct==0){
                    cxt.lineTo(tank.x + 10, tank.y);}
                if(tank.direct==2) {
                    cxt.lineTo(tank.x+10,tank.y+30);
                }
                cxt.closePath();
                cxt.stroke();
                break;
            case 1:
            case 3:
                cxt.fillStyle = tank.color[0];
                cxt.fillRect(tank.x, tank.y, 30, 5);
                //以坦克的左上角为参照点画坦克，这样好处当左上角坐标变幻时，坦克就会跟着变化
                cxt.fillRect(tank.x, tank.y+15, 30, 5);
                cxt.fillRect(tank.x + 5, tank.y + 6, 20, 8);
                //坦克的盖子
                cxt.fillStyle = tank.color[1];
                cxt.arc(tank.x + 15, tank.y + 10, 4, 0, 360, false);
                cxt.fill();
                //坦克的炮筒 直线
                cxt.strokeStyle = tank.color[2];
                cxt.lineWidth = 1.5;
                cxt.beginPath();
                cxt.moveTo(tank.x + 15, tank.y + 10);
                if(tank.direct==1){
                    cxt.lineTo(tank.x + 30, tank.y+10);}
                if(tank.direct==3) {
                    cxt.lineTo(tank.x,tank.y+10);
                }
                cxt.closePath();
                cxt.stroke();
                break;
        }
    }