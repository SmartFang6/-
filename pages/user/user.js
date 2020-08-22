// pages/user/user.js
import request from '../../utils/http'

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  reg() {
    let that = this;
    wx.getSetting({
      success(resu) {
        if (resu.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var city = userInfo.city
              that.login(nickName, city)
            },
            fail(err) {
              wx.showToast({
                title: '请先获取用户信息',
              })
            }
          })
        }
      }
    })

  },
  login(nickName, city) { //登录
    let that = this;
    request({
      url: '/Login',
      data: {
        UserName: nickName,
        Password: city
      },
      method: 'post'
    }).then(res => {
      if (res.statusCode == 200) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 500,
          mask: true
        });
        wx.setStorageSync('tokenid', res.data)
      } else {
        that.regs(nickName, city)
      }
    }).catch(err => {
      console.log(err);
    })
  },
  regs(nickName, city) { //注册
    let that = this;
    request({
      url: '/Register',
      data: {
        UserName: nickName,
        Password: city
      },
      method: 'post'
    }).then(res => {
      console.log(res);
      that.login(nickName, city)
    }).catch(err => {
      console.log(err);
    })
  },
  loginOut(){ //退出登录
    wx.removeStorageSync('tokenid');
    wx.showToast({
      title: '退出成功！',
      mask:true,
      duration:1000
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})