(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/startUi.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '36ef3ZpQqNEPo6j+q6wqY3q', 'startUi', __filename);
// Script/startUi.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        tanKuangNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.quitgame = 0; //大于等于2则退出游戏程序
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.back:
                this.quitgame++;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.back:
                if (this.quitgame >= 2) {
                    cc.director.end();
                } else {
                    if (!this.tanKuangNode.active) {
                        this.tanKuangNode.active = true;
                    }
                    this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string = "再按一次退出游戏";
                    this.tanKuangNode.getComponent(cc.Animation).play();
                    this.scheduleOnce(function () {
                        this.quitgame = 0;
                    }, 1);
                }
                break;
        }
    }
    //start () {},

    // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=startUi.js.map
        