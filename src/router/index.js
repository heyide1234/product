import Vue from "vue";
import VueRouter from "vue-router";
import { beforeEachIsNext } from "./beforeEachIsNext"

Vue.use(VueRouter);

const routes = [

  {
    path: "/status",
    name: "status",
    component: () => import("views/status/index"),
  },
  {
    path: "/index",
    name: "index",
    component: () => import("views/home/index"),
    children: [
      {
        path: "/",
        name: "",
        redirect: "/message",
      },

      {
        path: "/functionPicking",
        name: "functionPicking",
        component: () => import("views/home/workstation/functionPicking/index"),
      },

      {
        path: "/materialRequisition",
        name: "materialRequisition",
        component: () => import("views/home/workstation/materialRequisition/index"),
      },
      {
        path: "/Approval",
        name: "Approval",
        component: () => import("views/home/workstation/Approval/index"),
      },


      {
        path: "/workOrderSummary",
        name: "workOrderSummary",
        component: () =>
          import("views/home/workstation/workOrderSummary/index"),
      },

      {
        path: "/batching",
        name: "batching",
        component: () => import("views/home/workstation/batching/index"),
      },
      {
        path: "/examine",
        name: "examine",
        component: () => import("views/home/workstation/examine/index"),
      },
      {
        path: "/picking",
        name: "picking",
        component: () => import("views/home/workstation/picking/index"),
      },
      {
        path: "/processList",
        name: "processList",
        component: () => import("views/home/workstation/processList/index"),
      },
      {
        path: "/workOrderHead",
        name: "workOrderHead",
        component: () => import("views/home/workstation/workOrderHead/index"),
      },
      {
        path: "/materialClass",
        name: "materialClass",
        component: () => import("views/home/warehouse/materialClass/index"),
      },
      {
        path: "/basicMaterialList",
        name: "basicMaterialList",
        component: () => import("views/home/warehouse/basicMaterialList/index"),
      },
      {
        path: "/stock",
        name: "stock",
        component: () => import("views/home/warehouse/stock/index"),
      },
      // {
      //   path: "/stockOtherCRK",
      //   name: "stockOtherCRK",
      //   component: () => import("views/home/warehouse/stockOtherCRK/index"),
      // },

      {
        path: "/YYB",
        name: "YYB",
        component: () => import("views/home/warehouse/YYB/index")
      },
      {
        path: "/Warehousing",
        name: "Warehousing",
        component: () => import("views/home/warehouse/Warehousing/index"),
      },
      {
        path: "/materialDelivery",
        name: "materialDelivery",
        component: () => import("views/home/warehouse/materialDelivery/index"),
      },
      {
        path: "/goodsWarehousing",
        name: "goodsWarehousing",
        component: () => import("views/home/warehouse/goodsWarehousing/index"),
      },
      {
        path: "/goodsDelivery",
        name: "goodsDelivery",
        component: () => import("views/home/warehouse/goodsDelivery/index"),
      },

      {
        path: "/SHFaultCategory",
        name: "SHFaultCategory",
        component: () => import("views/home/sh/SHFaultCategory/index"),
      },
      {
        path: "/SHProductClass",
        name: "SHProductClass",
        component: () => import("views/home/sh/SHProductClass/index"),
      },
      {
        path: "/SHTreatmentMethod",
        name: "SHTreatmentMethod",
        component: () => import("views/home/sh/SHTreatmentMethod/index"),
      },
      {
        path: "/SHWorkOrder",
        name: "SHWorkOrder",
        component: () => import("views/home/sh/SHWorkOrder/index"),
      },


      {
        path: "/messContent",
        name: "messContent",
        component: () => import("views/home/config/messContent/index"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("views/home/config/user/index"),
      },
      {
        path: "/role",
        name: "role",
        component: () => import("views/home/config/role/index"),
      },
      {
        path: "/auth",
        name: "auth",
        component: () => import("views/home/config/auth/index"),
      },
      {
        path: "/comm",
        name: "comm",
        component: () => import("views/home/config/comm/index"),
      },
      {
        path: "/print",
        name: "print",
        component: () => import("views/home/config/print/index"),
      },
      {
        path: "/materialDetails",
        name: "materialDetails",
        component: () => import("views/home/technology/materialDetails/index"),
      },
      {
        path: "/diagram",
        name: "diagram",
        component: () => import("views/home/technology/diagram/index"),
      },
      {
        path: "/unit",
        name: "unit",
        component: () => import("views/home/technology/unit/index"),
      },
      {
        path: "/orderPurpose",
        name: "orderPurpose",
        component: () => import("views/home/technology/orderPurpose/index"),
      },



      {
        path: "/salesOrder",
        name: "salesOrder",
        component: () => import("views/home/sale/salesOrder/index"),
      },

      {
        path: "/XSCollectionAndPaymentPlan",
        name: "XSCollectionAndPaymentPlan",
        component: () => import("views/home/sale/XSCollectionAndPaymentPlan/index"),
      },
      {
        path: "/salesInvoice",
        name: "salesInvoice",
        component: () => import("views/home/sale/salesInvoice/index"),
      },
      {
        path: "/customerManager",
        name: "customerManager",
        component: () => import("views/home/sale/customerManager/index"),
      },
      {
        path: "/customerContacts",
        name: "customerContacts",
        component: () => import("views/home/sale/customerContacts/index"),
      },
      {
        path: "/customerMaterial",
        name: "customerMaterial",
        component: () => import("views/home/sale/customerMaterial/index"),
      },




      {
        path: "/MaterialPlanDemand",
        name: "MaterialPlanDemand",
        component: () => import("views/home/plan/MaterialPlanDemand/index"),
      },
      {
        path: "/MaterialDemand",
        name: "MaterialDemand",
        component: () => import("views/home/plan/MaterialDemand/index"),
      },




      // {
      //   path: "/PreOrder",
      //   name: "PreOrder",
      //   component: () => import("views/home/purchase/PreOrder/index"),
      // },
      {
        path: "/PurchaseOrder",
        name: "PurchaseOrder",
        component: () => import("views/home/purchase/PurchaseOrder/index"),
      },
      {
        path: "/IntransitOrder",
        name: "IntransitOrder",
        component: () => import("views/home/purchase/IntransitOrder/index"),
      },
      {
        path: "/IntransitOrders",
        name: "IntransitOrders",
        component: () => import("views/home/purchase/IntransitOrder/indexs"),
      },
      {
        path: "/ReturnOrder",
        name: "ReturnOrder",
        component: () => import("views/home/purchase/ReturnOrder/index"),
      },
      {
        path: "/supplierContacts",
        name: "supplierContacts",
        component: () => import("views/home/purchase/supplierContacts/index"),
      },
      {
        path: "/supplierManager",
        name: "supplierManager",
        component: () => import("views/home/purchase/supplierManager/index"),
      },
      {
        path: "/supplierMaterial",
        name: "supplierMaterial",
        component: () => import("views/home/purchase/supplierMaterial/index"),
      },

      {
        path: "/CGCollectionAndPaymentPlan",
        name: "CGCollectionAndPaymentPlan",
        component: () => import("views/home/purchase/CGCollectionAndPaymentPlan/index"),
      },


      {
        path: "/supplierSeq",
        name: "supplierSeq",
        component: () => import("views/home/purchase/supplierSeq/index"),
      },


      {
        path: "/IncomingCheck",
        name: "IncomingCheck",
        component: () => import("views/home/check/IncomingCheck/index"),
      },
      {
        path: "/productCheck",
        name: "productCheck",
        component: () => import("views/home/check/productCheck/index"),
      },


      {
        path: "/ManufacturingPlan",
        name: "ManufacturingPlan",
        component: () => import("views/home/manufacturing/ManufacturingPlan/index"),
      },
      {
        path: "/ManufacturingExecution",
        name: "ManufacturingExecution",
        component: () => import("views/home/manufacturing/ManufacturingExecution/index"),
      },
      {
        path: "/ProductsInProcess",
        name: "ProductsInProcess",
        component: () => import("views/home/manufacturing/ProductsInProcess/index"),
      },
      {
        path: "/message",
        name: "message",
        component: () => import("views/home/message/index"),
      },

    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login/index"),
  },
  {
    path: "/others",
    name: "others",
    component: () => import("views/home/others/index"),
  },

];

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}


// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
const router = new VueRouter({
  // mode: "history",
  routes: routes,
});

// //路由守卫
router.beforeEach(async (to, from, next) => {
  let token = sessionStorage.getItem("loginName");
  if (to.name == "login") { //前往登陆不检测
    next();
  }
  else if (!token) {//未登陆前往登陆
    next('/login');
  }
  else if (to.path == "/") {//根组件
    next();
  }
  else {
    var au = await beforeEachIsNext(token, to.name);
    if (au) {
      to.query.auth = au
      next();
    }
    else {
      alert("无权访问！")
    }
  }


  // beforeEachIsNext("token", "to.name");
  // next()
});

export default router;
