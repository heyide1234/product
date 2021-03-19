<template>
  <div class="container">
    <div id="bk"></div>
    <!-- <form
      method="post"
      action=""
      enctype="multipart/form-data"
    >
      <input type="file" name="inputFile" id="file" />
      <input type="submit" value="上传" />
    </form> -->

    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="销售订单"></el-step>
      <a @click="reload">
        <i class="el-icon-refresh-right"></i>
      </a>
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
      <div class="dialogBody" id="dialogBody">
        <h2>
          四川凯迈新能源有限公司（产品销售单）<span
            style="color: red"
            v-show="Approval != '已审批'"
            >【{{ Approval }}】</span
          >
        </h2>

        <div class="htbh">系统订单编号：XS{{ form1.OrderNumber }}</div>
        <div class="htbh te">客户订单编号：{{ ddbh }}</div>
        <div class="title-content">
          <div>
            <div class="text">需方：{{ xf }}</div>
          </div>
          <div>
            <div class="text">供方：<span>四川凯迈新能源有限公司</span></div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">
              地址：<span class="t">{{ xfdz }}</span>
            </div>
          </div>
          <div>
            <div class="text">
              地址：<span class="t"
                >四川省成都市经济技术开发区成龙大道888号
              </span>
            </div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">联系人：{{ xflxr }}</div>
          </div>
          <div>
            <div class="text">联系人：{{ gflxr }}</div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">
              联系人地址：<span class="t">{{ xfxlxrdz }}</span>
            </div>
          </div>
        </div>

        <p class="cont">一.货物信息</p>
        <table id="printTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格</th>
              <th>数量</th>

              <th>单价</th>
              <th>金额</th>
              <th>单位</th>
              <th>计划交期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1, index) in querydata" :key="index">
              <td v-for="(item2, key) in item1" :key="key">
                {{ item2 }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="9" id="jhe">
                <span
                  >合计（小写）：<b class="zjs">{{ zj }}</b>
                </span>
                <span>合计（大写）：{{ zj | DX }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="9" id="jhe">
                <div class="fl">
                  （一）、供方开具1、增值税专用发票
                  <div class="xzY"></div>
                  13%

                  <div class="xzN"></div>
                  3% 2、
                  <div class="xzN"></div>
                  增值税普通发票 3、
                  <div class="xzN"></div>
                  定额发票 4、
                  <div class="xzN"></div>
                  电子发票
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="9" id="jhe">
                <div class="fl">
                  （二）、运费承担方
                  <div class="xzY"></div>
                  供方
                  <div class="xzN"></div>
                  需方
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <p class="cont">二、收款计划</p>
        <table id="printTable">
          <thead>
            <tr>
              <th>期号</th>
              <th>计划付款金额</th>
              <th>计划付款日期</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ite, index) in tableData2" :key="index">
              <td>{{ ite.IssueNumber }}</td>
              <td>{{ ite.PlannedAmount }}</td>
              <td>{{ ite.AppointedTime }}</td>
              <td>{{ ite.Remarks }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" v-print="printTable" @click="prints"
          >打 印</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="订单编号">
          <el-input v-model="form.OrderNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="用途">
          <el-select
            v-model="form.Purpose"
            style="width: 100%"
            @change="$forceUpdate()"
          >
            <el-option value="生产制造"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户订单编号">
          <el-input v-model="form.CustomerOrderNumber"></el-input>
        </el-form-item>

        <el-form-item label="客户编号">
          <el-select
            v-model="form.CustomerNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="CustomerNumberChange"
          >
            <el-option
              v-for="(item, key) in CustomerInfo"
              :key="key"
              :value="item.CustomerNumber"
            >
              <span style="float: left">{{ item.CustomerNumber }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.CustomerName }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-select
            v-model="form.Contacts"
            placeholder="请选择"
            style="width: 100%"
            @change="CustomerNumberChange2"
          >
            <el-option
              v-for="(item, key) in CustomerInfo2"
              :key="key"
              :value="item.Contacts"
            >
              <span style="float: left">{{ item.Contacts }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.ContactsPhone }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="附件">
          <el-input v-model="form.enclosure"></el-input>
        </el-form-item> -->
        <el-form-item label="客户名称">
          <el-input v-model="form.CustomerName" disabled></el-input>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-input v-model="form.CustomerClass" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户备注">
          <el-input v-model="form.CustomerRemarks" disabled></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号">
          <el-input v-model="form.TIN" disabled></el-input>
        </el-form-item>

        <el-form-item label="开户行">
          <el-input v-model="form.Bank" disabled></el-input>
        </el-form-item>

        <el-form-item label="账户">
          <el-input v-model="form.Account" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.Address" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model="form.CompanyPhone" disabled></el-input>
        </el-form-item>

        <el-form-item label="联系人电话">
          <el-input v-model="form.ContactsPhone" disabled></el-input>
        </el-form-item>

        <el-form-item label="联系人地址">
          <el-input v-model="form.ContactsAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱">
          <el-input v-model="form.ContactsEmail" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人备注">
          <el-input v-model="form.ContactsRemarks" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="表单" :visible.sync="dialogFormVisible1">
      <el-form ref="form1" :model="form1">
        <el-form-item label="订单编号">
          <el-input v-model="form1.OrderNumber" disabled></el-input>
        </el-form-item>

        <el-form-item
          label="分类选择"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-cascader
            style="width: 100%"
            v-model="classvalue1"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="产品编号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <!-- <el-input v-model="form.MaterialNumber"></el-input> -->
          <el-select
            v-model="form1.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="MaterialNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
              :key="key"
              :value="item.MaterialNumber"
            >
              <span style="float: left">{{ item.MaterialNumber }}</span>

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Company }}</span
              >

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialSpec }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialName }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="产品名称"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.MaterialName" disabled></el-input>
        </el-form-item>
        <span style="color: red;font-size：10px">{{ sx }}</span>
        <el-form-item
          label="产品价格"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.MaterialPrice" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="产品数量"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.Number"></el-input>
        </el-form-item>

        <el-form-item
          label="计划交期"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-date-picker
            v-model="form1.PlannedDeliveryDate"
            style="width: 100%"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="客户物料编号">
          <el-input v-model="form1.CustomerMaterialNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户物料名称">
          <el-input v-model="form1.CustomerMaterialName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit1">确 定</el-button>
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
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>
        <el-table-column
          property="CustomerOrderNumber"
          label="客户订单编号"
        ></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          property="CustomerClass"
          label="行业类别"
        ></el-table-column>
        <el-table-column
          property="CustomerRemarks"
          label="客户备注"
        ></el-table-column>
        <el-table-column property="TIN" label="纳税人识别号"></el-table-column>

        <el-table-column property="Bank" label="开户行"></el-table-column>
        <el-table-column property="Account" label="账户"></el-table-column>
        <el-table-column property="Address" label="地址"></el-table-column>
        <el-table-column
          property="CompanyPhone"
          label="公司电话"
        ></el-table-column>
        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系人电话"
        ></el-table-column>
        <el-table-column
          property="ContactsAddress"
          label="联系人地址"
        ></el-table-column>
        <el-table-column
          property="ContactsEmail"
          label="联系人邮箱"
        ></el-table-column>

        <el-table-column
          property="ContactsRemarks"
          label="联系人备注"
        ></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <!-- <p>创建日期: {{ scope.row.enclosure }}</p> -->

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="130" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              @click="handleAdd"
            ></el-button>
            <!-- <el-button
              type="danger"
              icon="el-icon-delete-solid"
              plain
              circle
              size="mini"
              @click="yc"
            ></el-button> -->
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              title="展开明细"
              type="primary"
              icon="el-icon-document-copy"
              circle
              size="mini"
              plain
              @click="findDetail(scope.row)"
            ></el-button>
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`http://172.16.1.10:3001/upload?name=salefj_${salesOrder}.pdf`"
                :on-success="successHandlel"
                :limit="1"
                :file-list="fileList"
              >
                <el-button
                  type="primary"
                  icon="el-icon-upload2"
                  size="mini"
                  plain
                  >上传</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  <a
                    target="_blank"
                    :href="`http://172.16.1.10:3001/download?name=salefj_${scope.row.enclosure}`"
                    >下载模板</a
                  >
                </div>
              </el-upload>
              <el-button
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                @click="scfj(scope.row)"
              ></el-button>
            </el-popover>

            <el-button
              :disabled="scope.row.processCode != '1' ? true : false"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              plain
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="df">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="销售订单明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          form1.OrderNumber
        }}</font>
      </el-steps>
      <el-table
        class="table1"
        height="300"
        :data="tableData1"
        :style="{ display: tableVisible }"
      >
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
        <el-table-column property="Number" label="计划数"></el-table-column>
        <el-table-column property="PNum" label="产品数量"></el-table-column>

        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>

        <el-table-column
          property="CustomerMaterialName"
          label="客户物料名称"
        ></el-table-column>
        <el-table-column property="jine" label="金额"></el-table-column>
        <el-table-column property="tjine" label="总金额"></el-table-column>
        <el-table-column
          property="PlannedDeliveryDate"
          label="计划交期"
        ></el-table-column>

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
        <el-table-column label="操作" min-width="120" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              @click="handleAdd1"
            ></el-button>
            <el-button
              title="流程开启"
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              @click="handleCirculationstate"
            ></el-button>
            <el-button
              title="计算"
              type="primary"
              plain
              circle
              size="mini"
              icon="el-icon-postcard"
              @click="jsNum"
            ></el-button>
            <el-button
              title="打印"
              type="primary"
              icon="el-icon-printer"
              circle
              size="mini"
              plain
              @click="print"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              :disabled="scope.row.status != '0' ? true : false"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEdit1(scope.row)"
            ></el-button>
            <el-button
              :disabled="scope.row.status != '0' ? true : false"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete1(scope.row)"
            ></el-button>
            <!-- <el-button
  
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
            
            ></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/utils/index";
import { getJL } from "business/MeterialClass";
import { DXZH } from "common/utils/content";

export default {
  inject: ["reload"],
  data() {
    return {
      salesOrder: "",
      CustomerNumber: "",
      sx: "",
      fileList: [], //上传
      ddbh: "", //客户订单编号
      xf: "", //需方
      xfdz: "", //需方地址
      xflxr: "", //需方联系人
      xfxlxrdz: "", //需方联系人地址
      gflxr: "", //供方联系人
      zj: "", //总计
      querydata: [],
      printTable: {
        id: "dialogBody",
      },
      CustomerInfo: [],
      CustomerInfo2: [],
      operation: "", //当前操作切换
      operation1: "",
      pagenums: 0,
      newclassDate: [],
      OrderNumbers: "",
      OrderNumbersT: "",
      classvalue1: [],
      Approval: "",
      form: {
        OrderNumber: "", //订单编号
        CustomerOrderNumber: "", //客户订单编号
        CustomerNumber: "", //客户编号
        CustomerName: "", //客户名称
        CustomerClass: "", //客户分类
        CustomerRemarks: "", //客户备注
        TIN: "", //纳税人识别号(Taxpayer identification number)
        Bank: "", //开户行
        Account: "", //账户
        Address: "", //地址
        CompanyPhone: "", //公司电话
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        ContactsAddress: "", //联系人地址
        ContactsEmail: "", //联系人邮箱
        ContactsRemarks: "", //联系人备注
        Purpose: "生产制造", //用途
        enclosure: "", //附件
        processCode: "0", //流程码
        allowHG: "true", //是否允许订单回滚
        Approval: "未审批", //审批状态
        Approver: "", //审批人
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      form1: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        Number: "", //产品数量
        Thumbnail: "",
        MaterialSpec: "",
        jine: "", //金额
        tjine: "", //总金额
        PNum: "", //计划数
        PlannedDeliveryDate: "", //计划交期
        CustomerMaterialNumber: "", //客户物料编号
        CustomerMaterialName: "", //客户物料名称
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      st: false,
      total: 0,
      id: {},
      id1: "",
      name: "",
      name1: "",
      search: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      tableVisible: "none",
      tableData: [],
      tableData1: [],
      MaterialInfo: [],
      tableData2: [],
      flagst: false,
    };
  },
  methods: {
    dl() {
      this.$https({
        method: "get",
        url: "http://localhost:3001/test",
        params: {
          table: "",
          where: {},
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    successHandlel(response, file, fileList) {
      console.log(response, file, fileList);
      console.log("上传成功！", file.name);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: this.salesOrder },
          form: { enclosure: this.salesOrder + ".pdf" },
        },
      })
        .then((res) => {
          console.log(res);
          this.newview();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scfj(row) {
      this.salesOrder = row.OrderNumber;
      if (row.enclosure) {
        this.fileList = [{ name: "" }];
        this.fileList[0].name = row.enclosure;
      } else {
        this.fileList = [];
      }
    },
    // 计算金额
    async jsNum() {
      let temp = 0;

      let td = [...this.tableData1];

      for (let i = 0; i < td.length; i++) {
        let temcpc =
          parseFloat(td[i].Number || "0") *
          parseFloat(td[i].MaterialPrice || "0");
        temp += temcpc;
        td[i].Money = temcpc.toFixed(2) + "";
      }

      for (let j = 0; j < td.length; j++) {
        await this.updated(td[j].Money, temp.toFixed(2) + "", td[j]._id);
      }
      //修改采购单绑定金额
      this.updateXSDZJE(this.form1.OrderNumber, temp.toFixed(2) + "");
      this.tableData1 = [];
      this.finddetail();
    },
    updateXSDZJE(OrderNumber, TotalAmount) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: OrderNumber },
          form: { TotalAmount: TotalAmount },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    prints() {
      this.dialogFormVisible = false;
    },
    async updated(Moneys, tMonrys, ids) {
      console.log(Moneys, tMonrys, ids);
      // DB.update(data.table, { _id: DB.getObjectID(data.id) }, data.form)
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrderDetail",
          id: ids,
          form: { jine: Moneys, tjine: tMonrys },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async finddetail() {
      //过滤数据
      let ds = [];
      // ds = this.tempdata.filter((item) => {
      //   return item.PurchaseNumber == this.PurchaseNumber;
      // });
      // ds.sort((a, b) => {
      //   return a.MaterialNumber - b.MaterialNumber;
      // });
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "salesOrderDetail",
          where: { OrderNumber: this.form1.OrderNumber },
        },
      })
        .then((res) => {
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });

      this.tableData1 = ds;
      //jsNums(ds, "MaterialNumber", "ShouldNumber"); //?

      //this.tableData1 = ds;
    },
    async handleCirculationstate() {
      if (!this.flagst) return;
      //开启流程
      if (this.tableData1.length == 0 || this.tableData1[0].status == "1")
        return;
      if (this.Approval != "已审批") {
        alert("未审批！");
        return;
      }
      let datas = this.tableData1;
      let OrderNumber = this.form1.OrderNumber;

      //  if (this.st) return;
      let firm = confirm("是否开启推单模式，下次将不可再次开启！");
      if (firm) {
        const loading = this.$loading({
          lock: true,
          text: "MRP计算...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        await this.$https({
          method: "post",
          url: "api/transaction/salesOrderProcessTransaction",
          data: {
            datas: datas,
            OrderNumber: OrderNumber,
            loginName: sessionStorage.getItem("loginName"),
            times: getTime(),
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status) {
              this.id1 = res.data.id1;
            }
            setTimeout(() => {
              loading.close();
            }, 5000);
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              loading.close();
            }, 5000);
          });

        this.tableData1 = [];
        this.OrderNumbers = "";
      }
    },

    findByPageNums() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerManager",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          console.log(res);
          this.CustomerInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findByPageNums2() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerContacts",
          dataBase: "base",
          where: { CustomerNumber: this.form.CustomerNumber },
          sortJson: { _id: 1 },
        },
      })
        .then((res) => {
          console.log(res);
          this.CustomerInfo2 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    CustomerNumberChange() {
      let cds = this.CustomerInfo.filter((res) => {
        return this.form.CustomerNumber == res.CustomerNumber;
      });
      this.form.CustomerNumber = cds[0].CustomerNumber;
      this.form.CustomerName = cds[0].CustomerName;
      this.form.CustomerClass = cds[0].CustomerClass; //行业类别
      this.form.CustomerRemarks = cds[0].CustomerRemarks; //客户备注
      this.form.TIN = cds[0].TIN; //纳税人识别号(Taxpayer identification number)
      this.form.Bank = cds[0].Bank; //开户行
      this.form.Account = cds[0].Account; //账户
      this.form.Address = cds[0].Address; //地址
      this.form.CompanyPhone = cds[0].CompanyPhone; //公司电话

      //  this.form.Contacts = "";
      this.form.ContactsPhone = "";
      this.form.ContactsAddress = ""; //联系人地址
      this.form.ContactsEmail = ""; //联系人邮箱
      this.form.ContactsRemarks = ""; //联系人备注

      this.findByPageNums2();
    },

    CustomerNumberChange2() {
      let cds = this.CustomerInfo2.filter((res) => {
        return this.form.Contacts == res.Contacts;
      });
      this.form.ContactsPhone = cds[0].ContactsPhone;
      this.form.ContactsAddress = cds[0].ContactsAddress; //联系人地址
      this.form.ContactsEmail = cds[0].ContactsEmail; //联系人邮箱
      this.form.ContactsRemarks = cds[0].ContactsRemarks; //联系人备注
    },
    MaterialNumberChange() {
      let cd = this.MaterialInfo.filter((res) => {
        return res.MaterialNumber == this.form1.MaterialNumber;
      });

      this.form1.MaterialName = cd[0].MaterialName;
      this.form1.Thumbnail = cd[0].Thumbnail;
      this.form1.MaterialSpec = cd[0].MaterialSpec;

      this.sx = "已过期或不存在";
      this.form1.MaterialPrice = "";
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: {
            MaterialNumber: this.form1.MaterialNumber,
            CustomerNumber: this.CustomerNumber,
            Approval: "已审批",
            prescription: { $gte: getTime() },
          },
        },
      })
        .then((res) => {
          console.log("查询结果", res);

          if (res.length > 0) {
            this.form1.MaterialPrice = res[0].Price;
            this.sx = res[0].prescription;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //级联
    getMaterialList() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialClass",
          dataBase: "base",
          where: {},
          sortJson: { Class1Num: 1, Class2Num: 1, Class3Num: 1 },
        },
      })
        .then((res) => {
          console.log(res);
          this.classDate = res;
          this.newclassDate = getJL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value) {
      // this.form.Class1Num = value[0];
      // this.form.Class2Num = value[1];
      // this.form.Class3Num = value[2];
      this.parents = this.form.Parent;
      this.form.Parent = "";
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: {
            Class1Num: value[0],
            Class2Num: value[1],
            Class3Num: value[2],
            Approval: "已审批",
            prescription: { $gte: getTime() },
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.MaterialInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //状态
    // handleCirculation(row) {
    //   console.log("row...", row);
    //   this.id1 = row._id;
    //   this.$delete(row, "_id");
    //   row.status = "1";
    //   row.creater = sessionStorage.getItem("loginName");
    //   row.creatdate = getTime();
    //   this.form1 = row;
    //   this.update1(); //修改销售单明细状态为1（不可编辑）

    //   let dt = {
    //     OrderNumber: row.OrderNumber, //订单编号
    //     MaterialNumber: row.MaterialNumber, //产品编号
    //     MaterialName: row.MaterialName, //产品名称
    //     MaterialPrice: row.MaterialPrice, //产品价格
    //     Number: row.PNum, //应出数量
    //     CustomerMaterialNumber: row.CustomerMaterialNumber, //客户物料编号
    //     CustomerMaterialName: row.CustomerMaterialName, //客户物料名称
    //     DeliverGoodsTotal: "0", //实际出货总数
    //     DeliverGoods: "0", //实际出货数
    //     Inventory: "0", //库存数
    //     status: "0", //状态
    //     creater: sessionStorage.getItem("loginName"), //创建人
    //     creatdate: getTime(), //创建时间
    //   };
    //   this.insertSalesInvoice(dt); //添加销售发货单
    // },

    // async getProcessState(orderNumber, table, statusing, processCode) {
    //   await this.$https({
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: table,
    //       where: { OrderNumber: orderNumber },
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       console.log(statusing);

    //       ///进入推单模式
    //       this.$https({
    //         method: "post",
    //         url: "/api/apiModel/updateByWhere",
    //         data: {
    //           table: "salesOrder",
    //           where: { OrderNumber: orderNumber },
    //           form: { processCode: processCode },
    //         },
    //       })
    //         .then((res) => {
    //           console.log(res);
    //           this.newview();
    //           this.tableData1 = [];
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    //退送制造计划单
    // doManufacturingPlan(dt) {
    //   if (parseInt(dt.Number) == 0) return;
    //   let v = {
    //     OrderNumber: dt.OrderNumber, //订单编号
    //     MaterialNumber: dt.MaterialNumber, //产品编号
    //     MaterialName: dt.MaterialName, //产品名称
    //     Number: dt.Number, //产品数量
    //     SurplusNumber: dt.Number, //剩余分配数量
    //     Thumbnail: dt.Thumbnail,
    //     MaterialSpec: dt.MaterialSpec,
    //     status: "1", //状态1
    //     creater: sessionStorage.getItem("loginName"), //创建人
    //     creatdate: getTime(), //创建时间
    //   };

    //   this.$https({
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "ManufacturingPlan",
    //       form: v,
    //     },
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // },
    // insertSalesInvoice(v) {
    //   this.$https({
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "salesInvoice",
    //       form: v,
    //     },
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // },
    //明细添加
    handleAdd1() {
      // alert("this.st" + this.st);
      if (!this.flagst) return;
      this.operation1 = "add";
      this.sx = "";
      this.form1.MaterialNumber = ""; //产品编号
      this.form1.MaterialName = ""; //产品名称
      this.form1.MaterialPrice = ""; //产品价格
      this.form1.Number = ""; //产品数量
      this.form1.CustomerMaterialNumber = ""; //客户物料编号
      this.form1.CustomerMaterialName = ""; //客户物料名称

      this.dialogFormVisible1 = true;
    },
    //明细编辑
    handleEdit1(row) {
      this.operation1 = "update";
      this.sx = "";
      this.dialogFormVisible1 = true;
      this.id1 = row._id;
      this.name1 = row.creater;
      this.$delete(row, "_id");
      this.form1 = row;
    },
    //明细删除
    handleDelete1(row) {
      this.id1 = row._id;
      this.name1 = row.creater;
      this.del1();
      this.newview1();
    },
    //明细数据查询
    findDetail(row) {
      this.flagst = true;
      if (row.processCode != "1") {
        this.flagst = false;
      }
      this.CustomerNumber = row.CustomerNumber;
      this.tableVisible = "block";
      this.Approval = row.Approval;
      this.ddbh = row.CustomerOrderNumber; //客户订单编号
      this.xf = row.CustomerName; //需方
      this.xfdz = row.Address; //需方地址
      this.xflxr = row.Contacts; //需方联系人
      this.xfxlxrdz = row.ContactsAddress;
      this.gflxr = sessionStorage["loginName"];

      if (row.processCode != "1") this.st = true;
      if (row.processCode == "1") this.st = false;
      // alert("this.st=====" + row.status);
      this.form1.OrderNumber = row.OrderNumber;
      this.find1();
    },
    //明细请求
    async find1() {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrderDetail",
          where: { OrderNumber: this.form1.OrderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打印
    print() {
      let dd = [];
      let is = 0;
      this.tableData1.forEach((item) => {
        is++;
        let {
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          MaterialPrice,
          jine,
          Company,
          PlannedDeliveryDate,
        } = item;
        let tds = {
          index: is,
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量

          MaterialPrice,
          jine,
          Company,
          PlannedDeliveryDate,
        };
        tds.Company = "pcs";
        dd.push(tds);
      });
      this.querydata = dd;
      this.zj = this.tableData1[0].tjine;
      this.findr(this.form1.OrderNumber);
      this.dialogFormVisible2 = true;
    },
    findr(v) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CollectionAndPaymentPlan",
          where: { DepClass: "XS", OddNumbers: v },
        },
      })
        .then((res) => {
          console.log("/////", res, v);
          this.tableData2 = res.sort((a, b) => {
            return parseInt(a.IssueNumber) - parseInt(b.IssueNumber);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "salesOrder",
          pageWhere: { Purpose: { $regex: "生产制造" } },
        },
      })
        .then((res) => {
          console.log("总页数");
          console.log(res);
          this.total = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getsoccess(orderNumber) {
      let flag = 0;
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          flag = res[0].processCode;
        })
        .catch((err) => {
          console.log(err);
        });
      return flag;
    },
    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.form.Purpose = "生产制造";
      this.form.Approval = "未审批"; //审批状态
      this.form.Approver = ""; //审批人
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = { id: row._id };
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = row;
    },
    //删除事件
    async handleDelete(row) {
      if ((await this.getsoccess(row.orderNumber)) != "1") return;
      this.id = { id: row._id };
      this.name = row.creater;
      this.del();
      this.newview();
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findByPageNum();
    },
    //多选
    yc() {
      if (this.$refs.tableselectData.selection.length > 0) {
        let val = this.$refs.tableselectData.selection;
        for (let i = 0; i < val.length; i++) {
          this.id = { id: val[i]._id };
          this.del();
        }
        this.newview();
      }
    },
    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    newview1() {
      this.find1();
    },

    async findorders(c) {
      console.log("当前数据1112==>", c);
      let cos = c;
      let cdss = { OrderNumber: { $regex: cos } };
      let codesq = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: cdss,
        },
      })
        .then((res) => {
          console.log("当前数据11==>", res);
          codesq = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return codesq;
    },
    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M = M.padStart(2, "0");
      D = D.padStart(2, "0");
      let Onumber = "9" + Y + M + D + "000";

      let ds = await this.findorders("9" + Y + M + D);

      if (ds.length == 1) {
        Onumber = ds[0].OrderNumber;
      }
      if (ds.length > 1) {
        for (let i = 0; i < ds.length; i++) {
          if (parseInt(ds[i].OrderNumber) > parseInt(Onumber))
            Onumber = ds[i].OrderNumber;
        }
      }

      this.form.OrderNumber = parseInt(Onumber) + 1 + "";
      console.log(this.form.OrderNumber);

      /////////////////////

      this.form.enclosure = "";
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      this.form.status = "0";
      this.form.allowHG = "true";
      if (this.operation === "add") {
        this.form.processCode = "1";
        await this.add();
      } else {
        await this.update();
      }
      this.newview();
    },
    //提交按钮
    onSubmit1() {
      if (
        !this.form1.MaterialName ||
        !this.form1.MaterialPrice ||
        !this.form1.Number ||
        !this.form1.PlannedDeliveryDate
      ) {
        alert("必填内容不能为空");
        console.log(this.form1.PlannedDeliveryDate);
        return;
      }
      this.dialogFormVisible1 = false;
      this.form1.creater = sessionStorage.getItem("loginName");
      this.form1.creatdate = getTime();
      if ((this.form1.PlannedDeliveryDate + "").includes("/")) {
        alert("日期未填写！");
        return;
      }
      this.form1.PlannedDeliveryDate = getTime(
        this.form1.PlannedDeliveryDate
      ).split(" ")[0];
      this.form1.tjine = "";
      this.form1.jine = "";
      this.form1.PNum = this.form1.Number;

      if (this.operation1 === "add") {
        this.form1.status = "0";

        this.add1();
      } else {
        this.update1();
      }
    },
    /////crud
    // 数据添加
    async add() {
      //  if (this.auth()) return;
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "salesOrder",
          form: this.form,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    add1() {
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "salesOrderDetail",
          form: this.form1,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview1();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 数据删除
    del() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "salesOrder",
          id: this.id.id,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    del1() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "salesOrderDetail",
          id: this.id1,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //数据修改
    update12() {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: this.form1.OrderNumber },
          form: { status: "1" },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //数据修改
    async update() {
      // if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrder",
          id: this.id.id,
          form: this.form,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    update1() {
      // if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrderDetail",
          id: this.id1,
          form: this.form1,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview1();
        })
        .catch(function (err) {
          console.log(err);
        });

      // this.$https({
      //   method: "post",
      //   url: "/api/apiModel/insert",
      //   data: {
      //     table: "MaterialDemand",
      //     form: this.form1
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "salesOrder",
          PageNum: this.pagenums,
          sortJson: { OrderNumber: -1 },
          pageWhere: { Purpose: { $regex: "生产制造" } },
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
  },
  filters: {
    DX(v) {
      return DXZH(v);
    },
  },
  created() {
    this.newview();
    this.getMaterialList(); //级联
    this.findByPageNums();
  },
};
</script>
<style scoped lang="less">
#bk {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
}
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
  font: 10px;
  font-family: SimSun;
}
#printTable {
  text-align: center;
  border-collapse: collapse;

  min-width: 100%;
  max-height: 400px;
  border: #000 1px solid;
}
#printTable th,
#printTable td {
  border: #000 1px solid;
  line-height: 30px;
}
.htbh {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin: 0 auto;
  font-size: 9px;
  font-family: SimSun;
  line-height: 30px;
}
.cont {
  width: 90%;
  margin: 0 auto;
}

.title-content {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  div {
    width: 45%;
    height: 30px;
    line-height: 35px;
  }
  .text {
    border-bottom: black 1px solid;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-family: SimSun;
    font-size: 10px;
  }
  .texts {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .t {
    font-size: 10px;
    font-family: SimSun;
  }
}
#jhe {
  span {
    float: left;
    margin-right: 30px;
  }
}
.top-buttom {
  line-height: 30px;
}
.xzY {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 1px 2px -1px 2px;
  background-color: black;
  border: black 1px solid;
}
.xzN {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 1px 2px -1px 2px;
  border: black 1px solid;
}
.xkx {
  border-bottom: 1px black solid;
  display: inline-block;
  height: 20px;

  padding: 0px 10px;
}
table {
  font-size: 10px;
  font-family: SimSun;
}
.fl {
  text-align: start;
}
h2 {
  margin: 0 auto;

  text-align: center;
}
p {
  line-height: 22px;
  margin: 0px;
  font-family: SimSun;
  font-size: 10px;
}
.tr {
  margin-top: 20px;
}
.ttt {
  margin-left: 50px;
}
.te {
  margin-top: -10px;
}
</style>
