var wxCharts = require('../../pages/charts/wxcharts.js');
var app = getApp();
var radarChart = null;

var app = getApp();
var that;
const common = require('../../pages/common/common.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    showAll: false,
    holland: false,
    hollandresult: '',
    hollanddes: '',
    mb: false,
    mbresult: '',
    mbarr: [],
    gatb: false,
    gatbresult: '',
    gatbArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.data.showAll = options.showall;

    that.setData({
      showAll: that.data.showAll
    });

    if (options.showall == 'true') {
      //从服务器获取评测结果
      that.setData({
        loading: true
      });
      that.getEvaluateResultFromServer();
    } else {
      if (options.papertype === 'holland') {
        that.getHollandResult(JSON.parse(options.result));
      }
      if (options.papertype === 'mbti') {
        that.getMBTIResult(JSON.parse(options.result));
      }
      if (options.papertype === 'gatb') {
        that.getGatbResult(JSON.parse(options.result));
      }
    }
  },
  /**
   * 从服务器获取评测结果
   * 
   */
  getEvaluateResultFromServer() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getEvaluateResult',
      // 传给云函数的参数
      data: {}
    }).then(res => {
      console.log(res);
      that.setData({
        loading: false
      });
      //展示结果
      if (res.result.holland != undefined || res.result.holland != null) {
        that.getHollandResult(res.result.holland);
      }
      if (res.result.mbti != undefined || res.result.mati != null) {
        that.getMBTIResult(res.result.mbti);
      }
      if (res.result.gatb != undefined || res.result.gatb != null) {
        that.getGatbResult(res.result.gatb);
      }
    }).catch(res => {
      console.log(res);
      that.setData({
        loading: false
      });
      common.toasterror({
        title: '获取评测报告失败',
        duration: 1000
      });
    })

  },

  onReady: function(e) {

  },

  /**
   * 获取holland的信息
   * 
   */
  getHollandResult(result) {
    var resultCode = result.result_code;
    const db = wx.cloud.database()
    const _ = db.command
    var desc;
    that.setData({
      loading: true
    });

    db.collection('answer_bank_test').where({
      answer_code: _.eq(resultCode)
    }).get().then(res => {
      console.log(res.data)
      if (res.data.length == 0) {
        common.toasterror({
          title: '获取评测结果失败 找不到符合 ' + resultCode + ' 职业',
          duration: 1000
        });
      } else {
        desc = res.data[0].answer_desc
      }
      that.setData({
        loading: false,
        holland: true,
        hollanddes: desc,
        hollandresult: resultCode,
      });
      that.hollanChart(result);
    }).catch(res => {
      console.log(res)
      that.setData({
        loading: false,
        hollanddes: '',
        hollandresult: '',
      });
      common.toasterror({
        title: '获取评测职业失败',
        duration: 1000
      });
    });

  },

  hollanChart(result) {
    try {
      var windowWidth = 400;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      var hollandCat=[];
      var hollandScopeCat = [];
      result.user_answer_gather.forEach((data)=>{
        hollandCat.push(data.factor);
        hollandScopeCat.push(data.scopes);
      });
  
     
      radarChart = new wxCharts({
        canvasId: 'radarCanvas',
        type: 'radar',
        categories: hollandCat,
        series: [{
          name: 'Holland',
          data: hollandScopeCat
        }],
        width: windowWidth,
        height: 400,
        extra: {
          radar: {
            max: 70
          }
        }
      });
    } catch (error) {
      console.log(error);

    }

  },
  getMBTIResult(result) {


    var arr = [{}, {}, {}, {}];


    result.user_answer_gather.forEach(function(e) {
      if (e.factor == 'E') {
        arr[0].lefttxt = '外向(E)'
        arr[0].leftcount = e.count;
        arr[0].leftper = '0%'
      }
      if (e.factor == 'I') {
        arr[0].righttxt = '(I)内向'
        arr[0].rightcount = e.count;
        arr[0].rightper = '0%'
      }

      if (e.factor == 'S') {
        arr[1].lefttxt = '实感(S)'
        arr[1].leftcount = e.count;
        arr[1].leftper = '0%'
      }

      if (e.factor == 'N') {
        arr[1].righttxt = '(N)直觉'
        arr[1].rightcount = e.count;
        arr[1].rightper = '0%'
      }

      if (e.factor == 'T') {
        arr[2].lefttxt = '思考(T)'
        arr[2].leftcount = e.count;
        arr[2].leftper = '0%'
      }
      if (e.factor == 'F') {
        arr[2].righttxt = '(F)情感'
        arr[2].rightcount = e.count;
        arr[2].rightper = '0%'
      }

      if (e.factor == 'J') {
        arr[3].lefttxt = '判断(J)'
        arr[3].leftcount = e.count;
        arr[3].leftper = '0%'
      }
      if (e.factor == 'P') {
        arr[3].righttxt = '(P)知觉'
        arr[3].rightcount = e.count;
        arr[3].rightper = '0%'
      }

    });

    arr.forEach(function(e) {
      e.leftper = (((e.leftcount) * 100) / (e.leftcount + e.rightcount)).toFixed(2) + '%';
      e.rightper = (((e.rightcount) * 100) / (e.leftcount + e.rightcount)).toFixed(2) + '%';
    });

    that.setData({
      mb: true,
      mbarr: arr,
      mbresult: result.result_code
    });


  },

  getGatbResult(result) {
    that.setData({
      gatb: true,
      gatbresult: result.result_code
    });


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})