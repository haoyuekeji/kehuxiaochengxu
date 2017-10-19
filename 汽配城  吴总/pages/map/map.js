Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [
            {
                id: 0,
                latitude: 31.634670,
                longitude: 120.803180,
                width: 50,
                height: 30,
                title: '华涛车业美容'
            }
        ]
    },
    link: function () {
        if (!wx.makePhoneCall) {
            wx.showModal({
                title: '提示',
                content: '您的微信版本过低，无法使用该功能！点击确定复制手机号码联系！',
                success: function (res) {
                    if (res.confirm) {
                        wx.setClipboardData({
                            data: '13773036787',
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
                phoneNumber: '13773036787',
                fail: function () {
                    wx.showModal({
                        title: '提示',
                        content: '点击确定复制手机号联系！',
                        success: function (res) {
                            if (res.confirm) {
                                wx.setClipboardData({
                                    data: '13773036787',
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    }
})