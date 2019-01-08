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

module.exports.toasterror = toasterror
module.exports.toastwarn = toastwarn
module.exports.toastinfo = toastinfo