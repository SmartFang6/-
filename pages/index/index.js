//index.js
//获取应用实例
import request from '../../utils/http'
const app = getApp()
Page({
  data: {
    movieList: [],
    img: 'http://film.glkjjt.com/'
  },
  getMoiveNew() {

  },
  toDeatil(e) {
    let datas = e.currentTarget.dataset.item;
    datas = encodeURIComponent(JSON.stringify(datas))
    wx.navigateTo({
      url: `/pages/home-detail/homeDeatil?itemData=${datas}`,
    })
  },
  onLoad: function () {
    let that = this;
    request({
      url: '/Movie/New'
    }).then(res => {
      that.setData({
        movieList: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
})