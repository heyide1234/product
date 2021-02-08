//检测流程状态
/**
 * @function 推单模式
 * @param orderNumber --订单编号
 * @param table --表名
 * @param statusing --未完成状态值
 * @param processCode --流程码
 */
export function getProcessState(orderNumber, table, statusing, processCode) {
  this.$https({
    method: "get",
    url: "/api/apiModel/find",
    params: {
      table: table,
      where: { OrderNumber: orderNumber }
    }
  })
    .then(res => {
      console.log(res);
      let csd = true;
      for (let i = 0; i < res.length; i++) {
        if (res[i].status == statusing) csd = false
      }
      if (csd) {
        ///进入推单模式
        this.$https({
          method: "post",
          url: "/api/apiModel/updateByWhere",
          data: {
            table: "salesOrder",
            where: { OrderNumber: orderNumber },
            form: { processCode: processCode }
          }
        })
          .then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
      }
    })
    .catch(err => {
      console.log(err);
    });
}