var papertype;
var that;
var questions = [];
var factorStatics = new Map();
var isGettingPaper = false;
var app = getApp();

var newQueBody;
var statics = {
  factor: '',
  count: 0,
  scopes: 0
}
const common = require('../../pages/common/common.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    show: false,
    editque: false,
    curQuestion: {
      body: '认为公认的解决方法是最好的',
      options: [{
        op: '1',
        content: '非常不像我'
      }, {
        op: '2',
        content: '非常不像我'
      }, {
        op: '3',
        content: '非常不像我'
      }, {
        op: '4',
        content: '非常不像我'
      }],
    },
    totalNum: 0,
    curNum: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    that = this;
    //that.test();
    papertype = options.papertype;
    //获取第一页题目
    that.getPagerPage({
      papertype: papertype,
      queIndex: 1,
      size: 20,
    });
    wx.setNavigationBarTitle({
      title: papertype.toUpperCase(),
    })

 
  },

  onUnload: function() {
    papertype = '';
    that = null;
    questions = [];
    factorStatics = new Map();
    isGettingPaper = false;
  },
  /**
   * 获取试卷的start位置开始的size个数题目，
   * 试卷题目是从1开始的
   * {
   * prop:{
   * totoalNum:100,
   *  factorArr:[
   *    'fatorA','fatorB','fatorC','fatorS',
   *  ]
   * 
   * },
   * pager:[{
   * _id: 'avcecdsacasd',
   * body:'这是一个题目描述',
   * optins:'A:选项1;B:选项2;C:选项3;D:选项4;',
   * weights:'A:J,1;B:P,1;C:H,1;D:L,1',
   * queIndex:10
   * }]
   * 
   * }
   * 
   * 题目格式处理为
   * {
  *    body: '',
  *    options: [{
  *     op: '',
  *     content: '',
  *   }],
  *   weightMap: [ ],
  *   queIndex:1000,
       selected:op
   * }
   * 
   * 
   * 
   */
  getPagerPage: function(options) {
    isGettingPaper = true;
    // 调用云函数存入user info
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getPaperByType',
      // 传给云函数的参数
      data: {
        papertype: options.papertype,
        queIndex: options.queIndex,
        size: options.size,
      }
    }).then(res => {
      console.log('getPaperByType');
      console.log(res);
      isGettingPaper = false;

      that.handlePaperResult(options, res.result.pager);

      if (options.queIndex == 1) {
        that.handlePaperPro(res.result.prop);
        that.setData({
          loading: false,
          show: true,
          totalNum: that.data.totalNum,
          curNum: 0,
          curQuestion: questions[0]
        });
      }

    }).catch(res => {
      console.log(res);
      isGettingPaper = false;
      that.setData({
        loading: false,
        show: false
      });

      //如果当前的题目是最后一题,或者是第一次
      if ((that.data.curNum >= questions.length) || options.queIndex == 1) {
        common.toasterror({
          title: '获取用户题目失败',
          duration: 1000
        });
      }

    });

  },

  /**
   * 处理试卷的考核因素
   * 试卷的总题目数
   * 
   */
  handlePaperPro(paperProp) {
    var j;
    var len;
    //考核因素
    for (j = 0, len = paperProp.factorArr.length; j < len; j++) {
      var data = {
        facotor: paperProp.factorArr[j].factor,
        facotordes: paperProp.factorArr[j].des,
        count: 0,
        scopes: 0
      };
      factorStatics.set(paperProp.factorArr[j].factor, data);
    }
    //题目总数
    that.data.totalNum = paperProp.totalNum;
  },

  /**
   * 把新题目加到题目列表里
   * 处理题目选项对考察因素的权重
   * {
   * body:'这是一个题目描述',
   * optins:'A:选项1;B:选项2;C:选项3;D:选项4;',
   * weights:'A:J,1;B:P,1;C:H,1;D:L,1',
   * queIndex:10
   * }
   * 处理为
   * {
   *    body: '',
   *    options: [{
   *     op: '',
   *     content: '',
   *   }],
   *   weightsMap: null,
   *   queIndex:1000
   *   
   * }
   * 
   */
  handlePaperResult(pageData, paperResult) {
    var length = questions.length;
    var len;
    var j;
    for (j = 0, len = paperResult.length; j < len; j++) {
      questions.push({
        _id: paperResult[j]._id,
        body: paperResult[j].body,
        options: that.genOptions(paperResult[j].options),
        weightsMap: that.genWeights(paperResult[j].weights),
        queIndex: paperResult[j].queIndex
      });
    }

    //不是第一次获取，
    if (length != 0 && that.curNum == (length - 1) && (that.curNum + 1) < (questions.length - 1)) {
      that.setData({
        curQuestion: questions[that.curNum + 1],
        curNum: that.curNum + 1
      });
    }

  },

  /*
   * 解析权重列表:
   *  A:J,1;B:P,1;C:H,1;D:L,1
   * 
   */
  genWeights: function(weightStr) {
    var weights = weightStr.split(';')
    var ret = new Map();
    weights.forEach((data) => {
      //A: J, 1;
      var arr = data.split(':')
      if (arr.length == 2) {
        var factors = arr[1].split(',');
        var factor = {
          "factor": factors[0],
          "add": parseInt(factors[1])
        }
        ret.set(arr[0], factor);
      }
    });
    return ret;
  },
  /*
   * 解析选项列表:
   *
   *  1:非常不像我;2:中等程度地不像我;3:有些像我又有些不像我;4:中等程度地像我;5:非常像我
   * 
   */
  genOptions: function(optionsStr) {
    var curOptions = optionsStr.split(';')
    var ret = []
    curOptions.forEach((data) => {
      var arr = data.split(':')
      if (arr.length == 2) {
        var one = {
          "op": arr[0],
          "content": arr[1]
        }
        ret.push(one);
      }
    });
    return ret;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 选项点击响应
   * 
   */
  choseOption: function(res) {
    var item = res.currentTarget.dataset.item
    console.log("选择：" + that.data.curNum);
    console.log(item);
    questions[that.data.curNum].selected = item.op;

    //已经答完所有题目
    if (that.data.curNum == (that.data.totalNum - 1)) {
      that.accumulate();
      return;
    }

    //如果还没到现有的题目的最后
    if (that.data.curNum < (questions.length - 1)) {
      that.setData({
        
        curQuestion: questions[that.data.curNum + 1],
        curNum: (that.data.curNum + 1)
      });
    }

    //如果还没全部获取到所有题目
    if (questions.length < that.data.totalNum) {
      if (that.data.curNum > (questions.length - 5) && !isGettingPaper) {

        if (that.data.curNum == (questions.length - 1) && !isGettingPaper) {
          that.setData({
            loading: true
          });
        }


        if (!isGettingPaper) {
          that.getPagerPage({
            papertype: papertype,
            queIndex: questions[questions.length - 1].queIndex + 1,
            size: 20
          });
        }

      }

    }



  },
  /**
   * 
   * 计算评估结果
   * 
   * 每个题目的选项对因素的影响
   * 
   * 
   * 
   */
  accumulate() {
    var userAnswers = [];

    questions.forEach((ques) => {
      var option = ques.selected;
      //选项对因素影响的{ factor": factors[0],
      //"add":0}


      factorStatics.get(ques.weightsMap.get(option).factor).count++;
      factorStatics.get(ques.weightsMap.get(option).factor).scopes = factorStatics.get(ques.weightsMap.get(option).factor).scopes + ques.weightsMap.get(option).add;

      var answoer = {
        question_id: ques.queIndex,
        option: ques.selected
      };
      userAnswers.push(answoer);

    });


    //得到的结果
    var resultCode = '';
    var factorsResult = [];
    for (var x of factorStatics) {
      factorsResult.push({
        factor: x[0],
        count: x[1].count,
        scopes: x[1].scopes
      });
    }

    switch (papertype) {

      //1、根据每题选项赋分，1记一分，5记5分
      //按得分从高到低的顺序，选择得分最高的三项，并记下相应的字母，就是测试结果。
      case 'holland':
        factorsResult = factorsResult.sort(function(a, b) {
          return b.scopes - a.scopes;
        })
        resultCode = factorsResult[0].factor + factorsResult[1].factor + factorsResult[2].factor;
        break;

        // 性格倾向 
        //E-I, S-N, T-F, J-P，结对性格中得分高的为当前结对的倾向
      case 'mbti':
        if (factorStatics.get('E').scopes > factorStatics.get('I').scopes) {
          resultCode = resultCode + 'E';
        } else {
          resultCode = resultCode + 'I';
        }
        if (factorStatics.get('S').scopes > factorStatics.get('N').scopes) {
          resultCode = resultCode + 'S';
        } else {
          resultCode = resultCode + 'N';
        }
        if (factorStatics.get('T').scopes > factorStatics.get('F').scopes) {
          resultCode = resultCode + 'T';
        } else {
          resultCode = resultCode + 'F';
        }
        if (factorStatics.get('J').scopes > factorStatics.get('P').scopes) {
          resultCode = resultCode + 'J';
        } else {
          resultCode = resultCode + 'P';
        }
        break;
        //测试共九大题将得分相加后除以数目，则为大题的得分（小数点处四舍五入）
      case 'gatb':
        factorsResult.forEach(function(e) {
          resultCode = resultCode + e.factor + ':' + (e.scopes / e.count) + ';';
        })
        break;
    }

    // 调用云函数存入user answer

    that.setData({
      loading: true
    });
    wx.cloud.callFunction({
      // 云函数名称
      name: 'newUpdateUserAnswer',
      // 传给云函数的参数
      data: {
        type: papertype,
        result_code: resultCode,
        user_answer_gather: factorsResult,
        user_answer_detail: userAnswers
      }
    }).then(res => {
      that.setData({
        loading: false
      });
      console.log("call upload user answer success!")
      var eResult = {
        result_code: resultCode,
        user_answer_gather: factorsResult,
        user_answer_detail: userAnswers
      }

      wx.redirectTo({
        url: '../paperresult/paperresult?result=' + JSON.stringify(eResult) +
          '&papertype=' + papertype + '&showall=false'
      });
    }).catch(res => {
      that.setData({
        loading: false
      });
      common.toasterror({
        title: '存储用户答案失败',
        duration: 1000
      });

    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bodyTap(e) {
    if (app.globalData.userData.canModifyPager) {
      that.setData({
        editque: true
      });
    }
  },
  cancel(e) {
    that.setData({
      editque: false
    });
  },
  deleteQue(e) {
    if (app.globalData.userData.canModifyPager) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updateQueBody',
        // 传给云函数的参数
        data: {
          _id: that.data.curQuestion._id,
          quetype: papertype,
          is_valid: 0,
          type: 'del'
        }
      }).then(res => {
        that.setData({
          loading: false
        });
        common.toasterror({
          title: '删除成功',
          duration: 1000
        });
      }).catch(error => {
        console.log(error);
        that.setData({
          loading: false
        });
        common.toasterror({
          title: '删除失败 ' + error,
          duration: 1000
        });

      });
    }

  },
  newQueInput(e) {
    if (app.globalData.userData.canModifyPager) {
      newQueBody = e.detail.value;
    }

  },
  confirmModify(e) {

    that.setData({
      loading: true
    });

    if (app.globalData.userData.canModifyPager) {
      if (newQueBody.length == 0) {
        common.toasterror({
          title: '请输入修改内容',
          duration: 1000
        });
        return;
      }
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updateQueBody',
        // 传给云函数的参数
        data: {
          _id: that.data.curQuestion._id,
          quetype: papertype,
          type: 'mod',
          question_body: newQueBody
        }
      }).then(res => {
        that.setData({
          'curQuestion.body': newQueBody,
          loading: false
        });
        common.toasterror({
          title: '修改成功',
          duration: 1000
        });
      }).catch(error => {
        console.log(error);
        that.setData({
          loading: false
        });
        common.toasterror({
          title: '修改失败 ' + error,
          duration: 1000
        });

      });

    }

  },


})