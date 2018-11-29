const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },

  testTap: function () {
    wx.cloud.init({
      traceUser: true
    })

    
    // db.collection('question_bank_test').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //     description: "learn cloud database",
    //     due: new Date("2018-09-01"),
    //     tags: [
    //       "cloud",
    //       "database"
    //     ],
    //     // 为待办事项添加一个地理位置（113°E，23°N）
    //     location: new db.Geo.Point(113, 23),
    //     done: false
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // });

    const db = wx.cloud.database()
    const _ = db.command
    db.collection('question_bank_test').where({
      question_id: _.lte(100040).and(_.gt(100020))
    }).get({
        success: function (res) {
          console.log(res.data[2])
        }
      })
  }
})