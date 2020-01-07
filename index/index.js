Page({
  data: {
    // 星期数组
    weekText: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    // 上个月
    lastMonth: '◀',
    // 下个月
    nextMonth: '▶',
    //当月格子
    thisMonthDays: [],
    //上月格子
    empytGridsBefore: [],
    //下月格子
    empytGridsAfter: [],
    // 年份范围数组
    yearList: [],
    // 默认展示当前年份
    yearIndex: 1,
    //显示日期
    title: '',
    //格式化日期
    format: '',
    // 年
    year: 0,
    // 月
    month: 0,
    // 日
    date: 0,
    //常量 用于匹配是否为当天
    YEAR: 0,
    MONTH: 0,
    DATE: 0
  },
  onReady: function() {
    //默认选中当天 并初始化组件
    this.today();
  },
  //补全0
  zero: function(i) {
    return i >= 10 ? i : '0' + i;
  },
  //获取当月天数
  getThisMonthDays: function(year, month) {
    return new Date(year, month, '0').getDate();
  },
  //默认选中当天 并初始化组件
  today() {
    let DATE = new Date(),
      year = DATE.getFullYear(),
      month = DATE.getMonth() + 1,
      date = DATE.getDate(),
      yearList = [],
      select = year + '-' + this.zero(month) + '-' + this.zero(date);
    yearList.push(year - 1, year, year + 1)
    this.setData({
      format: select,
      select,
      year,
      month,
      date,
      yearList,
      title: year + '年' + this.zero(month) + '月',
      YEAR: year,
      MONTH: month,
      DATE: date
    })
    //初始化日历组件UI
    this.display(year, month, date);
  },
  // 选择年份
  bindPickerChange(e) {
    let yearIndex = e.detail.value
    //初始化日历组件UI
    this.display(this.data.yearList[yearIndex], this.data.month, this.data.date);
  },
  //初始化
  display(year, month, date) {
    this.setData({
      select: year + '-' + this.zero(month) + '-' + this.zero(date),
      year,
      month,
      date,
      title: year + '年' + this.zero(month) + '月' + this.zero(date) + '日'
    })
    this.createDays(year, month);
    this.createEmptyGrids(year, month);
  },
  // 绘制当月天数占的格子
  createDays(year, month) {
    let thisMonthDays = [],
      days = this.getThisMonthDays(year, month);
    for (let i = 1; i <= days; i++) {
      thisMonthDays.push({
        date: i, // 下标
        yearFormat: year, // 年
        monthFormat: this.zero(month), // 月份补零
        dateFormat: this.zero(i), // 当日补零
        week: this.data.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()] // 计算当日所属星期
      });
    }
    this.setData({
      thisMonthDays
    })
  },
  // 获取当月空出的天数
  createEmptyGrids(year, month) {
    // 计算当前月份1号所在的星期
    let week = new Date(Date.UTC(year, month - 1, 1)).getDay(),
      empytGridsBefore = [],
      empytGridsAfter = [],
      emptyDays = (week == 0 ? 7 : week);

    //当月天数
    var thisMonthDays = this.getThisMonthDays(year, month);

    //上月天数
    var preMonthDays = month - 1 < 0 ?
      this.getThisMonthDays(year - 1, 12) :
      this.getThisMonthDays(year, month - 1);

    // 距离上个月空出的日期
    for (let i = 1; i <= emptyDays; i++) {
      empytGridsBefore.push(preMonthDays - (emptyDays - i));
    }

    // 距离下个月空出的日期
    let after = (42 - thisMonthDays - emptyDays) - 7 >= 0 ?
      (42 - thisMonthDays - emptyDays) - 7 :
      (42 - thisMonthDays - emptyDays);
    for (let i = 1; i <= after; i++) {
      empytGridsAfter.push(i);
    }
    this.setData({
      empytGridsAfter,
      empytGridsBefore
    })
  },
  //上个月
  lastMonth: function() {
    let month = this.data.month == 1 ? 12 : this.data.month - 1;
    let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
    //初始化日历组件UI
    this.display(year, month, this.data.date);
  },
  //下个月
  nextMonth: function() {
    let month = this.data.month == 12 ? 1 : this.data.month + 1;
    let year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
    //初始化日历组件UI
    this.display(year, month, this.data.date);
  },
  //选择 并格式化数据
  select(e) {
    let date = e.detail.currentTarget ? e.detail.currentTarget.dataset.date : e.currentTarget.dataset.date,
      select = this.data.year + '-' + this.zero(this.data.month) + '-' + this.zero(date);
    this.setData({
      title: this.data.year + '年' + this.zero(this.data.month) + '月' + this.zero(date) + '日',
      select,
      date,
      year: this.data.year,
      month: this.data.month,
    });
  }
})