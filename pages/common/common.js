function toasterror(arg) {
  wx.showToast({
    title: arg.title,
    icon:'none',
    duration:arg.duration
  })
}
function toastinfo(arg) {
  wx.showToast({
    title: arg.title,
    icon: 'none',
    duration: arg.duration
  })
}
function toastwarn(arg) {
  wx.showToast({
    title: arg.title,
    icon: 'none',
    duration: arg.duration
  })
}
// 倒计时
function reTimer(countDown_time) {
  var that = this;
  var time = countDown_time.split(':')
  var mmm = parseInt(time[0])
  var sss = parseInt(time[1])
  var Interval = setInterval(function () {
    if (sss > 0) {
      sss--
    } else {
      console.log('时间到')
      clearInterval(Interval)
    }
    if (sss == 0 && mmm > 0) {
      mmm--
      sss = 59;
    }
    that.setData({
      leftSeconds: sss,
      leftMinutes: mmm,
    })
  }, 1000)
}

module.exports = {
  reTimer: reTimer,
  toasterror : toasterror,
  toastwarn : toastwarn,
  toastinfo : toastinfo
}

