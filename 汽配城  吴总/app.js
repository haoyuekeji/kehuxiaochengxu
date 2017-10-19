//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },

    getUserInfo: function (cb) {
        var that = this;
        //店铺浏览量
        wx.request({
            url: that.localhost.localhost + '/dictionary/addViews',
            data: {
                sellerId: that.token.token
            }
        })
        wx.login({
            //获取code
            success: function (res) {
                //获取openID
                wx.request({
                    url: that.localhost.localhost + '/customer/getSessionKey',
                    data: {
                        appId: that.appid.appid,
                        code: res.code,
                        secret: "e2973dbe9e60a81d80e2bfc3e9d2549f"
                    },
                    success: function (res) {
                        const openid = JSON.parse(res.data.data).openid;
                        //客户首次访问店铺
                        wx.request({
                            url: that.localhost.localhost + '/customer/loginOrReg',
                            data: {
                                openId: openid,
                                sellerId: that.token.token
                            }
                        })
                        //店铺访客数
                        wx.request({
                            url: that.localhost.localhost + '/dictionary/addVisitors',
                            data: {
                                openId: openid,
                                sellerId: that.token.token
                            }
                        })
                        wx.setStorageSync("openid", openid)
                    }
                })
            }
        })
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null,
    },
    localhost: {
        localhost: 'https://www.cslapp.com'
    },
    token: {
        token: 4
    },
    appid: {
        appid: 'wx0ba455a71329361b'

    }
})
