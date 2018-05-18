const XMLHTTP=require("XMLHTTP");
window.Global = {preIssue:'',issue:'',servertime:null,endtime:null,lotteryTime:null,is_balance:false,fengpan:false,timing:false};
cc.Class({
    extends: cc.Component,

    properties: {
        xhr:{
            default: null,
            type: XMLHTTP
        },
        userIdtxt:cc.Label,
        userCointxt:cc.Label,
        kjAudio:{
            default:null,
            type:cc.AudioSource
        },
        longBetbtn:{
            default:null,
            type:cc.Button
        },
        huBetbtn:{
            default:null,
            type:cc.Button
        },
        heBetbtn:{
            default:null,
            type:cc.Button
        },
        confirmBetbtn:{
            default:null,
            type:cc.Button
        },
        deskTexture:{
            default:null,
            type:cc.Node
        },
        longOadd:{
            default:null,
            type:cc.Label
        },
        huOadd:{
            default:null,
            type:cc.Label
        },
        heOadd:{
            default:null,
            type:cc.Label
        },
        goldiconBox:{
            default:null,
            type:cc.Node
        },
        iconBases:{
            default:[],
            type:[cc.Node]
        },
        balanceState:{
            default:null,
            type:cc.Node
        },
        balancedState:{
            default:null,
            type:cc.Node
        },
        longLable:{
            default:null,
            type:cc.Label
        },
        huLable:{
            default:null,
            type:cc.Label
        },
        heLable:{
            default:null,
            type:cc.Label
        },
        tanKuangNode:{
            default:null,
            type:cc.Node
        },
        displayBoard:{
            default:null,
            type:cc.Node
        },
        isLoading:{
            default:null,
            type:cc.Label
        },
        resetBtn:{
            default:null,
            type:cc.Button
        },
        lblNotice:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.userCookie=cc.sys.localStorage.getItem("userCookie");
        if(!this.userCookie)
        {
            cc.director.loadScene("Startgame");
        }
        cc.game.on(cc.game.EVENT_HIDE,function(){
            cc.log("游戏进入后台");
        }.bind(this));
        
        cc.game.on(cc.game.EVENT_SHOW,this.getNextIssue.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.userloginInfo=JSON.parse(cc.sys.localStorage.getItem("userinfo"));
        this.quitgame=0;//大于等于2则退出游戏程序 
        this.getNextIssue();
        this.getOdds();
        this.getHistory();
        this.userInfo();//获取用户信息
        this.schedule(function(){this.topInfo();},1);
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
    },
    //start () {},
    update (dt) {
        var x = this.lblNotice.node.x;
        x -= dt*100;
        if(x + this.lblNotice.node.width < -800){
            x = 500;
        }
        this.lblNotice.node.x = x;
    },
    //lateUpdate(){},
    //访问失败提示
    httpFail:function(res){
        var tankuang=cc.find("Canvas/tankuangbg");
        var tankuangtxt=cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label);
        if(!tankuang.active)
        {
            tankuang.active=true;
            tankuangtxt.string=res;
            tankuang.getComponent(cc.Animation).play();
        }
    },
    //获取公告信息
    getServiceResult:function(){
        this.xhr.xmlHttpGet("config/config.js",'',this.userCookie,this.setNotice.bind(this),this.httpFail);
    },
    setNotice:function(res,header){
        this.lblNotice.string=res.webCloseServiceResult;
    },
    //获取头部显示信息
    getNextIssue:function(){
        //cc.log('离开后台');
        this.isLoading.string=0;
        if(!this.displayBoard.active)
        {
            this.displayBoard.active=true;
        }
        if(!this.tanKuangNode.active)
        {
            this.tanKuangNode.active=true;
        }
        this.getServiceResult();
        this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string="正在请求数据……";
        this.xhr.xmlHttpGet("static/data/NextIssue.js",'',this.userCookie,this.setkjInfo.bind(this),this.httpFail);
        this.scheduleOnce(this.fn,5);
    },
    fn:function(){
        if(this.isLoading.string==0)
        {
            cc.log('再次请求');
            this.getNextIssue();
        }
    },
    //获取最新的10条记录
    getHistory:function(){
        this.xhr.xmlHttpGet("game/getHistory.do",{count:10},this.userCookie,this.showTrend,this.httpFail);
    },
    //获取玩法赔率
    getOdds:function(){
        this.xhr.xmlHttpGet("game/getPlayeds",'',this.userCookie,this.showOdds.bind(this),this.httpFail);
    },
    //显示赔率
    showOdds:function(res,header){
        if(res)
        {
            this.longOadd.string='x'+res['LONG']['odds'];
            this.huOadd.string='x'+res['HU']['odds'];
            this.heOadd.string='x'+res['TOTAL']['odds'];
        }
    },
    setkjInfo:function(res,header){
        if(res.preNum)
        {
            this.isLoading.string=1;
            if(this.tanKuangNode.active)
            {
                this.tanKuangNode.active=false;
            }
            if(this.displayBoard.active)
            {
                this.displayBoard.active=false;
            }
            //前一期
            var kjqishu=cc.find("Canvas/game/top/lotteryinfo/kjqishu").getComponent(cc.Label);
            kjqishu.string=res.preIssue+"期开奖";
            //将开奖号码分成数组
            var numArr=res.preNum.split(",");
            //获取组件数组
            var childnode=cc.find("Canvas/game/top/lotteryinfo").children;
            for (var i = 0; i < childnode.length; i++) {
                if (childnode[i]._name === "lotterynumbers")
                {
                    childnode[i].getChildByName("number").getComponent(cc.Label).string=numArr[i-1];
                }  
            }
            //本期
            var jjkjqishu=cc.find("Canvas/game/top/lotteryinfo/jjkjqishu").getComponent(cc.Label);
            jjkjqishu.string=res.issue+"期";
            var issuestr=res.issue+this.userloginInfo.uid;
            var yazhulog=cc.sys.localStorage.getItem(issuestr);//重新登录后获取当前已经押注的记录
            if(yazhulog)
            {
                var yazhuarr=JSON.parse(yazhulog);
                this.longLable.string='下注：'+yazhuarr.longzhu;
                this.huLable.string='下注：'+yazhuarr.huzhu;
                this.heLable.string='下注：'+yazhuarr.hezhu;
                //cc.sys.localStorage.setItem(issuestr,'');
            }
            Global.issue=res.issue;
            Global.preIssue=res.preIssue;
            Global.endtime=new Date(res.endtime).getTime();
            Global.lotteryTime=new Date(res.lotteryTime).getTime();
            Global.servertime=new Date(res.serverTime).getTime();
            Global.timing=true;//获取数据成功倒计时开始
            cc.log("开始倒计时");
            if(Global.issue!=''&&Global.preIssue!='')
            {
                if(parseInt(Global.issue)-parseInt(Global.preIssue)>1)
                {
                    this.checkDrawed();
                }
                else
                {
                    this.activateBetbtn();//结算后才可以继续投注
                }
            }
        }
        else
        {
            this.isLoading.string=0;
        }
    },
    showTrend:function(res,header){
        if(res.length>0)
        {
            var trendicons=cc.find("Canvas/game/bottom/trendbox/trendicons");
            var childs=trendicons.children;
            for(var l=0;l<childs.length;l++)
            {
                if(l>2)
                {
                    childs[l].destroy();
                }
            }
            var longicon=trendicons.getChildByName("longicon");
            var huicon=trendicons.getChildByName("huicon");
            var heicon=trendicons.getChildByName("heicon");
            for(var i=0;i<10;i++)
            {
                var iconObj=res[i]['n1']>res[i]['n5']?longicon:(res[i]['n1']<res[i]['n5']?huicon:heicon);
                var iconItem=cc.instantiate(iconObj);
                iconItem.active=true;
                trendicons.addChild(iconItem);
            }
        }
        
    },
    //获取用户信息
    userInfo:function(){
        var userinfo=JSON.parse(cc.sys.localStorage.getItem("userinfo"));
        this.userIdtxt.string=userinfo.utype>0?"ID:"+userinfo.uid:"游客";
        this.userCointxt.string="$"+userinfo.coin;
        //每10秒获得一次用户金币信息
        this.schedule(function(){
            this.xhr.xmlHttpPost("game/getUserMsg.do",'',this.userCookie,this.changeUserinfo,this.httpFail);
        },30);
    },
    topInfo:function(){
        
        if(Global.endtime&&Global.lotteryTime&&Global.timing)
        {
            var endtime=Global.endtime;
            var lotteryTime=Global.lotteryTime;
            if(Global.servertime!=null)
            {
                var nowtime=Global.servertime;
                Global.servertime=Global.servertime+1000;
                var Betdifftime=(endtime-nowtime)/1000;//封盘时间差
                var Drawdifftime=(lotteryTime-nowtime)/1000;//开奖时间差
                var Betformattime=this.difftime(Betdifftime);
                var Drawformattime=this.difftime(Drawdifftime);
                var BetLable=cc.find("Canvas/game/top/lotteryinfo/Sealing").getComponent(cc.Label);//封盘时间
                var DrawLable=cc.find("Canvas/game/top/lotteryinfo/draw").getComponent(cc.Label);//开奖时间
                BetLable.string="封盘："+this.getBetTimeStr(Betformattime);
    
                DrawLable.string="开奖："+this.getDrawTimeStr(Drawformattime);
                var kaijiangAudio=cc.find("Canvas/kaijiangAudio").getComponent(cc.AudioSource);//开奖铃声
                if(Drawdifftime<=0)
                {
                    Global.timing=false;//暂停倒计时
                    cc.log("停止倒计时");
                    this.getNextIssue();
                    Global.fengpan=false;
                }
            }  
        }
    },
    //检测是否已经开奖结算
    checkDrawed:function(){
        this.schedule(this.kjfun,2);
    },
    kjfun:function(){
        if(!Global.is_balance)
        {
            this.balanceState.active=true;
            this.banBetbtn();
            this.xhr.xmlHttpGet("static/data/CurIssue.js",'',this.userCookie,this.settleAccounts.bind(this),this.httpFail);
        }
        else
        {
            Global.is_balance=false;
            this.unschedule(this.kjfun);
            this.kjAudio.getComponent(cc.AudioSource).play();
            this.getHistory();
            this.balanceState.active=false;
            if(!this.balancedState.active)
            {
                this.balancedState.active=true;
                this.balancedState.getComponent(cc.Animation).play();
            }
            this.clearGoldsprite();//清除桌面之前的投注
            this.activateBetbtn();//结算后才可以继续投注
            //修改用户金币信息
            this.xhr.xmlHttpPost("game/getUserMsg.do",'',this.userCookie,this.changeUserinfo,this.httpFail);
        }
    },
    settleAccounts:function(res,header){
        if(res)
        {
            if(res.issue==(parseInt(Global.issue)-1))
            {
                Global.is_balance=true;
                //前一期
                var kjqishu=cc.find("Canvas/game/top/lotteryinfo/kjqishu").getComponent(cc.Label);
                kjqishu.string=res.issue+"期开奖";
                //将开奖号码分成数组
                var numArr=res.nums.split(",");
                //获取组件数组
                var childnode=cc.find("Canvas/game/top/lotteryinfo").children;
                for (var i = 0; i < childnode.length; i++) {
                    if (childnode[i]._name === "lotterynumbers")
                    {
                        childnode[i].getChildByName("number").getComponent(cc.Label).string=numArr[i-1];
                    }  
                }
                
            }
        }
    },
    //格式化时间差
    difftime:function(a){
        return a > 0 ? {
            day: Math.floor(a / 86400),
            hour: Math.floor(a % 86400 / 3600),
            minute: Math.floor(a % 3600 / 60),
            second: Math.floor(a % 60)
        } : {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        }
    },
    //格式化分秒
    fftime:function(a){
        return Number(a) < 10 ? "" + 0 + Number(a) : Number(a)
    },
    //禁用投注按钮和机器人投币
    banBetbtn:function(){
        this.unschedule(this.creatOthergold);
        if(this.longBetbtn.interactable)
        this.longBetbtn.interactable=false;
        if(this.huBetbtn.interactable)
        this.huBetbtn.interactable=false;
        if(this.heBetbtn.interactable)
        this.heBetbtn.interactable=false;
        if(this.confirmBetbtn.interactable)
        this.confirmBetbtn.interactable=false;
        if(this.resetBtn.interactable)
        this.resetBtn.interactable=false;
    },
    //激活投注按钮
    activateBetbtn:function(){
        
        if(!this.longBetbtn.interactable)
        this.longBetbtn.interactable=true;
        if(!this.huBetbtn.interactable)
        this.huBetbtn.interactable=true;
        if(!this.heBetbtn.interactable)
        this.heBetbtn.interactable=true;
        if(!this.confirmBetbtn.interactable)
        this.confirmBetbtn.interactable=true;
        if(!this.resetBtn.interactable)
        {
            this.resetBtn.interactable=true;
        }
        this.schedule(this.creatOthergold,1);//制造随机间隔投币效果
    },
    //显示到前端封盘倒计时时间格式
    getBetTimeStr:function(a){
        if (!a) {
            this.banBetbtn();
            Global.fengpan=true;
            return "已封盘" 
        }
        var b = "" + (a.day > 0 ? a.day + "天" : "") + (a.hour > 0 ? this.fftime(a.hour) + ":" : "") + this.fftime(a.minute) + ":" + this.fftime(a.second);
        if (b == "00:00") {
            this.banBetbtn();
            Global.fengpan=true;
            return "已封盘"
        }
        return b
    },
    //显示到前端开奖倒计时时间格式
    getDrawTimeStr:function(b){
        if (!b) {
            this.banBetbtn();
            return "已结束"
        }
        var a = "" + (b.day > 0 ? b.day + (lot_lang.dec_s21) + " " : "") + (b.hour > 0 ? this.fftime(b.hour) + ":" : "") + this.fftime(b.minute) + ":" + this.fftime(b.second);
        if (a == "00:00") {
            this.banBetbtn();
            return "已结束"
        }
        return a
    },
    changeUserinfo:function(res,header){
        if(res.balance)
        {
            var userinfo=JSON.parse(cc.sys.localStorage.getItem("userinfo"));
            userinfo.coin=res.balance;
            cc.sys.localStorage.setItem("userinfo",JSON.stringify(userinfo));
            var coinlable=cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label);
            coinlable.string="$"+res.balance;
        }
    },
    //创建系统的金币投放效果
    creatOthergold:function(){
        var nodes=this.iconBases;
        for (let index = 0; index < nodes.length; index++) {
            if(!nodes[index].active)
            {
                nodes[index].active=true;
            }
            nodes[index].getComponent("putInIcons").startMoveAt();
        }
        
        this.unschedule(this.creatOthergold);//取消计时
        var jiange=[5,10,15,20,25];//随机时间间隔
        var ix=Math.round(Math.random()*4);
        this.schedule(this.creatOthergold,jiange[ix]);//重新生成计时器
        
    },
    //清空桌面金币
    clearGoldsprite:function(){
        //用户自己的下注金币
        var deskchild=this.deskTexture.children;
        for(var i=0;i<deskchild.length;i++)
        {
            var goldbox=deskchild[i].getChildByName("goldbox");
            var stakebg=deskchild[i].getChildByName("stakebg");
            stakebg.getChildByName("staketxt").getComponent(cc.Label).string="下注：0";
            var goldboxchild=goldbox.children;
            if(goldboxchild.length>0)
            {
                for (let idx = 0; idx < goldboxchild.length; idx++) {
                    goldboxchild[idx].destroy();
                }
            }
        }
        //其他人的下注金币
        var icons=this.goldiconBox.children;
        for (let index = 0; index < icons.length; index++) {
            icons[index].destroy();
        }
    }
});
