<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="供应商管理表"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="供应商申请号">
          <el-input v-model.trim="form.supplierSQNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商编号">
          <el-input v-model.trim="form.supplierNumber"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model.trim="form.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-input v-model.trim="form.Class"></el-input>
        </el-form-item>
        <el-form-item label="供应商备注">
          <el-input v-model.trim="form.supplierRemarks"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号">
          <el-input v-model.trim="form.TIN"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model.trim="form.Bank"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model.trim="form.Account"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model.trim="form.Address"></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model.trim="form.CompanyPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="onSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="580"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column property="supplierSQNumber" label="供应商申请号">
        </el-table-column>
        <el-table-column property="supplierNumber" label="供应商编号">
        </el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
          min-width="150"
          ><template #header>
            <el-input
              size="mini"
              v-model="search"
              @change="searchs"
              prefix-icon="el-icon-search"
              placeholder="供应商名称"
            /> </template
        ></el-table-column>
        <el-table-column
          property="Class"
          label="行业类别"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="supplierRemarks"
          label="供应商备注"
        ></el-table-column>
        <el-table-column
          property="TIN"
          label="纳税人识别号"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="Bank"
          label="开户行"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="Account"
          label="账户"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="Address"
          label="地址"
          min-width="150"
        ></el-table-column>
        <el-table-column
          property="CompanyPhone"
          label="公司电话"
          min-width="150"
        ></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column property="prescription" label="时效"></el-table-column>

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
        <el-table-column label="营业执照" min-width="60" fixed="right">
          <template slot="header">
            <span class="headercolor">营业执照</span>
          </template>
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="YYZZsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierYYZZfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierYYZZ}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierYYZZ',
                      scope.row.supplierYYZZ,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierYYZZ == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjYYZZ(scope.row)"
              ></el-button>
              <el-button
                v-if="scope.row.supplierYYZZ != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjYYZZ(scope.row)"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="开户许可证" min-width="60" fixed="right">
          <template slot="header">
            <span class="headercolor">开户许可证</span>
          </template>
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="KHXKZsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierKHXKZfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierKHXKZ}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierKHXKZ',
                      scope.row.supplierKHXKZ,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierKHXKZ == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjKHXKZ(scope.row, 'supplierKHXKZ_')"
              ></el-button>
              <el-button
                v-if="scope.row.supplierKHXKZ != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjKHXKZ(scope.row, 'supplierKHXKZ_')"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="ISO" min-width="60">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="ISOsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierISOfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierISO}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierISO',
                      scope.row.supplierISO,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierISO == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjISO(scope.row, 'supplierISO_')"
              ></el-button>
              <el-button
                v-if="scope.row.supplierISO != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjISO(scope.row, 'supplierISO_')"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="环保" min-width="60">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="HBsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierHBfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierHB}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierHB',
                      scope.row.supplierHB,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierHB == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjHB(scope.row, 'supplierHB_')"
              ></el-button>
              <el-button
                v-if="scope.row.supplierHB != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjHB(scope.row, 'supplierHB_')"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="代理授权证书" min-width="60">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="DLSQZSsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierDLSQZSfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierDLSQZS}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierDLSQZS',
                      scope.row.supplierDLSQZS,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierDLSQZS == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjDLSQZS(scope.row, 'supplierDLSQZS_')"
              ></el-button>
              <el-button
                v-if="scope.row.supplierDLSQZS != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjDLSQZS(scope.row, 'supplierDLSQZS_')"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="其他资质" min-width="60">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=${supplierNameT}`"
                :on-success="QTZZsuccessHandlel"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="supplierQTZZfileList"
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
                    :href="`${uploadURLs}/download?name=${scope.row.supplierQTZZ}`"
                    >下载模板</a
                  >
                </div>
                <a
                  @click="
                    deleteFile(
                      'supplierQTZZ',
                      scope.row.supplierQTZZ,
                      scope.row._id
                    )
                  "
                  >删除</a
                >
              </el-upload>
              <el-button
                v-if="scope.row.supplierQTZZ == undefined"
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfjQTZZ(scope.row, 'supplierQTZZ_')"
              ></el-button>
              <el-button
                v-if="scope.row.supplierQTZZ != undefined"
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfjQTZZ(scope.row, 'supplierQTZZ_')"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="handleAdd"
            ></el-button>
            <!-- <el-button
              type="danger"
              icon="el-icon-delete-solid"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="yc"
            ></el-button> -->
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              v-preventReClick
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
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
import { uploadURL } from "../../../../network/urlConfig";
import { testuploadURL } from "../../../../network/testurlConfig";
export default {
  data() {
    return {
      uploadURLs: "",
      supplierYYZZfileList: [],
      supplierKHXKZfileList: [],
      supplierISOfileList: [],
      supplierHBfileList: [],
      supplierDLSQZSfileList: [],
      supplierQTZZfileList: [],
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        supplierSQNumber: "", //供应商申请号
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Class: "", //行业类别
        supplierRemarks: "", //供应商备注
        TIN: "", //纳税人识别号(Taxpayer identification number)
        Bank: "", //开户行
        Account: "", //账户
        Address: "", //地址
        CompanyPhone: "", //公司电话
        supplierYYZZ: "", //营业执照
        supplierKHXKZ: "", //开户许可证
        supplierISO: "", //ISO
        supplierHB: "", //环保
        supplierDLSQZS: "", //代理授权证书
        supplierQTZZ: "", //其他资质
        Approval: "",
        Approver: "",
        prescription: "",

        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: "",
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      csd1: [],
      csd2: [],
      supplierNameT: "",
      supplierName: "",
    };
  },
  methods: {
    deleteFile(op, ds, id) {
      console.log("文件名===", op, ds, id);

      let forms = {};
      if (op == "supplierYYZZ") forms = { supplierYYZZ: null };
      else if (op == "supplierKHXKZ") forms = { supplierKHXKZ: null };
      else if (op == "supplierISO") forms = { supplierISO: null };
      else if (op == "supplierHB") forms = { supplierHB: null };
      else if (op == "supplierDLSQZS") forms = { supplierDLSQZS: null };
      else if (op == "supplierQTZZ") forms = { supplierQTZZ: null };
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          id: id,
          form: forms,
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
    searchs() {
      console.log(this.search);
      let ccs = {};

      if (this.search == "" || this.search == null) {
        this.findByPageNum(); //找寻对应页面的数据
        return;
      }
      if (this.search != "" && this.search != null) {
        ccs = { supplierName: { $regex: this.search + "" } };
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: ccs,
        },
      })
        .then((res) => {
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //营业执照
    scfjYYZZ(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierYYZZ_" + row.supplierName + ".pdf";
      if (row.supplierYYZZ) {
        this.supplierYYZZfileList = [{ name: "" }];
        this.supplierYYZZfileList[0].name = row.supplierYYZZ;
      } else {
        this.supplierYYZZfileList = [];
      }
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        console.log(file, resolve, reject);
        return resolve(true);
      });
    },
    YYZZsuccessHandlel(response, file, supplierYYZZfileList) {
      console.log("上传成功！", response, file, supplierYYZZfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierYYZZ: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //开户许可证
    scfjKHXKZ(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierKHXKZ_" + row.supplierName + ".pdf";
      if (row.supplierKHXKZ) {
        this.supplierKHXKZfileList = [{ name: "" }];
        this.supplierKHXKZfileList[0].name = row.supplierKHXKZ;
      } else {
        this.supplierKHXKZfileList = [];
      }
    },
    KHXKZsuccessHandlel(response, file, supplierKHXKZfileList) {
      console.log("上传成功！", response, file, supplierKHXKZfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierKHXKZ: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //ISO
    scfjISO(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierISO_" + row.supplierName + ".pdf";
      if (row.supplierISO) {
        this.supplierISOfileList = [{ name: "" }];
        this.supplierISOfileList[0].name = row.supplierISO;
      } else {
        this.supplierISOfileList = [];
      }
    },
    ISOsuccessHandlel(response, file, supplierISOfileList) {
      console.log("上传成功！", response, file, supplierISOfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierISO: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //环保
    scfjHB(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierHB_" + row.supplierName + ".pdf";
      if (row.supplierHB) {
        this.supplierHBfileList = [{ name: "" }];
        this.supplierHBfileList[0].name = row.supplierHB;
      } else {
        this.supplierHBfileList = [];
      }
    },
    HBsuccessHandlel(response, file, supplierHBfileList) {
      console.log("上传成功！", response, file, supplierHBfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierHB: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //代理授权证书
    scfjDLSQZS(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierDLSQZS_" + row.supplierName + ".pdf";
      if (row.supplierDLSQZS) {
        this.supplierDLSQZSfileList = [{ name: "" }];
        this.supplierDLSQZSfileList[0].name = row.supplierDLSQZS;
      } else {
        this.supplierDLSQZSfileList = [];
      }
    },
    DLSQZSsuccessHandlel(response, file, supplierDLSQZSfileList) {
      console.log("上传成功！", response, file, supplierDLSQZSfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierDLSQZS: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //其他资质
    scfjQTZZ(row) {
      this.supplierName = row.supplierName;
      this.supplierNameT = "supplierQTZZ_" + row.supplierName + ".pdf";
      if (row.supplierQTZZ) {
        this.supplierQTZZfileList = [{ name: "" }];
        this.supplierQTZZfileList[0].name = row.supplierQTZZ;
      } else {
        this.supplierQTZZfileList = [];
      }
    },
    QTZZsuccessHandlel(response, file, supplierQTZZfileList) {
      console.log("上传成功！", response, file, supplierQTZZfileList);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierName: this.supplierName },
          form: {
            supplierQTZZ: this.supplierNameT,
            Approval: "未审批",
            Approver: "",
            prescription: "",
          },
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
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__supplierManager",
          dataBase: "base",
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

    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.form.supplierSQNumber = "";
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = Object.assign({}, row);
    },
    //删除事件
    handleDelete(row) {
      this.id = row._id;
      this.name = row.creater;
      this.del();
      this.newview();
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this.pagenums);
      this.findByPageNum();
    },
    //多选
    yc() {
      if (this.$refs.tableselectData.selection.length > 0) {
        let val = this.$refs.tableselectData.selection;
        for (let i = 0; i < val.length; i++) {
          this.id = val[i]._id;
          this.del();
        }
        this.newview();
      }
    },
    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
      //this.findB();
    },
    async getsupplierSQNumber() {
      /////////////////
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M = M.padStart(2, "0");
      D = D.padStart(2, "0");
      let Onumber = Y + M + D + "000";
      let ds = await this.findorders(Y + M + D);
      if (ds.length == 1) {
        Onumber = ds[0].supplierSQNumber;
      }
      if (ds.length > 1) {
        for (let i = 0; i < ds.length; i++) {
          if (parseInt(ds[i].supplierSQNumber) > parseInt(Onumber))
            Onumber = ds[i].supplierSQNumber;
        }
      }
      this.form.supplierSQNumber = parseInt(Onumber) + 1 + "";
    },
    async findorders(cos) {
      let codesq = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierSQNumber: { $regex: cos } },
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
      this.form.Approval = "未审批";
      this.form.Approver = "";
      this.form.prescription = "";
      if (
        this.form.supplierSQNumber == "" ||
        this.form.supplierSQNumber == null
      )
        await this.getsupplierSQNumber();
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        await this.add();
      } else {
        await this.update();
      }
      this.newview();
    },
    /////crud
    // 数据添加
    async add() {
      //  if (this.auth()) return;
      if ((await this.findBht()) === 1) {
        alert("已存在！");
        return;
      }
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__supplierManager",
          dataBase: "base",
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
    // 数据删除
    del() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          id: this.id,
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
    async update() {
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__supplierManager",
          dataBase: "base",
          id: this.id,
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
    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          PageNum: this.pagenums,
          sortJson: { supplierSQNumber: -1 },
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
    findByPageNums() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: {},
          sortJson: { _id: 1 },
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
    async findBht() {
      let vds = 0;
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierNumber: this.form.supplierNumber },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.length > 0) {
            vds = 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return vds;
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

  created() {
    this.newview();
    if (sessionStorage.getItem("model") == "test") {
      this.uploadURLs = testuploadURL;
    } else {
      this.uploadURLs = uploadURL;
    }
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
  max-height: 600px;
  /* max-height: 470px; */
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
.headercolor {
  color: rgb(245, 110, 32);
}
</style>
