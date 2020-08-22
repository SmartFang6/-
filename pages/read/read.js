// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    txt: '',
  },
  chooseBook() {
    let that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['txt', 'pdf'],
      success(res) {
        console.log(res)
        const books = res.tempFiles
        that.setData({
          books
        })
        that.readBook(res)
      }
    })
  },
  readBook(res) {
    const that = this;
    wx.getFileSystemManager().readFile({
      filePath: res.tempFiles[0].path,
      encoding: 'utf8',
      success(r) {
        console.log(r)
        that.setData({
          txt: r.data
        })
      }
    })
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