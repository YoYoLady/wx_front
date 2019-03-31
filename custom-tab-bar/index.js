Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "../../pages/index/index",
      iconPath: "../images/tabBar/首页off.png",
      selectedIconPath: "../images/tabBar/首页on.png",
      text: "首页"
    }, 
    {
      pagePath: "pages/index/index",
      iconPath: "../images/tabBar/减压.png",
      selectedIconPath: "../images/tabBar/减压.png",
      text: "减压"
    },
    {
      pagePath: "../../pages/user_info/user_info",
      iconPath: "../images/tabBar/我的off.png",
      selectedIconPath: "../images/tabBar/我的on.png",
      text: "我的"
    }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log("data path" + url)
      wx.navigateTo({
        url: url,
      })
      this.setData({
        selected: data.index
      })
    }
  }
})