cc.Class({
    extends: cc.Component,

    properties: {
        //动画持续时间
        putDuration:1,
        putAudio:{
            default:null,
            type:cc.AudioSource
        },
        goldiconBox:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.posX=0;
        this.posY=0;
    },

    //start () {},

    // update (dt) {},
    /*
    *times 动作重复次数
    */
    putAction: function () {
        // 金币被丢到桌面
        var putinDesk = cc.moveTo(this.putDuration, cc.p(this.returnX(),this.returnY()));
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playSound, this);
        // 按顺序执行动作
        return cc.sequence(putinDesk,callback);
    },
    playSound: function () {
        this.node.setPosition(cc.p(590,-310));
        // 调用声音引擎播放声音
        this.putAudio.play();
        var goldicon=new cc.Node('putgold');
        var goldSp=goldicon.addComponent(cc.Sprite);
        goldSp.spriteFrame=this.node.getComponent(cc.Sprite).spriteFrame;
        goldicon.setPosition(cc.p(this.posX,this.posY));
        goldicon.setScale(0.2,0.2);
        goldicon.parent=this.goldiconBox;
    },
    startMoveAt:function() {
        var times=Math.ceil(Math.random()*10);//随机次数最多10次
        var jiange=Math.random();//随机时间间隔
        this.node.runAction(this.putAction());
        this.schedule(function(){
            this.node.runAction(this.putAction());
        },jiange,times);
        
    },
    //金币被丢向的X坐标范围
    returnX:function(){
        var xArr=[(Math.random()*35+300)*-1,(Math.random()*50+250)*-1,(Math.random()*50+200)*-1,(Math.random()*60+140)*-1,(Math.random()*20+300)*-1,(Math.random()*20+250)*-1,Math.random()*30+300,Math.random()*50+250,Math.random()*50+200,Math.random()*55+145,Math.random()*10+300,Math.random()*30+250,Math.random()*80];
        
        var xidx=Math.round(Math.random()*12);
        this.posX=xArr[xidx];
        return xArr[xidx];
    },
    //金币被丢向的Y坐标范围
    returnY:function(){
        var yArr=[Math.random()*75,Math.random()*-62];
        var yidx=Math.round(Math.random()*1);
        this.posY=yArr[yidx];
        return yArr[yidx];
    }
});
