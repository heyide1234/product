import Vue from "vue";
import VueRouter from "vue-router";
import { beforeEachIsNext } from "./beforeEachIsNext"

Vue.use(VueRouter);

const routes = [

  {
    path: "/status",
    name: "status",
    component: () => import("views/status/index"),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/index",
    name: "index",
    component: () => import("views/home/index"),
    meta: {
      keepAlive: false,
    },
    children: [
      {
        path: "/",
        name: "",
        redirect: "/message",
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/functionPicking",
        name: "functionPicking",
        component: () => import("views/home/workstation/functionPicking/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/materialRequisition",
        name: "materialRequisition",
        component: () => import("views/home/workstation/materialRequisition/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/Approval",
        name: "Approval",
        component: () => import("views/home/workstation/Approval/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/MaterialPriceSP",
        name: "MaterialPriceSP",
        component: () => import("views/home/workstation/MaterialPriceSP/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/supplierSP",
        name: "supplierSP",
        component: () => import("views/home/workstation/supplierSP/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/materialSP",
        name: "materialSP",
        component: () => import("views/home/workstation/materialSP/index"),
        meta: {
          keepAlive: false,
        },
      },



      {
        path: "/workOrderSummary",
        name: "workOrderSummary",
        component: () =>
          import("views/home/workstation/workOrderSummary/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/batching",
        name: "batching",
        component: () => import("views/home/workstation/batching/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/examine",
        name: "examine",
        component: () => import("views/home/workstation/examine/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/picking",
        name: "picking",
        component: () => import("views/home/workstation/picking/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/processList",
        name: "processList",
        component: () => import("views/home/workstation/processList/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/workOrderHead",
        name: "workOrderHead",
        component: () => import("views/home/workstation/workOrderHead/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/materialClass",
        name: "materialClass",
        component: () => import("views/home/warehouse/materialClass/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/basicMaterialList",
        name: "basicMaterialList",
        component: () => import("views/home/warehouse/basicMaterialList/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/stock",
        name: "stock",
        component: () => import("views/home/warehouse/stock/index"),
        meta: {
          keepAlive: false,
        },
      },
      // {
      //   path: "/stockOtherCRK",
      //   name: "stockOtherCRK",
      //   component: () => import("views/home/warehouse/stockOtherCRK/index"),
      // },

      {
        path: "/YYB",
        name: "YYB",
        component: () => import("views/home/warehouse/YYB/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/Warehousing",
        name: "Warehousing",
        component: () => import("views/home/warehouse/Warehousing/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/materialDelivery",
        name: "materialDelivery",
        component: () => import("views/home/warehouse/materialDelivery/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/goodsWarehousing",
        name: "goodsWarehousing",
        component: () => import("views/home/warehouse/goodsWarehousing/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/goodsDelivery",
        name: "goodsDelivery",
        component: () => import("views/home/warehouse/goodsDelivery/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/SHFaultCategory",
        name: "SHFaultCategory",
        component: () => import("views/home/sh/SHFaultCategory/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/SHProductClass",
        name: "SHProductClass",
        component: () => import("views/home/sh/SHProductClass/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/SHTreatmentMethod",
        name: "SHTreatmentMethod",
        component: () => import("views/home/sh/SHTreatmentMethod/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/SHWorkOrder",
        name: "SHWorkOrder",
        component: () => import("views/home/sh/SHWorkOrder/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/messContent",
        name: "messContent",
        component: () => import("views/home/config/messContent/index"),
        meta: {
          keepAlive: false,
          isBack: false
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("views/home/config/user/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/role",
        name: "role",
        component: () => import("views/home/config/role/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/auth",
        name: "auth",
        component: () => import("views/home/config/auth/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/comm",
        name: "comm",
        component: () => import("views/home/config/comm/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/print",
        name: "print",
        component: () => import("views/home/config/print/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/materialDetails",
        name: "materialDetails",
        component: () => import("views/home/technology/materialDetails/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/diagram",
        name: "diagram",
        component: () => import("views/home/technology/diagram/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/unit",
        name: "unit",
        component: () => import("views/home/technology/unit/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/orderPurpose",
        name: "orderPurpose",
        component: () => import("views/home/technology/orderPurpose/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/salesOrderPlan",
        name: "salesOrderPlan",
        component: () => import("views/home/sale/salesOrderPlan/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/salesOrder",
        name: "salesOrder",
        component: () => import("views/home/sale/salesOrder/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/XSCollectionAndPaymentPlan",
        name: "XSCollectionAndPaymentPlan",
        component: () => import("views/home/sale/XSCollectionAndPaymentPlan/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/salesInvoice",
        name: "salesInvoice",
        component: () => import("views/home/sale/salesInvoice/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/customerManager",
        name: "customerManager",
        component: () => import("views/home/sale/customerManager/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/customerContacts",
        name: "customerContacts",
        component: () => import("views/home/sale/customerContacts/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/customerMaterial",
        name: "customerMaterial",
        component: () => import("views/home/sale/customerMaterial/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/MaterialPlanDemand",
        name: "MaterialPlanDemand",
        component: () => import("views/home/plan/MaterialPlanDemand/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/MaterialDemand",
        name: "MaterialDemand",
        component: () => import("views/home/plan/MaterialDemand/index"),
        meta: {
          keepAlive: false,
        },
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
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/IntransitOrder",
        name: "IntransitOrder",
        component: () => import("views/home/purchase/IntransitOrder/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/IntransitOrders",
        name: "IntransitOrders",
        component: () => import("views/home/purchase/IntransitOrder/indexs"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/ReturnOrder",
        name: "ReturnOrder",
        component: () => import("views/home/purchase/ReturnOrder/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/supplierContacts",
        name: "supplierContacts",
        component: () => import("views/home/purchase/supplierContacts/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/supplierManager",
        name: "supplierManager",
        component: () => import("views/home/purchase/supplierManager/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/supplierMaterial",
        name: "supplierMaterial",
        component: () => import("views/home/purchase/supplierMaterial/index"),
        meta: {
          keepAlive: false,
        },
      },

      {
        path: "/CGCollectionAndPaymentPlan",
        name: "CGCollectionAndPaymentPlan",
        component: () => import("views/home/purchase/CGCollectionAndPaymentPlan/index"),
        meta: {
          keepAlive: false,
        },
      },


      {
        path: "/supplierSeq",
        name: "supplierSeq",
        component: () => import("views/home/purchase/supplierSeq/index"),
        meta: {
          keepAlive: false,
        },
      },


      {
        path: "/IncomingCheck",
        name: "IncomingCheck",
        component: () => import("views/home/check/IncomingCheck/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/productCheck",
        name: "productCheck",
        component: () => import("views/home/check/productCheck/index"),
        meta: {
          keepAlive: false,
        },
      },


      {
        path: "/ManufacturingPlan",
        name: "ManufacturingPlan",
        component: () => import("views/home/manufacturing/ManufacturingPlan/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/ManufacturingExecution",
        name: "ManufacturingExecution",
        component: () => import("views/home/manufacturing/ManufacturingExecution/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/ProductsInProcess",
        name: "ProductsInProcess",
        component: () => import("views/home/manufacturing/ProductsInProcess/index"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/message",
        name: "message",
        component: () => import("views/home/message/index"),
        meta: {
          keepAlive: false,
        },
      },

    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login/index"),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/others",
    name: "others",
    component: () => import("views/home/others/index"),
    meta: {
      keepAlive: false,
    },
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
  //  mode: "history",
  mode: "hash",
  routes: routes,
  //回退坐标
  scrollBehavior: (to, from, position) => {
    if (position) {
      return position
    } else {
      return { x: 0, y: 0 }
    }
  },

});

// //路由守卫
router.beforeEach(async (to, from, next) => {
  let token = sessionStorage.getItem("loginName");
  if (to.name == "login" || to.path == "/") { //前往登陆不检测
    next();
  }
  else if (!token) {//未登陆前往登陆
    next('/login');
  }
  // else if (to.path == "/") {//根组件
  //   next();
  // }
  else {
    var au = await beforeEachIsNext(token, to.name);
    if (au) {
      to.query.auth = au;
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
