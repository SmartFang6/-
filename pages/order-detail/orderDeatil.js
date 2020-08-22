// pages/order-detail/orderDeatil.js
import request from '../../utils/http'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    rate: "",
    dataList: [],
  },
  toSeat(e) {
    wx.navigateTo({
      url: `/pages/order-seat/orederSeat?id=${e.currentTarget.dataset.id}&name=${this.data.name}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      name: options.name,
      rate: options.rate,
      id: options.id,
    });
    let ids = options.id;
    let that = this;
    request({
      url: `/Movie/Shows?MovieID=${ids}`
    }).then(res => {
      that.setData({
        dataList: res.data,
      });
    })
  }
});