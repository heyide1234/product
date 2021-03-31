<style scoped lang="less">
.bigImg {
  height: 20px;
  width: 20px;
}
.bigImg:hover {
  height: 280px;
  width: 280px;
  background-color: teal;
  position: absolute;
  z-index: 9999;
  border: 3px solid rgb(45, 228, 8);
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
  line-height: 20px;
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
</style>
<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="采购单号"></el-step>
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
        <el-input v-model="freight" placeholder="请输入采购运费"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible2 = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="jsNum"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div class="dialogBody" id="dialogBody">
        <h2>
          四川凯迈新能源有限公司（材料采购单）<span
            style="color: red"
            v-show="Approval != '已审批'"
            >【{{ Approval }}】</span
          >
        </h2>
        <div class="htbh">合同编号：CG{{ htbh }}</div>
        <div class="htbh">供应商合同号：{{ GYSHTH }}</div>
        <div class="title-content">
          <div>
            <div class="text">供方：{{ gf }}</div>
          </div>
          <div>
            <div class="text">
              需方：<span>{{ xf }}</span>
            </div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">
              地址：<span class="t">{{ gfzsd }}</span>
            </div>
          </div>
          <div>
            <div class="text">
              地址：<span class="t">{{ xfzsd }}</span>
            </div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">联系人：{{ gflxr }}</div>
          </div>
          <div>
            <div class="text">联系人：{{ xflxr }}</div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="text">
              联系人地址：<span class="t">{{ gflxraddress }}</span>
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
              <th>单位</th>
              <th>单价</th>
              <th>金额</th>
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
        <p class="cont">二、付款计划</p>
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
        <div class="cont">
          <p>三、质量标准：<span class="xkx">按国家标准生产</span>。</p>
          <p>四、交付地点和方式：</p>
          <p>
            供方将货物送到需方指定地点
            <span class="xkx"
              >四川省成都市简阳市简州新城石养路2号（简州新城管委会旁） </span
            >，由
            <span class="xkx">供方</span> 负责卸货、收货，并经需方指定授权代表
            <span class="xkx">/</span>
            签收视为完成交付，交付货物的同时应提交相关单据、凭证包括（<span
              class="xkx"
            >
              <span class="xzY"></span>送货单、
              <span class="xzN"></span>物流收货确认函
            </span>
            ），需方授权代表依本条进行的签收不应视为对本合同项下货物数量、质量的认可。
          </p>
          <p>五、付款方式：</p>
          <p>
            1、本合同生效之日起<span class="xkx">/</span
            >，需方向供方支付本合同第一条所指货款的
            <span class="xkx">/</span> ，合计人民币：<span class="xkx">/</span
            >，并保证需方在 <span class="xkx">/</span> 个工作日内收到有效发票。
          </p>
          <p>
            2、本合同项下货物交付验收合格收到发票后
            <span class="xkx">按照付款计划需求</span
            >，需方向供方支付100%货款，合计人民币：<span class="xkx"
              ><b>{{ zj }}</b></span
            >元。
          </p>
          <p>
            3、合同金额的 <span class="xkx">/</span>
            %留作质保金。质保期满且产品符合质量要求，供方无违约行为的，则需方在质保期满之日起
            <span class="xkx">/</span> 个工作日内支付（不计息）。
          </p>
          <p>六、交付时间与数量：</p>
          <p>
            1、供方应在合同签订之日起
            <span class="xkx">按照付款计划需求</span
            >向需方交付本合同第一条所指货物。
          </p>
          <p>2、供方收到预付款日期以需方付款电子回单日期为准。</p>
          <p>七、包装、运输及风险承担</p>
          <p>
            1、由供方负责包装及运输，并承担相应责任。包装方式应满足货物的物理、化学性质及供方所选择的运输方式的要求。因包装不当导致货物毁损或灭失的，或运输过程引发的安全事故，由供方承担相应责任，由此产生的一切工期和经济损失均由供方承担，对不可抗拒原因造成的延误损失双方协商解决。
          </p>
          <p>八、验收、异议及售后服务</p>
          <p>
            1、验收期：自货物交付之日起 <span class="xkx">7</span>个工作日。
          </p>

          <p>
            2、按本合同第二条的标准验收。如供方供货存在数量、规格型号、产地、质量等级、尺寸、颜色、
            包装及标识完整、完好程度、交货资料完整等方面不合格情况，需方有权拒收、换货、退货直至解除合同。
          </p>
          <p>
            3、本合同项下货物质保期为 <span class="xkx">/</span>
            个月，自验收合格之日起算。质保期内，供方负责货物的免费维修及更换。供方应在需方通知后
            <span class="xkx"> /</span>
            小时内至现场维修，需要更换零部件的，供方应免费提供备品备件。
          </p>
          <p>九、开票方式:</p>
          <p>
            1、供方应在交付货物的同时按本合同第一条的约定向需方提供合法、有效的发票，开票信息以需方提供的开票资料为准。
          </p>
          <p>十、违约责任</p>
          <p>
            1、延迟交付：供方每延迟交付一日，应向需方支付合同总款的<span
              class="xkx"
            >
              1%</span
            >
            /日的违约金（可直接从需方应付货款中予以抵扣）；逾期
            7日以上的，需方有权解除合同，供方应在收到需方通知之日起10个工作日内退回需方已支付的全部货款。
          </p>
          <p>
            2、质量缺陷：产品存在质量缺陷的，供方应负责换货，经两次换货仍不能达到国家、行业有关标准及双方约定的，需方有权选择退货，换货，供方负责承担全部费用。
          </p>
          <p>
            3、权利瑕疵：供方提供的本合同项下货物，应无任何权利瑕疵（包括但不限于知识产权瑕疵）；否则，供方承担全部经济、法律责任。
          </p>
          <p>
            4、售后服务：供方未按合同约定提供售后服务的，包括但不限于质保期内拒绝或拖延提供质保服务的，需方有权委托他方进行，因此支出的费用均由供方承担，需方有权直接从任何应付供方的款项中进行抵扣。且前述情形不得成为供方对质量保证的免责。
          </p>
          <p>
            十一、纠纷解决：本合同适用中华人民共和国法律并依其解释。因履行本合同发生争议的，双方可先行协商处理；
            协商不成的，任一方均可将争议提交需方住所地有管辖权的人民法院诉讼解决。无争议部分应继续履行。
          </p>
          <p>十二、合同附件：</p>
          <p>
            1、
            首次签订合同或换证后，供方需提供《企业法人营业执照》复印件、《组织机构代码证》复印件、《税务登记证》复印件（均须加盖供方鲜章）；
          </p>
          <p>2、 供方账户及开户行资料，需方开票资料（盖章有效）；</p>
          <p>
            3、 双方签订的<span class="xzN"></span>质量保证协议、<span
              class="xzN"
            ></span
            >技术协议。
          </p>
          <p>
            4、本合同附件为本合同不可分割的组成部分。附件内容与合同正文内容不一致的，以合同正文内容为准。
          </p>
          <p>
            十三、供方需提供的质量证明材料包括：
            <span class="xkx">
              <span class="xzY"></span>产品合格证、
              <span class="xzY"></span>出厂检验报告、
              <span class="xzN"></span>国家或行业规定的检测报告、
              <span class="xzN"></span>生产许可证复印件等质量证明材料。
            </span>
          </p>
          <p>
            十四、本合同的变更或补充，应由双方协商一致后签订书面补充协议；补充协议与本合同不一致的，以补充协议为准。
          </p>
          <p>十五、本合同经供、需双方授权代表签字并加盖合同章即生效。</p>
          <p>
            十六、本合同一式<span class="xkx"> 3</span> 份，供方执
            <span class="xkx">1</span> 份，需方执
            <span class="xkx">2</span> 份。
          </p>
        </div>
        <div class="title-content tr">
          <div>
            <div class="texts ttt">供方（盖章）：{{ gf }}</div>
          </div>
          <div>
            <div class="texts">需方（盖章）：{{ xf }}</div>
          </div>
        </div>

        <div class="title-content">
          <div>
            <div class="texts ttt">授权代表（签字）：</div>
          </div>
          <div>
            <div class="texts">授权代表（签字）：</div>
          </div>
        </div>

        <div class="title-content">
          <div>
            <div class="texts ttt">电话：</div>
          </div>
          <div>
            <div class="texts">电话：</div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="texts ttt">传真：</div>
          </div>
          <div>
            <div class="texts">传真：</div>
          </div>
        </div>

        <div class="title-content">
          <div>
            <div class="texts ttt">邮箱：</div>
          </div>
          <div>
            <div class="texts">邮箱：</div>
          </div>
        </div>
        <div class="title-content">
          <div>
            <div class="texts ttt">签订日期：</div>
          </div>
          <div>
            <div class="texts">签订日期：</div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          v-print="printTable"
          v-preventReClick
          @click="prints"
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
          property="PurchaseNumber"
          label="采购单号"
        ></el-table-column>
        <el-table-column
          property="TotalAmount"
          label="采购金额"
        ></el-table-column>

        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>

        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系电话"
        ></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column label="发票状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.fpenclosure == undefined"
              type="info"
              icon="el-icon-paperclip"
              circle
              size="mini"
              plain
              slot="reference"
              v-preventReClick
            ></el-button>
            <el-button
              v-if="scope.row.fpenclosure != undefined"
              type="success"
              icon="el-icon-paperclip"
              circle
              size="mini"
              slot="reference"
              v-preventReClick
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              v-preventReClick
              @click="zk(scope.row)"
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
        <el-step title="采购明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          PurchaseNumber
        }}</font>
      </el-steps>
      <div class="animation"></div>

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          label="质检单号"
          property="CheckNumber"
        ></el-table-column>
        <el-table-column
          property="PurchaseNumber"
          label="采购单号"
        ></el-table-column>
        <el-table-column label="订单编号" property="OrderNumber">
        </el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>

        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>
        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系人电话"
        ></el-table-column>
        <el-table-column
          property="GYSHTH"
          label="供应商合同号"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>
        <!-- <el-table-column
          property="PlanNumber"
          label="计划采购数量"
        ></el-table-column> -->
        <el-table-column
          property="ShouldNumber"
          label="采购应到数量"
        ></el-table-column>
        <el-table-column
          property="ActualNumbertotal"
          label="实到总数"
        ></el-table-column>

        <el-table-column
          property="ActualNumber"
          label="本次实到数量"
        ></el-table-column>

        <el-table-column
          property="ActualPrice"
          label="采购单价"
        ></el-table-column>
        <el-table-column property="freight" label="采购运费"></el-table-column>

        <el-table-column
          property="PlannedDeliveryDate"
          label="计划交期"
        ></el-table-column>
        <el-table-column property="YYNUMS" label="盈余数"></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>说明: {{ scope.row.Remark }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          property="Money"
          label="小计"
          fixed="right"
        ></el-table-column>

        <el-table-column
          property="tMonry"
          label="合计"
          fixed="right"
        ></el-table-column>
        <el-table-column label="关于" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="primary"
              plain
              circle
              size="mini"
              icon="el-icon-postcard"
              v-preventReClick
              @click="freights"
            ></el-button>
            <el-button
              type="primary"
              plain
              circle
              size="mini"
              icon="el-icon-printer"
              v-preventReClick
              @click="ts()"
            ></el-button>
          </template>

          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="el-icon-top-left"
              circle
              plain
              title="采购撤回！"
              size="mini"
              v-preventReClick
              @click="hg(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
import { DXZH } from "common/utils/content";

export default {
  data() {
    return {
      fileList1: [], //上传
      Approval: "",
      freight: "", //运费
      htbh: "", //合同编号
      GYSHTH: "", //供应商合同号
      gf: "", //供方
      xf: "", //需方
      gflxr: "", //供方联系人
      xflxr: "", //需方联系人
      gfzsd: "", //供方住所地
      xfzsd: "", //需方住所地
      gflxraddress: "", //供方联系人住址
      zj: "", //总计
      querydata: [],
      // querydataH: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      printTable: {
        id: "dialogBody",
      },

      PurchaseNumber: "",
      total: 0,
      pagenums: 0,
      OrderNumberArr: [],
      tableData: [],
      tableData1: [],
      pyid: "",
      tempdata: [],
      tableData2: [],
      form: {
        CheckNumber: "", //质检单号
        OrderNumber: "", //订单编号
        PurchaseNumber: "", //采购编号
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Company: "", //单位
        Remarks: "", //备注
        Enclosure: "", //附件
        PlanNumber: "", //计划采购数量
        ShouldNumber: "", //采购应到数量
        ActualNumber: "", //实际采购数量
        ActualNumbertotal: "", //实际采购总数
        ActualPrice: "", //采购单价
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
        stts: "",
      },
    };
  },
  methods: {
    hg(row) {
      if (this.stts != "已驳回") {
        alert("只能撤销驳回的采购单！");
        return;
      }
      if (confirm("是否撤销该采购单对应的物料？")) {
        const loading = this.$loading({
          lock: true,
          text: "物料撤销中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$https({
          method: "post",
          url: "api/transaction/CGHGTransaction",
          data: {
            PurchaseNumberId: row._id,
            OrderNumber: row.OrderNumber,
            MaterialNumber: row.MaterialNumber,
            Number: row.ShouldNumber,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status) {
              this.finddetail();
              alert("完成！");
            }
            loading.close();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    freights() {
      this.freight = "";
      this.dialogFormVisible2 = true;
    },
    newview() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: { $gt: "0" } },
        },
      })
        .then((res) => {
          console.log(res);
          res.map((item) => {
            this.OrderNumberArr.push(item.OrderNumber);
          });
          this.getpage(this.OrderNumberArr);
          this.findHead(this.OrderNumberArr);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findHead(this.OrderNumberArr);
    },
    //获取页面数
    getpage(OrderNumberArr) {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "CGDhead",
          pageWhere: {
            OrderNumber: { $in: OrderNumberArr },
            // Approval: "已审批",
          },
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
    findHead(OrderNumberArr) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "CGDhead",
          PageNum: this.pagenums,
          sortJson: { PurchaseNumber: -1 },
          pageWhere: {
            OrderNumber: { $in: OrderNumberArr },
            // Approval: "已审批",
          },
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

    find1(v) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CollectionAndPaymentPlan",
          where: { DepClass: "CG", OddNumbers: v },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData2 = res.sort((a, b) => {
            return parseInt(a.IssueNumber) - parseInt(b.IssueNumber);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async ts() {
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
          ActualPrice,
          Money,
          PlannedDeliveryDate,
        } = item;
        dd.push({
          index: is,
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          Company, //单位
          ActualPrice,
          Money,
          PlannedDeliveryDate,
        });
      });
      this.querydata = dd;
      this.htbh = this.tableData1[0].PurchaseNumber; //合同编号
      this.GYSHTH = this.tableData1[0].GYSHTH;
      this.gf = this.tableData1[0].supplierName; //供方
      this.xf = "四川凯迈新能源公司"; //需方
      // this.tableData1[0].Contacts = "12345";
      this.gflxr = this.tableData1[0].Contacts; //供方联系人
      this.xflxr = sessionStorage["loginName"]; //需方代表人
      this.gfzsd = await this.getGYSaddress(this.tableData1[0].supplierNumber); //供方住所地
      this.xfzsd = "四川省成都市经济技术开发区成龙大道888号"; //需方住所地
      this.zj = this.tableData1[0].tMonry;

      this.gflxraddress = await this.getGYSLXRaddress(
        this.tableData1[0].supplierNumber
      );
      // this.querydataH = Object.keys(this.querydata[0]);
      this.find1(this.htbh);
      this.dialogFormVisible = true;
    },
    prints() {
      this.dialogFormVisible = false;
    },
    async getGYSaddress(supplierNumber) {
      let address = "";
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierNumber: supplierNumber },
        },
      })
        .then((res) => {
          address = res[0].Address;
        })
        .catch((err) => {
          console.log(err);
        });
      return address;
    },
    async getGYSLXRaddress(supplierNumber) {
      let ContactsAddress = "";
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierContacts",
          dataBase: "base",
          where: { supplierNumber: supplierNumber },
        },
      })
        .then((res) => {
          ContactsAddress = res[0].ContactsAddress;
        })
        .catch((err) => {
          console.log(err);
        });
      return ContactsAddress;
    },
    // 计算金额
    async jsNum() {
      this.dialogFormVisible2 = false;
      let temp = 0;
      let td = [...this.tableData1];

      for (let i = 0; i < td.length; i++) {
        let temcpc =
          parseFloat(td[i].ShouldNumber || "0") *
          parseFloat(td[i].ActualPrice || "0");
        temp += temcpc;
        td[i].Money = temcpc.toFixed(2) + "";
      }
      temp += parseFloat(this.freight || "0");
      for (let j = 0; j < td.length; j++) {
        await this.updated(
          td[j].Money,
          temp.toFixed(2) + "",
          this.freight,
          td[j]._id
        );
      }
      //修改采购单绑定金额
      this.updateCGDZJE(this.PurchaseNumber, temp.toFixed(2) + "");
      this.newview();
      this.tableData1 = [];
      this.finddetail();
    },
    async updated(Moneys, tMonrys, freight, ids) {
      // DB.update(data.table, { _id: DB.getObjectID(data.id) }, data.form)
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "IntransitOrder",
          id: ids,
          form: { Money: Moneys, tMonry: tMonrys, freight: freight },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCGDZJE(PurchaseNumber, TotalAmount) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "CGDhead",
          where: { PurchaseNumber: PurchaseNumber },
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

    //刷新界面
    async _newview() {
      this.tableData = [];
      this.tempdata = [];
      let d = [];
      let dts = await this.find(); //找寻对应页面的数据(销售订单)
      if (dts.length > 0) {
        //将该流程的所有信息查询

        for (let i = 0; i < dts.length; i++) {
          let orderNumber = dts[i].OrderNumber; //订单编号
          await this.$https({
            method: "get",
            url: "/api/apiModel/find",
            params: {
              table: "IntransitOrder",
              where: { OrderNumber: orderNumber },
              sortJson: { _id: -1 },
            },
          })
            .then((res) => {
              d.push(...res);
              //d.apply(d,res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.tempdata = d; //存储该流程的在途信息
        let po = []; //PO
        this.tempdata.filter((item) => {
          if (po.indexOf(item.PurchaseNumber) == -1) {
            po.push(item.PurchaseNumber);
          }
        });
        console.log("po", po);
        let tdd = [];
        for (let j = 0; j < po.length; j++) {
          this.tempdata.filter((item) => {
            if (item.PurchaseNumber == po[j]) {
              let temps = {
                OrderNumber: item.OrderNumber, //订单编号
                PurchaseNumber: item.PurchaseNumber, //采购编号
                supplierNumber: item.supplierNumber, //供应商编号
                supplierName: item.supplierName, //供应商名称
                Contacts: item.Contacts, //联系人
                ContactsPhone: item.ContactsPhone, //联系人电话
                TotalAmount: "", //总金额
                creatdate: getTime(), //创建时间
              };

              tdd.push(temps);
              po.splice(j, 1);
              j--;
            }
          });
        }
        console.log("tdd", tdd);
        for (let k = 0; k < tdd.length; k++) {
          if (await this.findCGD(tdd[k].PurchaseNumber)) {
            await this.insertCGD(tdd[k]);
          }
        }
        this.tableData = tdd;
      }
    },
    async findCGD(PurchaseNumber) {
      let dt = true;
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CGDhead",
          where: { PurchaseNumber: PurchaseNumber },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          if (res.length > 0) dt = false;
        })
        .catch((err) => {
          console.log(err);
        });
      return dt;
    },
    async insertCGD(v) {
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "CGDhead",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询对应的销售订单
    async find() {
      let dt = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: { $gte: "5" } },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          dt = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return dt;
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

    zk(row) {
      this.stts = row.Approval;
      this.PurchaseNumber = row.PurchaseNumber;
      this.Approval = row.Approval;
      this.tableData1 = [];
      this.finddetail();
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
          table: "IntransitOrder",
          where: { PurchaseNumber: this.PurchaseNumber },
        },
      })
        .then((res) => {
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });

      // this.tableData1 = jsNums(ds, "MaterialNumber", "ShouldNumber"); //?

      this.tableData1 = ds;
    },
    // //计算数量
    // jsNums(arrs, ids, attr) {
    //   // debugger;
    //   let arr = JSON.parse(JSON.stringify(arrs));
    //   let newArr = [];
    //   let obj = null;
    //   if (arr.length == 1) return arr;
    //   for (let i = 0; i < arr.length; i++) {
    //     if (obj == null) {
    //       obj = arr[i];
    //     } else {
    //       if (obj[ids] == arr[i][ids]) {
    //         obj[attr] = parseInt(obj[attr]) + parseInt(arr[i][attr]) + "";
    //         if (arr.length - 1 == i) newArr.push(obj);
    //       } else {
    //         newArr.push(obj);
    //         obj = arr[i];
    //       }
    //     }
    //   }
    //   console.log(newArr);
    //   return newArr;
    // },
    //////////////////////////////////////////////////////////////////

    async getCheckNumber() {
      let checkNum = "";
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M.padStart(2, "0");
      D.padStart(2, "0");
      let ces = parseInt(Y + M + D + "000"); //初始采购单号

      let cdss = { CheckNumber: { $regex: Y + M + D + "" } };
      let cgd = [];
      //查询最高采购单号
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "IncomingCheck",
          where: cdss,
        },
      })
        .then((res) => {
          cgd = res;
        })
        .catch((err) => {
          console.log(err);
        });
      cgd = cgd.filter((item) => {
        return item.CheckNumber != "";
      });

      if (cgd.length > 0) {
        cgd.sort((a, b) => {
          return parseInt(a.CheckNumber) - parseInt(b.CheckNumber);
        });
        ces = parseInt(cgd[cgd.length - 1].CheckNumber); //最高采购单号
      }

      checkNum = ces + 1 + "";
      return checkNum;
    },
    //编辑事件
    async handleEdit(scope) {
      this.id = scope.row._id;
      let CheckNumber = scope.row.CheckNumber;
      if (CheckNumber == "" || CheckNumber == null) {
        //查询质检单号
        CheckNumber = await this.getCheckNumber();
      }
      console.log("CheckNumber==", CheckNumber);
      let cfd =
        parseInt(scope.row.ActualNumbertotal) +
        parseInt(this.form.ActualNumber);
      let stu = "0";
      if (scope.row.ShouldNumber <= cfd) {
        stu = "1";
      }
      let fs = {
        ActualNumbertotal: cfd + "", //实到总数量
        ActualNumber: this.form.ActualNumber, //该次到货数量
        CheckNumber: CheckNumber,
        status: stu,
      };
      console.log("fs....", fs);
      //修改在途单
      this.update(fs);

      let tempsd = JSON.parse(JSON.stringify(scope.row));

      tempsd.ActualNumber = this.form.ActualNumber;
      tempsd.ActualNumbertotal = cfd + "";
      tempsd.status = "0";
      tempsd.TotalCheckNum = "0"; //检验总数
      tempsd.CheckNum = "0"; //质检数量
      tempsd.NGNum = "0"; //不合格数
      tempsd.CheckRemarks = ""; //检验结果
      tempsd.Checker = ""; //质检人
      tempsd.creatdate = getTime(); //创建时间
      this.$delete(tempsd, "_id");
      this.zjdinsert(tempsd); //新增质检
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();
      this.newview();

      //进入推单模式
      this.getProcessState(tempsd.OrderNumber, "IntransitOrder", "1", "6");
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IntransitOrder",
          where: { PurchaseNumber: this.PurchaseNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.tableData1 = res;
          console.log(this.tableData1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProcessState(orderNumber, table, statusing, processCode) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: table,
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          let csd = true;
          for (let i = 0; i < res.length; i++) {
            if (res[i].status != statusing) csd = false;
          }
          if (csd) {
            ///进入推单模式
            this.$https({
              method: "post",
              url: "/api/apiModel/updateByWhere",
              data: {
                table: "salesOrder",
                where: { OrderNumber: orderNumber },
                form: { processCode: processCode },
              },
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //质检单插入
    zjdinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "IncomingCheck",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //数据修改
    update(v) {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "IntransitOrder",
          form: v,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //////////////////////////////////////////////////////////////////
  },
  filters: {
    DX(v) {
      return DXZH(v);
    },
  },
  created() {
    this.newview();
  },
};
</script>

