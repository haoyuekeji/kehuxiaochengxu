//index.js
//获取应用实例
var app = getApp();
var cons=require("../../unit/data.js");
Page({
  data: {
        cons:cons.cons,
        link:false,
        width: 50,
        height: 50,
  },
  //事件处理函数
  bindViewTap: function() {
      wx.makePhoneCall({
          phoneNumber: '13375170867'
      })
  },
  link:function(){
    wx.showModal({
        title: '微信号',
        content: '点击确定复制微信号 xzq67777 加好友联系吧！',
        success:function(res){
            if (res.confirm) {
                if (wx.setClipboardData) {
                    wx.setClipboardData({
                        data: 'xzq67777',
                        success: function (res) {
                            wx.showModal({
                                title: '提示',
                                content: '复制成功！',
                            })
                        }
                    })
                } else {
                    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                }
            } 
        }
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
        title: '女装私人定制',
        path: '/pages/index/index'
    }
  }
})