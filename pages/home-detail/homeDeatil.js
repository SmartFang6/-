// pages/home-detail/homeDeatil.js
import {
  starts
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    img: 'http://film.glkjjt.com/',
    startList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('tokenid')) {
      let datas = JSON.parse(decodeURIComponent(options.itemData))
      this.setData({
        detailData: datas,
        startList: starts(datas.Rate)
      })
      wx.setNavigationBarTitle({
        title: this.data.detailData.Name,
      })
    } else {
      wx.showToast({
        title: '请先登陆！',
        mask: true,
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/user/user',
        })
      }, 1000)
    }
    // this.setData({
    //   startList:starts(this.detailData.Rate)
    // })
  },
  toBuy() {
    wx.navigateTo({
      url: `/pages/order-detail/orderDeatil?id=${this.data.detailData.MovieID}&name=${this.data.detailData.Name}&rate=${this.data.detailData.Rate}`,
    })
  }
})