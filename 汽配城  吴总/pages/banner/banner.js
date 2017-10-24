// details.js
const app = getApp();
const token = app.token.token;
const localhost = app.localhost.localhost;
let pageSize = 10;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stu: true,
        pin_stu: true,
        inp_stu: true,
        auto_focus: false,
        show_pin: false,
        nav: [
            "详情",
            "评论"
        ]
    },
    show: function () {
        let stu = this.data.stu;
        const stu_ = !stu;
        this.setData({
            stu: stu_
        })
    },
    cover_show: function () {
        let inp_stu = this.data.inp_stu;
        const inp_stu_ = !inp_stu;
        this.setData({
            inp_stu: inp_stu_
        })
    },
    show_pin: function () {
        let inp_stu = this.data.inp_stu;
        const inp_stu_ = !inp_stu;
        let auto_focus = this.data.auto_focus;
        const auto_focus_ = !auto_focus;
        this.setData({
            inp_stu: inp_stu_,
            auto_focus: auto_focus_
        })
    },
    send: function (e) {
        const comments = e.detail.value
        const that = this;
        const openid = wx.getStorageSync('openid')
        app.getUserInfo(function (res) {

            wx.request({
                url: localhost + '/basic/comments/save',
                data: {
                    proId: that.data.pid,
                    wxname: res.nickName,
                    wxphoto: res.avatarUrl,
                    comments: comments,
                    openId: openid
                },
                success: function (res) {
                    let stu = that.data.stu;
                    const stu_ = !stu;
                    that.setData({
                        stu: stu_
                    })
                    if (res.data.message === "操作成功") {
                        let inp_stu = that.data.inp_stu;
                        const inp_stu_ = !inp_stu;
                        that.setData({
                            inp_stu: inp_stu_
                        })
                        that.onShow()
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            image: '../../images/fail.png',
                            duration: 1000
                        })
                    }
                }
            })
        })
    },
    thumbsup: function (res) {
        const that = this;
        const openid = wx.getStorageSync('openid');
        wx.showLoading({
            title: '',
        })
        wx.request({
            url: localhost + '/seller/pro/thumbs-up',
            data: {
                proId: that.data.pid,
                openId: openid
            },
            success: function (res) {
                wx.hideLoading();
                let stu = that.data.stu;
                const stu_ = !stu;
                res.data.message === "操作成功" ? wx.showToast({
                    icon: 'success',
                    duration: 1000
                }) : wx.showToast({
                    title: res.data.message,
                    image: '../../images/fail.png',
                    duration: 1000
                });
                that.setData({
                    stu: stu_
                })
            }
        })
    },
    link: function () {
        wx.showModal({
            title: '微信号',
            content: '点击确定复制微信号 WGF498694059 加好友联系吧！',
            success: function (res) {
                if (res.confirm) {
                    if (wx.setClipboardData) {
                        wx.setClipboardData({
                            data: 'WGF498694059',
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
    scroll_img: function () {
        if (!wx.pageScrollTo) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
            });
            return false
        }
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    scroll: function (e) {
        const that = this;
        const index = e.target.dataset.index;
        if (!wx.pageScrollTo) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
            });
            return false
        }
        if (index === 0) {
            that.getRect('.logo', function (data) {
                wx.pageScrollTo({
                    scrollTop: data - 100
                })
            });
        } else {
            that.getRect('.images', function (data) {
                wx.pageScrollTo({
                    scrollTop: data + 700
                })
            });
        }
    },
    getRect: function (dom, cb) {
        wx.createSelectorQuery().select(dom).boundingClientRect(function (rect) {
            cb(rect.height)      // 节点的上边界坐标
        }).exec()
    },
    scroll_home: function () {
        wx.navigateBack({
            url: 'index'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            pid: options.id
        })
        var that = this;
        const openid = wx.getStorageSync('openid');
        wx.request({
            url: localhost + '/seller/pro/findOne',
            data: {
                pcode: options.id,
                token: token
            },
            success: function (res) {
                const content = res.data.data;
                const produtsTypes = content.produtsTypes;
                for (let q = produtsTypes.length - 1; q >= 0; q--) {
                    if (produtsTypes[q].amount === 0 || produtsTypes[q].active === false) {
                        produtsTypes.splice(q, 1);
                    }
                }
                const size = [];
                const color = [];
                let kucun = 0;
                let price = 0;
                const img = content.images.split(',');
                const imgs = content.indexImages.split(',');
                const con = content.pname;
                const priceNew = content.produtsTypes[0].discountPrice;
                imgs.length <= 1 ? that.setData({ indicatorDots: false }) : '';
                that.setData({
                    imgs: imgs,
                    con: con,
                    price: priceNew,
                    img: img,
                })
                wx.hideLoading();

            }
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const that = this;
        const openid = wx.getStorageSync('openid');

        wx.request({
            url: localhost + '/basic/comments/list',
            data: {
                proId: that.data.pid,
                pageSize: pageSize,
                openId: openid,
                token: token
            },
            success: function (res) {
                const content = res.data.data.content;

                if (content.length === 0) {
                    that.setData({
                        show_pin: true
                    })
                }
                const con = [];
                for (let i = 0; i < content.length; i++) {
                    con.push({
                        img: content[i].wxphoto,
                        nickname: content[i].wxname,
                        judge_con: content[i].comments,
                        createDate: content[i].createDate
                    })
                }
                that.setData({
                    cons: con
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        const title = this.data.con;
        const that = this;
        return {
            title: "华涛车业" + " " + title,
            path: '/pages/details/details?id=' + that.data.pid
        }
    }
})