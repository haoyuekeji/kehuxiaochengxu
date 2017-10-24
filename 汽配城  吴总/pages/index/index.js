//index.js
//获取应用实例
const app = getApp();
const token = app.token.token;
const localhost = app.localhost.localhost;
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
        wx.request({
            url: localhost + '/seller/index',
            data: {
                token: token,
                pageSize: 20,
                active: true
            },
            success: function (data) {
                const BannerList = data.data.data[0].split(',');
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
                that.setData({
                    BannerList: BannerList,
                    cons: cons,
                    banner_nav: data.data.data[3]
                });
            }
        })
    },
    onShareAppMessage: function () {
        return {
            title: '华涛车业',
            path: '/pages/index/index'
        }
    }
})