//index.js
//获取应用实例
const app = getApp();
const token = app.token.token;
const localhost = app.localhost.localhost;
var pageSize = 20;
Page({
    data: {
        cons: '',
        link: false,
        width: 50,
        height: 50,
        nums: 20,
        indicator: false
    },
    //事件处理函数
    bindViewTap: function () {
        wx.makePhoneCall({
            phoneNumber: '13914937656'
        })
    },
    link: function () {
        wx.navigateTo({
            url: '../map/map',
        })
    },
    banner: function (e) {
        const that = this
        const index = e.target.dataset.index
        const banner_navlist = that.data.banner_nav.split(',')
        if (banner_navlist[index] !== '') {
            wx.navigateTo({
                url: '../banner/banner?id=' + banner_navlist[index],
            })
        } else {
            return false
        }

    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onShow: function () {
        const that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: localhost + '/seller/index',
            data: {
                token: token,
                pageSize: pageSize,
                active: true
            },
            success: function (data) {
                const BannerList = data.data.data[0].split(',');
                const cons_ = that.data.cons
                let cons_num = 0
                BannerList.pop();
                BannerList.length <= 1 ? that.setData({ indicator: false }) : that.setData({ indicator: true })
                const cons = [];
                const content = data.data.data[2].content;
                var thumbsup
                for (let i = 0; i < content.length; i++) {
                    var imgurl = content[i].indexImages.split(',')[0];
                    var con = content[i].pname;
                    var price = content[i].produtsTypes[0].discountPrice;
                    var id = content[i].id;
                    content[i].thumbsup !== null ? thumbsup = content[i].thumbsup : thumbsup = 0
                    cons.push(
                        {
                            imgurl: imgurl,
                            con: con,
                            price: price,
                            id: id,
                            token: token,
                            thumbsup: thumbsup
                        }
                    )
                }

                if (cons_ !== '' && cons_.length === cons.length) {
                    const cons_ = that.data.cons
                    cons.forEach(function (val, key) {
                        if (val.id === cons_[key].id) {
                            cons_num++
                        }
                    })
                }
                cons_num > 0 ? pageSize -= 20 :
                    that.setData({
                        BannerList: BannerList,
                        cons: cons,
                        banner_nav: data.data.data[3]
                    });
                pageSize <= 20 ? pageSize = 20 : ''
                setTimeout(function () {
                    wx.hideLoading()
                }, 500)
                wx.stopPullDownRefresh()
            }
        })
    },
    onPullDownRefresh: function () {
        pageSize += 20
        this.onShow()
    },

    onReachBottom: function () {
        pageSize += 20
        this.onShow()
    },
    onShareAppMessage: function () {
        return {
            title: '华涛车业',
            path: '/pages/index/index'
        }
    }
})