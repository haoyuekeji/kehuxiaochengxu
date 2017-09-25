// details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },
    link:function () {
        wx.makePhoneCall({
            phoneNumber: '13375170867'
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        imgurl:options.imgurl,
        price:options.price,
        con:options.con
    })
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
      const cons = this.data.con;
      const ImgUrl = this.data.imgurl;
      const Price = this.data.price;
      return {
          title: cons,
          path: '/pages/details/details?imgurl=' + ImgUrl + '&&con=' + cons + '&&price=' + Price
      }
  }
})