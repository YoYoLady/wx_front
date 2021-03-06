Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/index",
      iconPath: "../images/tabBar/icon_component.png",
      selectedIconPath: "../images/tabBar/icon_component_HL.png",
      text: "组件"
    }, {
      pagePath: "/index/index2",
      iconPath: "../images/tabBar/icon_API.png",
      selectedIconPath: "../images/tabBar/icon_API_HL.png",
      text: "接口"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})