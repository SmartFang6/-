// pages/order/order.js
import request from '../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    imgUrl: 'http://film.glkjjt.com/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder()
  },
  // 获取订单信息
  getOrder() {
    if (wx.getStorageSync('tokenid')) {
      const that = this;
      request({
        url: '/Orders',
        header: {
          authorization: "basic " + wx.getStorageSync('tokenid')
        }
      }).then(res => {
        console.log(res)
        that.setData({
          orderList: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请先登陆！',
        mask: true,
        duration: 1000
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1000)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getOrder()
    wx.stopPullDownRefresh();
  }
})