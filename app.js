//app.js

App({
  onLaunch: function () {


    this.globalData = {}
  },
  onHide(){
    wx.removeStorageSync('tokenid')
  }
})