// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    empytGridsBefore: {
      type: Array
    },
    thisMonthDays: {
      type: Array
    },
    empytGridsAfter: {
      type: Array
    },
    format: {
      type: String
    },
    year: {
      type: String
    },
    select: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e) {
      this.triggerEvent('select', e)
    }
  }
})