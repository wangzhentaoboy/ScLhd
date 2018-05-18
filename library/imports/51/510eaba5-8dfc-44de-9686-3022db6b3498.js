"use strict";
cc._RF.push(module, '510eauljfxE3paGMCLbazSY', 'gameBtnClick');
// Script/gameBtnClick.js

"use strict";

var XMLHTTP = require("XMLHTTP");
cc.Class({
    extends: cc.Component,

    properties: {
        xhr: {
            default: null,
            type: XMLHTTP
        },
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        displayBoard: cc.Node,
        ruleBoard: cc.Node,
        trendBoard: cc.Node,
        stakeBoard: cc.Node,
        stakeBox: cc.Node,
        editpassBoard: cc.Node,
        oldMima: cc.Component,
        newMima: cc.Component,
        animatefireArr: {
            default: [],
            type: [cc.Node]
        },
        stakeMoney: 0,
        stakeBtnsprite: {
            default: null,
            type: cc.Sprite
        },
        goldClips: {
            default: [],
            type: [cc.Sprite]
        },
        tanKuang: {
            default: null,
            type: cc.Node
        },
        userGold: {
            default: null,
            type: cc.Label
        },
        //除背景外的其他声音
        otherAudios: {
            default: [],
            type: [cc.AudioSource]
        },
        //当前期数组件
        issueLable: {
            default: null,
            type: cc.Label
        },
        longLable: {
            default: null,
            type: cc.Label
        },
        huLable: {
            default: null,
            type: cc.Label
        },
        heLable: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.betArr = [];
        this.totalMoneys = 0;
        this.mygoldSprite = []; //我投注的桌面金币精灵
        this.userCookie = cc.sys.localStorage.getItem("userCookie");
        this.userloginInfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
    },

    //start () {},

    // update (dt) {},
    //访问失败提示
    httpFail: function httpFail(res) {
        var tankuang = cc.find("Canvas/game/tankuangbg");
        var tankuangtxt = cc.find("Canvas/game/tankuangbg/msgtxt").getComponent(cc.Label);
        if (!tankuang.active) {
            tankuang.active = true;
        }
        tankuangtxt.string = res;
        tankuang.getComponent(cc.Animation).play();
    },
    //创建金币到桌面
    createGoldsprite: function createGoldsprite(parentnode, spriteframe) {
        var node = new cc.Node('goldclip');
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = spriteframe;
        node.parent = parentnode;
        node.setScale(0.25, 0.25);
        //获取随机输
        var posX = Math.floor(Math.random() * 50 - Math.random() * 100);
        var posY = Math.floor(Math.random() * 50 - Math.random() * 100);
        node.setPositionX(posX);
        node.setPositionY(posY);
        this.mygoldSprite.push(node);
    },
    controlStakeAnimate: function controlStakeAnimate(stakebtn) {
        var stakenodes = this.stakeBox.children;
        for (var i = 0; i < this.animatefireArr.length; ++i) {
            if (stakenodes[i]._name === stakebtn.target._name) {
                this.animatefireArr[i].active = true;
                var yznumber = stakenodes[i].getChildByName("yztxt").getComponent(cc.Label).string;
                this.stakeMoney = parseInt(yznumber);
                this.stakeBtnsprite = stakenodes[i].getComponent(cc.Sprite);
            } else {
                this.animatefireArr[i].active = false;
            }
        }
    },
    //下注类型龙虎和
    stakeType: function stakeType(stakeobj) {
        var staketype = stakeobj.target;
        var goldbox = staketype.getChildByName("goldbox");
        var staketxt = staketype.getChildByName("stakebg").getChildByName("staketxt");
        var stakelable = staketxt.getComponent(cc.Label);
        var lablestr = stakelable.string.slice(3);
        //判断用户金币是否足够押注,不够则不做押注效果并且提示用户
        var usercions = this.userGold.string.slice(1);
        this.totalMoneys += this.stakeMoney;
        if (parseInt(usercions) >= this.totalMoneys) {
            var goldMoney = parseInt(lablestr) + this.stakeMoney;
            this.createGoldsprite(goldbox, this.stakeBtnsprite.spriteFrame); //放置金币
            stakelable.string = "下注：" + goldMoney;
            var gamebetarr = new Array();
            if (staketype._name === 'dragon') {
                gamebetarr['playId'] = 'dragon';
            } else if (staketype._name === 'tiger') {
                gamebetarr['playId'] = 'tiger';
            } else if (staketype._name === 'tie') {
                gamebetarr['playId'] = 'tie';
            }
            gamebetarr['money'] = this.stakeMoney;

            this.betArr.push(gamebetarr);
        } else {
            if (!this.tanKuang.active) {
                this.tanKuang.active = true;
            }
            this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = "您的金币不足,请充值后再押注！";
            this.tanKuang.getComponent(cc.Animation).play();
            this.totalMoneys -= this.stakeMoney;
        }
    },
    //重新押注
    resetBetClick: function resetBetClick() {
        this.totalMoneys = 0;
        var longgoldcoin = 0;
        var hugoldcoin = 0;
        var hegoldcoin = 0;
        //cc.log(this.longLable.string);
        if (this.betArr.length > 0) {
            var zsbetArr = this.betArr;
            for (var l = 0; l < zsbetArr.length; l++) {
                if (zsbetArr[l]['playId'] == 'dragon') {
                    longgoldcoin += parseInt(zsbetArr[l]['money']);
                }
                if (zsbetArr[l]['playId'] == 'tiger') {
                    hugoldcoin += parseInt(zsbetArr[l]['money']);
                }
                if (zsbetArr[l]['playId'] == 'tie') {
                    hegoldcoin += parseInt(zsbetArr[l]['money']);
                }
            }
            this.longLable.string = '下注：' + (parseInt(this.longLable.string.slice(3)) - longgoldcoin);

            this.huLable.string = '下注：' + (parseInt(this.huLable.string.slice(3)) - hugoldcoin);
            this.heLable.string = '下注：' + (parseInt(this.heLable.string.slice(3)) - hegoldcoin);
        }
        this.betArr = [];
        if (this.mygoldSprite.length > 0) {
            for (var i = 0; i < this.mygoldSprite.length; i++) {
                this.mygoldSprite[i].destroy();
            }
        }
        this.mygoldSprite = [];
    },
    gameBetClick: function gameBetClick() {

        if (this.betArr.length > 0) {
            var thisbetArr = this.betArr;
            var issue = Global.issue;
            var endtime = Global.endtime;
            var psftime = new Date(endtime).getTime() / 1000;
            var lhtArr = new Array();
            var longArr = new Array();longArr['playId'] = 1105;longArr['money'] = 0;
            var huArr = new Array();huArr['playId'] = 1106;huArr['money'] = 0;
            var heArr = new Array();heArr['playId'] = 1107;heArr['money'] = 0;

            for (var i = 0; i < thisbetArr.length; i++) {
                if (thisbetArr[i]['playId'] == 'dragon') {

                    longArr['money'] += parseInt(thisbetArr[i]['money']);
                } else if (thisbetArr[i]['playId'] == 'tiger') {

                    huArr['money'] += thisbetArr[i]['money'];
                } else if (thisbetArr[i]['playId'] == 'tie') {

                    heArr['money'] += thisbetArr[i]['money'];
                }
            }
            if (longArr['money'] > 0) {
                lhtArr.push(longArr);
            }
            if (huArr['money'] > 0) {
                lhtArr.push(huArr);
            }
            if (heArr['money'] > 0) {
                lhtArr.push(heArr);
            }

            var Money = 0;
            for (var idx = 0; idx < lhtArr.length; idx++) {
                Money += lhtArr[idx]['money'];
            }
            var usercions = this.userGold.string.slice(1);

            if (Money <= parseInt(usercions)) {
                this.userGold.string = '$' + (parseInt(usercions) - Money);
                var Nums = lhtArr.length; //注数
                var params = { gameId: 1, turnNum: issue, totalNums: Nums, totalMoney: Money, ftime: psftime };
                for (var j = 0; j < lhtArr.length; j++) {
                    params["betBean[" + j + "][playId]"] = lhtArr[j]['playId'];
                    params["betBean[" + j + "][money]"] = lhtArr[j]['money'];
                }
                //投注
                this.xhr.xmlHttpPost("Data/postCode", params, this.userCookie, this.gameBetCallback.bind(this), this.httpFail);
                //改变显示用户金币信息
                var userinfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
                if (userinfo.coin > Money) {
                    userinfo.coin -= Money;
                }
                cc.sys.localStorage.setItem("userinfo", JSON.stringify(userinfo));
                var coinlable = cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label);
                coinlable.string = "$" + userinfo.coin;
            } else {
                if (!this.tanKuang.active) {
                    this.tanKuang.active = true;
                }
                this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = "您的金币不足,请充值后再押注！";
                this.tanKuang.getComponent(cc.Animation).play();
            }
        }
    },
    gameBetCallback: function gameBetCallback(res, header) {
        if (res.success) {
            var longzhu = this.longLable.string.slice(3);
            var huzhu = this.huLable.string.slice(3);
            var hezhu = this.heLable.string.slice(3);
            var yazhuInfo = { "longzhu": longzhu, "huzhu": huzhu, "hezhu": hezhu };
            var issuestr = this.issueLable.string.slice(0, 11) + this.userloginInfo.uid;
            cc.sys.localStorage.setItem(issuestr, JSON.stringify(yazhuInfo));
            this.totalMoneys = 0;
            this.betArr = [];
            this.mygoldSprite = [];
        }
        if (res.msg) {
            var tankuang = cc.find("Canvas/tankuangbg");
            var tankuangtxt = cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label);
            if (!tankuang.active) {
                tankuang.active = true;
            }
            tankuangtxt.string = res.msg;
            tankuang.getComponent(cc.Animation).play();
            //修改用户金币信息
            this.xhr.xmlHttpPost("game/getUserMsg.do", '', this.userCookie, this.changeUserinfo, this.httpFail);
        }
    },
    changeUserinfo: function changeUserinfo(res, header) {
        cc.log(res.balance);
        if (res.balance >= 0) {
            var userinfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
            userinfo.coin = res.balance;
            cc.sys.localStorage.setItem("userinfo", JSON.stringify(userinfo));
            var coinlable = cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label);
            coinlable.string = "$" + res.balance;
            cc.log(res.balance);
        }
    },
    controlBgAudio: function controlBgAudio(toggle) {
        if (toggle.isChecked) {
            this.audioSource.stop();
            for (var i = 0; i < this.otherAudios.length; i++) {
                this.otherAudios[i].mute = 1;
            }
        } else {
            this.audioSource.play();
            for (var _i = 0; _i < this.otherAudios.length; _i++) {
                this.otherAudios[_i].mute = 0;
            }
        }
    },
    showTankuang: function showTankuang(msg) {
        this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = msg;
        if (!this.tanKuang.active) {
            this.tanKuang.active = true;
        }
    },
    closeTankuang: function closeTankuang() {
        if (this.tanKuang.active) {
            this.tanKuang.active = false;
        }
    },
    showDisplayBoard: function showDisplayBoard() {
        this.displayBoard.active = true;
    },
    closeDisplayBoard: function closeDisplayBoard() {
        this.displayBoard.active = false;
    },
    closeAllBoard: function closeAllBoard() {
        if (this.ruleBoard.active) {
            this.ruleBoard.active = false;
        }
        if (this.trendBoard.active) {
            this.trendBoard.active = false;
        }
        if (this.stakeBoard.active) {
            this.stakeBoard.active = false;
        }
        if (this.editpassBoard.active) {
            this.editpassBoard.active = false;
        }
    },
    showRuleBoard: function showRuleBoard() {
        this.closeAllBoard();
        this.ruleBoard.active = true;
    },
    closeRuleBoard: function closeRuleBoard() {
        this.ruleBoard.active = false;
    },
    //开奖记录
    kjData: function kjData(res, header) {

        if (res.length > 0) {
            var databox = cc.find("Canvas/displayboard/trendboard/trendbg/trendScrollView/view/content");
            var datalist = cc.find("Canvas/displayboard/trendboard/trendbg/trendScrollView/view/content/datatable");
            var prekjdatalength = databox.children.length;
            var forlength = 0;
            if (prekjdatalength > 1) {
                forlength = res.length;
            } else {
                forlength = res.length - prekjdatalength - 1;
            }
            for (var i = forlength - 1; i >= 0; i--) {
                var copyNode = cc.instantiate(datalist);
                copyNode.getChildByName("qishu").getComponent(cc.Label).string = res[i]['turnNum'];
                copyNode.getChildByName("time").getComponent(cc.Label).string = res[i]['openTime'];
                copyNode.getChildByName("numberbox").children[0].getComponent(cc.Label).string = res[i]['n1'];
                copyNode.getChildByName("numberbox").children[1].getComponent(cc.Label).string = res[i]['n2'];
                copyNode.getChildByName("numberbox").children[2].getComponent(cc.Label).string = res[i]['n3'];
                copyNode.getChildByName("numberbox").children[3].getComponent(cc.Label).string = res[i]['n4'];
                copyNode.getChildByName("numberbox").children[4].getComponent(cc.Label).string = res[i]['n5'];
                var lhhTxt = res[i]['n1'] > res[i]['n5'] ? "<color=#ca0715>龙</color>" : res[i]['n1'] < res[i]['n5'] ? "<color=#2396ea>虎</color>" : "<color=#1fbe00>和</color>";
                copyNode.getChildByName("lhh").getComponent(cc.RichText).string = lhhTxt;
                copyNode.active = true;
                databox.addChild(copyNode);
            }
            cc.find("Canvas/tankuangbg").active = false;
        }
    },
    //投注记录
    stakeData: function stakeData(res, header) {
        if (res.data) {
            var databox = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content");
            var datalist = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content/dataitem");
            var stakedata = res.data;
            for (var i = 0; i < stakedata.length; i++) {
                var copyNode = cc.instantiate(datalist);
                //获得开奖号码，第一个和第五个数字
                copyNode.getChildByName("xiazhuqishu").getComponent(cc.Label).string = stakedata[i]['turnNum'];
                copyNode.getChildByName("xiazhushijian").getComponent(cc.Label).string = stakedata[i]['addTime'].slice(11);
                copyNode.getChildByName("money").getComponent(cc.RichText).string = "<color=#F0DC0C>" + stakedata[i]['betmoney'] + "</color>";
                copyNode.getChildByName("shuying").getComponent(cc.RichText).string = Global.issue == stakedata[i]['turnNum'] ? '--' : stakedata[i]['resultMoney'] < 0 ? "<color=#ca0715>" + stakedata[i]['resultMoney'] + "</color>" : "<color=#1fbe00>" + stakedata[i]['resultMoney'] + "</color>";
                var lhhTxt = stakedata[i]['playId'] == 1105 ? "<color=#ca0715>龙</color>" : stakedata[i]['playId'] == 1106 ? "<color=#2396ea>虎</color>" : "<color=#1fbe00>和</color>";
                copyNode.getChildByName("lhh").getComponent(cc.RichText).string = lhhTxt;
                copyNode.active = true;
                databox.addChild(copyNode);
            }
            cc.find("Canvas/tankuangbg").active = false;
        } else {
            cc.find("Canvas/tankuangbg").active = false;
        }
    },
    showTrendBoard: function showTrendBoard() {
        this.closeAllBoard();
        this.trendBoard.active = true;
        this.showTankuang('数据获取中……');
        this.xhr.xmlHttpGet("game/getHistory.do", { count: 30 }, this.userCookie, this.kjData, this.httpFail);
    },
    closeTrendBoard: function closeTrendBoard() {
        this.trendBoard.active = false;
        this.closeTankuang();
    },
    showStakeBoard: function showStakeBoard() {
        this.closeAllBoard();
        this.stakeBoard.active = true;
        this.showTankuang('数据获取中……');
        cc.log(this.userCookie);
        this.xhr.xmlHttpGet("report/getBetBills.do", '', this.userCookie, this.stakeData, this.httpFail);
    },
    closeStakeBoard: function closeStakeBoard() {
        var databox = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content");
        var childnodes = databox.children;
        for (var i = 0; i < childnodes.length; i++) {
            if (i > 1) {
                childnodes[i].destroy();
            }
        }
        this.stakeBoard.active = false;
        this.closeTankuang();
    },
    showEditpassBoard: function showEditpassBoard() {
        this.closeAllBoard();
        this.editpassBoard.active = true;
    },
    closeEditpassBoard: function closeEditpassBoard() {
        this.editpassBoard.active = false;
    },
    editPassClick: function editPassClick() {
        var oldpass = this.oldMima.string;
        var newpass = this.newMima.string;
        cc.log(oldpass);
        cc.log(newpass);
        var msg = '';
        if (oldpass == '' || newpass == '') {
            msg = "请输入密码";
        } else if (oldpass.length < 6 || newpass.length < 6) {
            msg = "密码长度不能小于6位";
        } else if (newpass == oldpass) {
            msg = "新密码不能和原密码相同";
        }

        if (msg != '') {
            cc.log(msg);
            this.showTankuang(msg);
            this.tanKuang.getComponent(cc.Animation).play();
        } else {
            this.xhr.xmlHttpPost('safe/setPasswd.do', { 'oldPwd': oldpass, 'newPwd': newpass }, this.userCookie, this.editSuccess, this.httpFail);
        }
    },
    editSuccess: function editSuccess(res, header) {
        if (res) {
            var tankuang = cc.find("Canvas/tankuangbg");
            var tankuangtxt = cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label);
            tankuangtxt.string = res['msg'];
            if (!tankuang.active) {
                tankuang.active = true;
            }
            tankuang.getComponent(cc.Animation).play();
        }
    },
    quitGame: function quitGame() {
        this.xhr.xmlHttpGet('user/logout', '', '', function (res) {
            cc.sys.localStorage.removeItem("userCookie");
            cc.director.loadScene("Startgame");
        }, function (res) {
            cc.log(res);
        });
    }
});

cc._RF.pop();