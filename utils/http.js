export default function request (options){
  const baseUrl = "http://film.glkjjt.com/api";
  wx.showLoading({
    title: '数据加载中ing',
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl+options.url,
      data:options.data || {},
      method:options.method || "GET",
      header:options.header || {},
      dataType:options.dataType || 'json',
      success:resolve,
      fail:reject,
      complete:()=>{
        wx.hideLoading()
      }
    })
  })
}