// pages/order-seat/orederSeat.js
import request from '../../utils/http'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    seatData: {},
    m: new Date().getMonth() + 1,
    d: new Date().getDate(),
    seatarr: [],
    checkedSeat: [],
    orderPrice: "",
  },
  checkedSeat: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      id: options.id,
    });
    let that = this;
    request({
      url: `/Movie/ShowsDetail?TimeID=${options.id}`
    }).then(res => {
      that.setData({
        seatData: res.data,
      });
    }).catch(err => {
      console.log(err);
    })
    let seatarr = [];
    for (let i = 0; i < 98; i++) {
      let item = {
        id: i,
        status: "",
      };
      seatarr[i] = item;
      this.setData({
        seatarr,
      });
    }
    this.getSeated();
  },
  //选择座位
  checkseat(e) {
    let i = e.currentTarget.dataset.index;
    if (this.checkedSeat.length > 3) {
      wx.showToast({
        title: "最多购买4张",
        icon: "loading",
        duration: 500,
      });
      return;
    } else {
      if (this.data.seatarr[i].status == "") {
        let temp = `seatarr[${i}].status`;
        let col = (i % 7) + 1;
        let row = Math.floor(i / 7 + 1);
        this.checkedSeat.push({
          row,
          col,
          id: i,
        });
        this.setData({
          [temp]: "active",
          checkedSeat: this.checkedSeat,
          orderPrice: this.data.seatData.Price * this.checkedSeat.length,
        });
      }
    }
  },
  //已选座位
  getSeated() {
    let that = this;
    request({
      url: `/Movie/Seat?TimeID=${this.data.id}`,
      header: {
        authorization: "basic " + wx.getStorageSync("tokenid"),
      }
    }).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        let index = (res.data[i].Row - 1) * 7 + res.data[i].Col - 1;
        let temp = `seatarr[${index}].status`;
        that.setData({
          [temp]: "active-selled",
        });
      }
    }).catch(err => {
      console.log(err);
    })
  },
  //删除座位
  del(e) {
    let {
      index,
      id
    } = e.currentTarget.dataset;
    this.checkedSeat.splice(index, 1);
    let temp = `seatarr[${id}].status`;
    this.setData({
      checkedSeat: this.checkedSeat,
      [temp]: "",
      orderPrice: this.data.seatData.Price * this.checkedSeat.length,
    });
  },
  //确认选座
  checkedSeats() {
    if (this.checkedSeat.length > 0) {
      request({
        url: '/Orders',
        method: 'post',
        data: {
          TimeID: this.data.id,
          SeatList: this.checkedSeat
        },
        header: {
          authorization: "basic " + wx.getStorageSync("tokenid")
        }
      }).then(res => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '下单成功！',
            duration: 1000
          })
          wx.reLaunch({
            url: '/pages/order/order',
          })
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      wx.showToast({
        title: "请先选择座位",
        mask: true,
        duration: 500,
      });
    }
  }
});