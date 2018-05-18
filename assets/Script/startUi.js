cc.Class({
    extends: cc.Component,

    properties: {
        tanKuangNode:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.quitgame=0;//大于等于2则退出游戏程序
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.KEY.back:
                this.quitgame++;
                break;
        }
    },
    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.KEY.back:
                if(this.quitgame>=2)
                {
                    cc.director.end();
                }
                else
                {
                    if(!this.tanKuangNode.active)
                    {
                        this.tanKuangNode.active=true;
                        
                    }
                    this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string="再按一次退出游戏";
                    this.tanKuangNode.getComponent(cc.Animation).play();
                    this.scheduleOnce(function(){this.quitgame=0},1);
                }
                break;
        }
    }
    //start () {},

    // update (dt) {},
});
