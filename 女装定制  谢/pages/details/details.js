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
        wx.request({
            url: localhost + '/seller/pro/thumbs-up',
            data: {
                proId: that.data.pid,
                openId: openid
            },
            success: function (res) {
                let stu = that.data.stu;
                const stu_ = !stu;
                that.setData({
                    stu: stu_
                })
                res.data.message === "操作成功" ? wx.showToast({
                    icon: 'success',
                    duration: 1000
                }) : wx.showToast({
                    title: '已经赞过了呦！',
                    image: '../../images/fail.png',
                    duration: 1000
                })
            }
        })
    },
    link: function () {
        if (!wx.makePhoneCall) {
            wx.showModal({
                title: '提示',
                content: '添加 xzq67777 为好友购买！',
                success: function (res) {
                    if (res.confirm) {
                        wx.setClipboardData({
                            data: 'bqrz9888',
                            success: function () {
                                wx.showModal({
                                    title: '提示',
                                    content: '操作成功！',
                                })
                            }
                        })
                    }
                }
            })
        } else {
            wx.makePhoneCall({
                phoneNumber: '13375179823',
                fail: function () {
                    wx.showModal({
                        title: '提示',
                        content: '添加 bqrz9888 为好友购买！',
                        success: function (res) {
                            if (res.confirm) {
                                wx.setClipboardData({
                                    data: 'bqrz9888',
                                    success: function () {
                                        wx.showModal({
                                            title: '提示',
                                            content: '操作成功！',
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }

    },
    scroll_img: function () {
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
                pid: options.id,
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
                const priceNew = content.produtsTypes[0].priceNew;
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
                openId: openid
            },
            success: function (res) {
                const content = res.data.data.content;
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
        const pid = this.data.pid;
        const cons = this.data.con;
        return {
            title: cons,
            path: '/pages/details/details?id=' + pid
        }
    }
})