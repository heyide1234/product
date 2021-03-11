<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="成品出库单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
    >
      <div class="dialogBody">
        <div id="dialogBody2" style="width：100%">
          <div class="tableTRs2">
            <img src="~assets/camy/camy.png" style="margin: 5px" alt="" />
          </div>
          <div class="fds trds"><span>发货清单</span></div>
          <div class="tableTRs2 fds">收货单位：</div>
          <div class="tableTRs2 fds">
            收货人及电话：{{ Receiver }} {{ ReceivingPhone }}
          </div>
          <div class="tableTRs2 fds">收货地址：{{ ReceivingAddress }}</div>
          <table class="printTable">
            <thead>
              <tr>
                <th>序号</th>
                <th>合同/订单号</th>
                <th>名 称</th>
                <th>规格型号（物料号）</th>
                <th>数量</th>
                <th>单位</th>

                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item1, index) in tableData1" :key="index">
                <td>{{ index + 1 }}</td>
                <!-- <td v-for="(item2, key) in item1" :key="key">
                  {{ item2 }}
                </td> -->

                <td>{{ OrderNumbers }}</td>
                <td>{{ item1.MaterialName }}</td>
                <td>{{ item1.MaterialSpec }}</td>
                <td>{{ item1.Number }}</td>
                <td>pcs</td>
                <td>{{ item1.Remarks }}</td>
              </tr>
            </tbody>
          </table>
          <div class="tableTRs2 fds">
            <div>发货单位：四川凯迈新能源有限公司</div>
            <div>收货单位：</div>
          </div>
          <div class="tableTRs2 fds">
            <div>发货人：</div>
            <div>收货人签字：</div>
          </div>
          <div class="tableTRs2 fds">
            <div>发货日期：{{ DeliveryDate }}</div>
            <div>收货日期： 年 月 日</div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dys">打 印</el-button> -->
        <el-button type="primary" v-print="printTable2" @click="dy"
          >打 印</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="false"
    >
      <div class="dialogBody">
        <div id="dialogBody1" style="width：100%">
          <div class="tableTR">
            <div class="tableTD">
              <img src="~assets/camy/tld.png" style="margin: 5px" alt="" />
            </div>
            <div class="tableTD2">
              <p>送 货 单</p>
              <p>DELIVERY NOTE</p>
            </div>
            <div class="tableTD">
              <p>编号：</p>
              <p>Delivery Note No:</p>
            </div>
          </div>
          <div class="tableTR">
            <div class="tableTD">
              <p>供应商编号：</p>
              <p>Supplier Code:</p>
            </div>
            <div class="tableTD2">
              <p style="font-size: 13px; margin-top: 30px">80025</p>
            </div>
            <div class="tableTD">
              <p>发货日期：{{ DeliveryDate }}</p>
              <p>Delivery Date:</p>
            </div>
          </div>
          <div class="tableTR">
            <div class="tableTD">
              <p>供应商及发货人（盖章）：</p>
              <p>Vendor & Consigner (Stamp):</p>
            </div>
            <div class="tableTD2">
              <p style="font-weight: 400; font-size: 13px; margin-top: 30px">
                四川凯迈
              </p>
            </div>
            <div class="tableTD">
              <p>订单号：816846</p>
              <p>Order Number:{{ OrderNumbers }}</p>
            </div>
          </div>
          <div class="tableTR">
            <div class="tableTD">
              <p>件数：</p>
              <p>No.KLT:</p>
            </div>
            <div class="tableTD">
              <p>包装方式：</p>
              <p>Packaging:</p>
            </div>
          </div>
          <div class="tableTR">
            <div class="tableTD2">
              <p style="font-weight: 400; font-size: 13px; margin-top: 30px">
                供应商记录
              </p>
              <p style="font-weight: 400; font-size: 13px; margin-top: 0px">
                Supplier's Records
              </p>
            </div>
            <div class="tableTD2">
              <p style="font-weight: 400; font-size: 13px; margin-top: 30px">
                收货仓库记录
              </p>
              <p style="font-weight: 400; font-size: 13px; margin-top: 0px">
                Receiver's Records
              </p>
            </div>
          </div>
          <div>
            <table class="printTable">
              <thead>
                <tr>
                  <th>
                    <div>序号</div>
                    <div>Sequ.</div>
                  </th>
                  <th>
                    <div>货名、规格型号</div>
                    <div>Parts Description</div>
                  </th>
                  <th>
                    <div>物料编码</div>
                    <div>Parts Number</div>
                  </th>
                  <th>
                    <div>单位</div>
                    <div>Unit</div>
                  </th>
                  <th>
                    <div>数量</div>
                    <div>Quantity</div>
                  </th>
                  <th>
                    <div>实收数量</div>
                    <div>Received Qty</div>
                  </th>
                  <th>
                    <div>订单号</div>
                    <div>OrderNumber</div>
                  </th>
                  <th>
                    <div>备注</div>
                    <div>Remarks</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item1, index) in tableData1" :key="index">
                  <td>{{ index + 1 }}</td>
                  <!-- <td v-for="(item2, key) in item1" :key="key">
                  {{ item2 }}
                </td> -->

                  <td>{{ item1.MaterialSpec }}</td>
                  <td>{{ item1.MaterialNumber }}</td>
                  <td>pcs</td>
                  <td>{{ item1.Number }}</td>
                  <td>{{ item1.ReceivedQty }}</td>
                  <td>{{ OrderNumbers }}</td>
                  <td>{{ item1.Remarks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tableTR1">
            <div class="tableTD1">
              <p>发货人签字及电话：</p>
              <p>Sender's Signature & Tel Nr:</p>
            </div>
            <div class="tableTD1">
              <p>日期/时间：</p>
              <p>Sending Date/Time:</p>
            </div>
          </div>

          <div class="tableTR1">
            <div class="tableTD1">
              <p>承运人签字及电话：</p>
              <p>Shipper's Signature & Tel Nr:</p>
            </div>
            <div class="tableTD1">
              <p>日期/时间：</p>
              <p>Sending Date/Time:</p>
            </div>
          </div>
          <div class="tableTR1">
            <div class="tableTD1">
              <p>收货人签字及电话：</p>
              <p>Receiver's Signature & Tel Nr:</p>
            </div>
            <div class="tableTD1">
              <p>日期/时间：</p>
              <p>Sending Date/Time:</p>
            </div>
          </div>
          <div class="tableTR1">
            <div class="tableTD1">
              <p>第一联：（白色）收货单位</p>
              <p>1 Copy: (White) Receiver</p>
            </div>
            <div class="tableTD1">
              <p>第三联：（黄色）承运商</p>
              <p>3 Copy: (Yellow) Shipping Company</p>
            </div>
          </div>
          <div class="tableTR1">
            <div class="tableTD1">
              <p>第二联：（蓝色）供应商结算联（随附发票）</p>
              <p>2 Copy: (Blue) Settlement</p>
            </div>
            <div class="tableTD1">
              <p>第四联：（红色）送货单位（供应商或采购人员）</p>
              <p>4 Copy: (Blue) Supplier/Buyer</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dys">打 印</el-button> -->
        <el-button type="primary" v-print="printTable1" @click="dy"
          >打 印</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div class="dialogBody" id="dialogBody">
        <div class="d">
          <vue-qr
            :logoSrc="ewmLogo"
            :logoScale="0.2"
            :size="80"
            :margin="0"
            :auto-color="true"
            :dot-scale="1"
            :text="ewmText"
          />
        </div>
        <h1>四川凯迈新能源有限公司成品出库单</h1>
        <div class="bz">
          <div>出库单号：{{ clckdh }}</div>
          <div>库管员：{{ kgy }}</div>
          <div>接收人：{{ jsr }}</div>
        </div>
        <table class="printTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>产品编码</th>
              <th>产品名称</th>
              <th>规格</th>
              <th>数量</th>
              <th>单位</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1, index) in querydata" :key="index">
              <td v-for="(item2, key) in item1" :key="key">
                {{ item2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dys">打 印</el-button> -->
        <el-button type="primary" v-print="printTable" @click="dy"
          >打 印</el-button
        >
      </div>
    </el-dialog>
    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="300"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          property="DeliveryDate"
          label="出库日期"
        ></el-table-column>
        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>

        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          property="MaterialPrice"
          label="产品价格"
        ></el-table-column>
        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>
        <el-table-column
          property="CustomerMaterialName"
          label="客户物料名称"
        ></el-table-column>
        <el-table-column property="Receiver" label="收货人"></el-table-column>
        <el-table-column
          property="ReceivingPhone"
          label="收货人电话"
        ></el-table-column>
        <el-table-column
          property="ReceivingAddress"
          label="收货地址"
        ></el-table-column>
        <el-table-column property="HTModel" label="合同模板"></el-table-column>
        <el-table-column property="Number" label="出库数"></el-table-column>
        <el-table-column property="SNlist" label="出库SN">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p v-for="(item, index) in scope.row.SNlist" :key="index">
                SN:{{ item }}
              </p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="primary"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              @click="zk()"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="选择SN">
                  <el-select
                    v-model="form.SNlist"
                    multiple
                    collapse-tags
                    style="margin-left: 20px"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :value="item.SN"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                @click="editSNlist(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >
              <el-button
                @click="findwlSN(scope)"
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="df">
        <!-- <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination> -->
      </div>
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="材料明细"></el-step>&nbsp;&nbsp;&nbsp;<font></font>
      </el-steps>
      <el-table
        ref="tableselectData1"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>

        <!-- <el-table-column property="SN" label="SN"></el-table-column> -->
        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>

        <!-- <el-table-column property="Thumbnail" label="缩略图"></el-table-column> -->

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>
        <!-- <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column> -->

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>

        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-position"
              plain
              circle
              size="mini"
              @click="tsw"
            ></el-button>
          </template>
          <!-- <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete(scope.row,scope.$index)"
            ></el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/utils/index";
import VueQr from "vue-qr";
import { jsNums } from "common/utils/content";
export default {
  components: {
    VueQr,
  },
  data() {
    return {
      temparrs: [], //sn数组
      ewmLogo: require("assets/title.png"),
      ewmText: "",
      options: [], //SN产品
      querydata: [],
      querydata1: [],
      querydata2: [],
      querydataH: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      printTable: {
        id: "dialogBody",
      },
      printTable1: {
        id: "dialogBody1",
      },
      printTable2: {
        id: "dialogBody2",
      },
      clckdh: "", //材料出库单号
      kgy: "", //库管员
      jsr: "", //接收人
      pagenums: 0,
      OrderNumbers: "",
      idArray: [],
      seleArr: [],
      seleArrT: [],
      DeliveryDate: "", //发货日期

      form: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        Number: "", //产品数量
        CustomerMaterialNumber: "", //客户物料编号
        CustomerMaterialName: "", //客户物料名称
        SNlist: [], //SN序列号
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      form1: {
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Remarks: "", //备注
        Enclosure: "", //附件
        Number: "", //数量
        Company: "", //单位
        Parent: "", //父节点物料编号
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      tableData: [],
      tableData1: [],
      datas: [],
      datas1: [],
      temoData1: [],
      states: false,
      Receiver: "", //收货人
      ReceivingPhone: "", //收货人电话
      ReceivingAddress: "", //收货地址
    };
  },
  methods: {
    async editSNlist(scope) {
      console.log("this.option===", this.form.SNlist);
      if (this.form.SNlist.length != scope.row.Number) {
        alert("SN数量与出库数要相等！");
        return;
      }
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "goodsDelivery",
          form: {
            SNlist: this.form.SNlist,
          },
          id: scope.row._id,
        },
      })
        .then((res) => {
          console.log(res);
          alert("SN选择成功！");
          this.findByPageNum(); //找寻对应页面的数据
        })
        .catch(function (err) {
          console.log(err);
        });
      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    findwlSN(scope) {
      console.log("scope.row.MaterialNumber===", scope.row.MaterialNumber);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: {
            IsDeliverGoods: "制造已入库",
            MaterialNumber: scope.row.MaterialNumber,
          },
        },
      })
        .then((res) => {
          console.log("当前数据111", res);
          // this.getstorc(res);
          this.options = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.form.SNlist = scope.row.SNlist;
    },
    async tsw() {
      //打印
      // let dd = [];
      let cd1 = []; //销售订单
      let cd2 = []; //合同模板
      for (let k = 0; k < this.seleArrT.length; k++) {
        if (cd1.length === 0) {
          cd1.push(this.seleArrT[k].OrderNumber);
        } else {
          if (this.seleArrT[k].OrderNumber != cd1[0]) {
            alert("销售订单不一致！");
            return;
          }
        }
        if (cd2.length === 0) {
          cd2.push(this.seleArrT[k].HTModel);
        } else {
          if (this.seleArrT[k].HTModel != cd2[0]) {
            alert("合同模板不一致！");
            return;
          }
        }
      }
      this.DeliveryDate = this.seleArrT[0].DeliveryDate;

      this.OrderNumbers = this.seleArrT[0].OrderNumber;
      this.Receiver = this.seleArrT[0].Receiver; //收货人
      this.ReceivingPhone = this.seleArrT[0].ReceivingPhone; //收货人电话
      this.ReceivingAddress = this.seleArrT[0].ReceivingAddress; //收货地址
      if (this.seleArrT[0].HTModel === "送货单") {
        //选择不同的合同模板
        this.dialogFormVisible1 = true;
      } else {
        this.dialogFormVisible2 = true;
      }

      //库存存取
      //this.doStore();
    },
    async tsw1() {
      //打印
      let dd = [];
      let is = 0;
      this.tableData1.forEach((item) => {
        is++;
        let {
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          Company, //单位
        } = item;
        dd.push({
          index: is,
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          Company, //单位
        });
      });
      this.querydata = dd;
      this.querydataH = Object.keys(this.querydata[0]);

      this.clckdh = getTime().replace(/[\s+|/|:]/g, "");
      this.kgy = sessionStorage.getItem("loginName"); //库管员
      this.ewmText = this.clckdh;
      this.dialogFormVisible = true;

      //库存存取
      //this.doStore();
    },
    dys() {
      if (confirm("是否开启流程控制！")) this.dy();
      console.log(" this.tableData1==", this.tableData1);
    },
    async dy() {
      if (!confirm("将开启流程控制，是否继续？")) return;
      this.dialogFormVisible = false;
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/goodsDeliveryTransaction",
        data: {
          datas: this.tableData1,
          seleArrT: this.seleArrT,
          temparrs: this.temparrs,
          Proportioner: sessionStorage.getItem("loginName"), //创建人
        },
      })
        .then((res) => {
          if (res.status) {
            this.$myloading({
              show: false,
            });
            this.newview();
            this.tableData1 = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateZZSN(_SN) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "ManufacturingExecution",
          where: { SN: _SN },
          form: {
            IsDeliverGoods: "2",
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleDelete(row, index) {
      console.log(row._id);

      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "MaterialDemand",
          id: row._id,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1.splice(index, 1);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async findOrderds(OrderNumber) {
      let temps = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: OrderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          temps = res;
        })
        .catch(function (err) {
          console.log(err);
        });
      return temps;
    },
    //库存操作
    async ts() {
      //库存存取
      //Proportioner: sessionStorage.getItem("loginName")
      // this.doStore(
      //   this.tableData1,
      //   this.seleArrT,
      //   sessionStorage.getItem("loginName")
      // );
      //
    },
    async doStore(datas, seleArrT) {
      for (let j = 0; j < datas.length; j++) {
        const MaterialNumber = datas[j].MaterialNumber;
        const _Number = parseInt(datas[j].rknums); //int,需求数
        await this.updateStore(MaterialNumber, _Number + ""); //修改库存
      }
      //修改表单状态（1，不显示）
      for (let k = 0; k < seleArrT.length; k++) {
        await this.updatecod(seleArrT[k]._id);
      }
    },
    async updateStore(a, b) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "stock",
          where: {
            MaterialNumber: a,
            // Purpose: "生产制造"
          },
          form: {
            Number: b,
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async updatecod(ids) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "goodsDelivery",
          id: ids,
          form: {
            status: "1",
            Proportioner: sessionStorage.getItem("loginName"),
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.newview();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //刷新界面
    newview() {
      // this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },

    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "goodsDelivery",
          where: { status: "0" },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //权限
    auth() {
      //   if (sessionStorage.getItem("loginName") == null) {
      //     this.$message("请先登陆");
      //     this.$router.push({ path: "/login" });
      //     return true;
      //   }
      //   if (this.name === sessionStorage.getItem("loginName")) {
      return false;
      // } else {
      //   this.$message("权限不足");
      //   return true;
      // }
    },
    updatesalesOrderDetail(OrderNumbers) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrderDetail",
          where: { OrderNumber: OrderNumbers },
          form: { status: "2" },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    hb() {
      this.disticts();
    },
    async zk() {
      if (this.$refs.tableselectData.selection.length == 0) return;
      let cdew = this.$refs.tableselectData.selection; //选取数组
      this.temparrs = [];
      for (let m = 0; m < cdew.length; m++) {
        if (cdew[m].SNlist == undefined || cdew[m].SNlist.length == 0) {
          alert("产品SN未选择！");
          return;
        }
        for (let r = 0; r < cdew[m].SNlist.length; r++) {
          if (this.temparrs.indexOf(cdew[m].SNlist[r]) > -1) {
            alert("产品SN重复！");
            return;
          } else {
            this.temparrs.push(cdew[m].SNlist[r]);
          }
        }
        await this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "__basicMaterialList",
            dataBase: "base",
            where: {
              MaterialNumber: cdew[m].MaterialNumber,
            },
          },
        })
          .then((res) => {
            console.log(res);
            cdew[m].MaterialSpec = res[0].MaterialSpec;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log("temparrs======", this.temparrs); //?
      this.seleArrT = cdew; //记录选中的选项

      //去重
      this.tableData1 = jsNums(
        JSON.parse(JSON.stringify(cdew)),
        "MaterialNumber",
        "Number"
      );
    },
    async zk1() {
      if (this.$refs.tableselectData.selection.length == 0) return;
      let cdew = this.$refs.tableselectData.selection; //选取数组
      this.seleArrT = cdew;
      this.jsr = cdew[0].creater;
      const loading = this.$loading({
        lock: true,
        text: "SN计算中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);

      this.tableData1 = [];
      let _materialNumberArr = []; //存储物料编码
      let tempArr = []; //去重数组--sn分配
      // debugger;
      for (let i = 0; i < cdew.length; i++) {
        if (_materialNumberArr.indexOf(cdew[i].MaterialNumber) === -1) {
          _materialNumberArr.push(cdew[i].MaterialNumber);
        }
      }
      // debugger;
      for (let m = 0; m < _materialNumberArr.length; m++) {
        let num = 0;
        let _obj = null;
        for (let n = 0; n < cdew.length; n++) {
          if (_materialNumberArr[m] == cdew[n].MaterialNumber) {
            _obj = JSON.parse(JSON.stringify(cdew[n]));
            num += parseInt(_obj.Number);
          }
        }
        _obj.Number = num + "";
        tempArr.push(_obj);
      }

      this.seleArr = tempArr;
      console.log("tempArr产品", tempArr);
      let dsd = [];
      for (let k = 0; k < tempArr.length; k++) {
        const _MaterialNumber = tempArr[k].MaterialNumber; //产品编码
        const _Number = tempArr[k].Number; //产品数量
        //1.根据产品编码查询制造SN&&IsDeliverGoods=1(库存)
        let d1 = await this.findByMaterialNumber(_MaterialNumber);
        if (d1.length == 0) {
          this.$notify({
            title: "警告",
            message: "库存不足！【" + _MaterialNumber + "】",
            type: "warning",
            duration: 0,
          });
          return;
        }
        if (d1.length > 0) {
          let nums = parseInt(d1[0].Number) - parseInt(_Number);
          if (nums < 0) {
            this.$notify({
              title: "警告",
              message: "库存不足！【" + _MaterialNumber + "】",
              type: "warning",
              duration: 0,
            });
            return;
          } else {
            //缓存数据
            dsd.push({
              MaterialNumber: d1[0].MaterialNumber, //物料编号
              MaterialName: d1[0].MaterialName, //物料名称
              Thumbnail: d1[0].Thumbnail, //缩略图
              MaterialSpec: d1[0].MaterialSpec, //规格型号
              Enclosure: d1[0].Enclosure, //附件
              Number: tempArr[k].Number, //数量
              Company: d1[0].Company, //单位
              Remarks: d1[0].Remarks, //备注
              rknums: nums,
              creater: tempArr[k].creater, //创建人
              creatdate: tempArr[k].creatdate, //创建时间
            });
          }
        }
      }
      console.log("有效的dsd产品", dsd);
      this.tableData1 = dsd;
    },
    async findByMaterialNumber(_MaterialNumber) {
      let ds = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: _MaterialNumber,
            // Purpose: "生产制造"
          },
        },
      })
        .then((res) => {
          console.log("制造SN数据", res);
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //   params: {
      //     table: "ManufacturingExecution",
      //     where: { MaterialNumber: _MaterialNumber, IsDeliverGoods: "1" },
      //     sortJson: { SN: 1 },
      //   },
      // })
      //   .then((res) => {
      //     console.log("制造SN数据", res);
      //     ds = res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      return ds;
    },
  },
  created() {
    this.newview();
  },
};
</script>
<style scoped>
.df {
  float: right;
  margin-right: 5px;
}
.tabels {
  width: 100%;
  background-color: white;
}
.table {
  width: 100%;
  max-height: 470px;
}
.table1 {
  width: 98%;
  margin: 0 auto;
}
.yc {
  margin: 4px;
}
.container {
  width: 100%;
}
.tableData {
  min-width: 400px;
}
.el-card {
  width: 800px;
  margin-bottom: 20px;
  margin: 0px auto;
  padding: 20px;
}
.el-input {
  margin: 0;
}
font {
  color: rgb(77, 150, 3);
  font-weight: bold;
  animation: ss 5s infinite;
}
@keyframes ss {
  from {
    color: rgb(205, 226, 12);
  }
  to {
    color: rgb(247, 4, 4);
  }
}
.dialogBody {
  overflow: auto;
  width: 100%;
}
.printTable {
  text-align: center;
  border-collapse: collapse;

  min-width: 100%;
  max-height: 400px;
  border: #000 1px solid;
}
.printTable th,
.printTable td {
  border: #000 1px solid;
  line-height: 30px;
  padding: 0;
}
.printTable th > div:nth-of-type(1) {
  color: #000;
  font-weight: 500;
}
.bz {
  display: flex;
  justify-content: space-between;
}
h1 {
  margin: 0 auto;
  height: 50px;
  margin-top: 30px;
  text-align: center;
}
.d {
  float: right;
}
/* 合同模板1 */
.tableTR {
  display: flex;
  justify-content: space-around;
  height: 80px;
  color: #000;
}
.tableTR1 {
  display: flex;
  justify-content: space-around;
  height: 50px;
  color: #000;
}
.tableTD {
  flex: 1;
  height: 80px;
  line-height: 10px;
  border: #000 0.5px solid;
}
.tableTD1 {
  flex: 1;
  height: 50px;
  line-height: 10px;
  border: #000 0.5px solid;
}
.tableTD p:nth-of-type(1),
.tableTD1 p:nth-of-type(1) {
  font-size: 12px;
  font-family: "宋体";
}
.tableTD p:nth-of-type(2),
.tableTD1 p:nth-of-type(2) {
  font-size: 10px;
  font-family: "Arial";
}
.tableTR .tableTD2 {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80px;
  line-height: 5px;
  border: #000 0.5px solid;
  font-family: "宋体";
  font-size: 18px;
  font-weight: bold;
}
.tableTD2 P:nth-of-type(2) {
  font-size: 16px;
  margin: 0;
}
th > div {
  font-weight: 100;
  line-height: 20px;
  color: #000;
}
th > div:nth-of-type(1) {
  font-size: 12px;
}
th > div:nth-of-type(2) {
  font-size: 10px;
}
td {
  font-size: 12px;
}

/* 合同模板2 */
.tableTRs2 {
  border: 1px solid #000;
  height: 40px;
  line-height: 40px;
  display: flex;
  color: #000;
}
.fds {
  border-top: none;
}
.trds {
  border: 1px solid #000;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  color: #000;
  font-size: 22px;
}
.tableTRs2 > div {
  flex: 1;
}
</style>
