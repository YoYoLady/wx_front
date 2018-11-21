

Page({

onShow: function () {

},

action: function () {

  wx.redirectTo({
    url: '../multiChoiceDetail/multiChoiceDetail'
  });
},

answerCard: function () {
  wx.navigateTo({
    url: '../answerCard/answerCard'
  });
}
})