// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 顯示首頁
router.get('/', (req, res) => {
  let loadIconWorkDone = false
  Record.find()
    .lean()
    .then(records => {
      // 計算總金額
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }

      // 取出對應 category 的 icon
      Category.find()
        .lean()
        .then(categories => {
          for (let i = 0; i < records.length; i++) {
            const icon = categories.find(category => category.name === records[i].category).icon
            records[i].categoryIcon = icon
          }
          loadIconWorkDone = true

          if (loadIconWorkDone) {
            res.render('index', { records: records, totalAmount: totalAmount })
          }
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
