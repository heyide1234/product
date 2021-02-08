import { https } from "network/request";

const pathCode = {
    "订单状态": "message",
    "物料请购单": "materialRequisition",
    "功能领料": "functionPicking",
    "销售订单": "salesOrder",
    "销售发货单": "salesInvoice",
    "客户管理": "customerManager",
    "客户联系人": "customerContacts",
    "收款计划单": "XSCollectionAndPaymentPlan",
    "物料计划需求单": "MaterialPlanDemand",
    "物料需求单": "MaterialDemand",
    "预购单": "PurchaseOrder",
    "采购单": "IntransitOrders",
    "退货单": "ReturnOrder",
    "供应商管理": "supplierManager",
    "供应商联系人": "supplierContacts",
    "付款计划单": "CGCollectionAndPaymentPlan",
    "来料检验": "IncomingCheck",
    "成品检验": "productCheck",
    "库存管理": "stock",
    "材料到货单": "IntransitOrder",
    "材料入库单": "Warehousing",
    "材料出库单": "materialDelivery",
    "成品入库单": "goodsWarehousing",
    "成品出库单": "goodsDelivery",
    "盈余表": "YYB",
    "制造计划单": "ManufacturingPlan",
    "制造执行单": "ManufacturingExecution",
    "物料分类": "materialClass",
    "物料基础资料": "basicMaterialList",
    "材料明细表": "materialDetails",
    "材料明细关系图": "diagram",
    "系统通知": "messContent",
    "资料相关": "others",
    "用户管理": "user",
    "权限管理": "auth",
    "角色管理": "role",
    "查询": "print",
}
/**
 * @function{*} 路由检测
 */
export async function beforeEachIsNext(token, name) {

    if (name == 'status') {
        return 'status';
    }
    return await getUserAuth(token, name)
}

export async function getUserAuth(tokens, names) {
    // console.log("路由检测：", tokens, names);
    let role = "";
    let roleAuth = [];
    let state = "";
    let c = false;
    await https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
            table: "__user",
            where: {
                UserName: tokens
            },
        },
    }).then((res) => {
        role = res[0].Role
    }).catch((err) => {
        console.log(err);
    });
    await https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
            table: "__role",
            where: {
                RoleName: role
            },
        },
    }).then((res) => {
        roleAuth = res[0].Role_Auth.split(",")
    })
        .catch((err) => {
            console.log(err);
        });
    // console.log(roleAuth);

    c = roleAuth.some(item => {
        state = item.split("-")[2];
        return pathCode[item.split("-")[1]] == names;
    })
    if (c) {
        return state;
    } else {
        return null;
    }
}