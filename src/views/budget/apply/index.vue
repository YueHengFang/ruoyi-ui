<template>
    <div class="app-container">
      <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['system:role:add']"
              >新增</el-button>
            </el-col>
      </el-row>
       
     <!-- <vxe-toolbar>
        <template #buttons>
          <vxe-button @click="allAlign = 'left'">居左</vxe-button>
          <vxe-button @click="allAlign = 'center'">居中</vxe-button>
          <vxe-button @click="allAlign = 'right'">居右</vxe-button>
        </template>
      </vxe-toolbar>  -->
      <vxe-table
          border
          height="300"
          stripe
          resizable
          show-header-overflow
          show-overflow
          :loading="loading"
          :align="allAlign"
          :data="btdata"
          highlight-hover-column
          highlight-current-column
          highlight-hover-row
          highlight-current-row
          >
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="depname" title="部门名称" sortable></vxe-table-column>
          <vxe-table-column field="budgetyear" title="年度预算" sortable></vxe-table-column>
          <vxe-table-column field="budgettype" title="预算类型" sortable></vxe-table-column>
          <vxe-table-column field="approvedamount" title="批准金额" sortable></vxe-table-column>
          <vxe-table-column field="remainingamount" title="剩余金额" sortable></vxe-table-column>
          <vxe-table-column field="pamount" title="在途金额" sortable></vxe-table-column>
          <vxe-table-column field="availableamount" title="可用金额" sortable></vxe-table-column>
          <vxe-table-column title="操作" width="200" show-overflow>
            <template #default="{ row }">
              <vxe-button type="text" icon="vxe-icon--edit-outline" @click="handledit(row)">编辑</vxe-button>
              <vxe-button type="text" icon="vxe-icon--close" @click="handremove(row.oid)">删除</vxe-button>
            </template>
          </vxe-table-column>
          <!-- @click="handledit(row)" -->
          
          <!-- <vxe-table-column field="budgetyear" title="年度预算"></vxe-table-column>
          <vxe-table-column field="budgettype" title="预算类型"></vxe-table-column>
          <vxe-table-column field="approvedamount" title="批准金额"></vxe-table-column>
          <vxe-table-column field="remainingamount" title="剩余金额"></vxe-table-column>
          <vxe-table-column field="availableamount" title="可用金额"></vxe-table-column>
          <vxe-table-column field="availableamount" title="在途金额"></vxe-table-column> -->
          
        </vxe-table>
     
  
      <el-dialog :title="title" :visible.sync="open" width="85%" append-to-body>
        <div class="dialogBox">
          <el-form ref="form" :model="form">
              <table>
                  <tr>
                      <td>
                          <div>部门名称</div>
                      </td>
                      <td>
                          <el-form-item prop="depname">
                              <el-input v-model="form.depname"/>
                          </el-form-item>
                      </td>
                      <td>
                        <div>年度预算</div>
                      </td>
                      <td>
                          <el-form-item prop="budgetyear">
                              <el-input v-model="form.budgetyear"/>
                          </el-form-item>
                        </td>          
                  </tr>
                  <tr>
                    <td>
                        <div>预算类型</div>
                    </td>
                    <td>
                      <el-form-item prop="budgettype">
                          <el-input v-model="form.budgettype"/>
                      </el-form-item>
                    </td>
                    <td>
                        <div>批准金额</div>
                    </td>
                    <td>
                        <el-form-item prop="approvedamount">
                            <el-input v-model="form.approvedamount"/>
                        </el-form-item>
                    </td>
                  </tr>
                  <tr>
                      <td>
                        <div>剩余金额</div>
                      </td>
                      <td>
                        <el-form-item prop="remainingamount">
                            <el-input v-model="form.remainingamount"/>
                        </el-form-item>
                      </td>
                      <td>
                        <div>在途金额</div>
                      </td>
                      <td>
                        <el-form-item prop="pamount">
                            <el-input v-model="form.pamount"/>
                        </el-form-item>
                      </td>
                  </tr>
                  <tr>
                     <td>
                         <div>可用金额</div>
                     </td>
                     <td>
                         <el-form-item prop="availableamount">
                            <el-input v-model="form.availableamount"/>
                         </el-form-item>
                     </td>
                  </tr>
              </table>
              </el-form>  
        </div>
              <!-- <el-form-item label="部门名称">
                  <el-input v-model="form.depname" placeholder="请输入部门名称"></el-input>
              </el-form-item>
              <el-form-item label="年度预算">
                  <el-input v-model="form.budgetyear" placeholder="请输入年度预算"></el-input>
              </el-form-item>
              <el-form-item label="预算类型">
                  <el-input v-model="form.budgettype" placeholder="请输入预算类型"></el-input>
              </el-form-item>
              <el-form-item label="批准金额">
                  <el-input v-model="form.approvedamount" placeholder="请输入批准金额"></el-input>
              </el-form-item>
              <el-form-item label="剩余金额">
                  <el-input v-model="form.remainingamount" placeholder="请输入剩余金额"></el-input>
              </el-form-item>
              <el-form-item label="在途金额">
                  <el-input v-model="form.pamount" placeholder="请输入在途金额"></el-input>
              </el-form-item>
              <el-form-item label="可用金额">
                  <el-input v-model="form.availableamount" placeholder="请输入可用金额"></el-input>
              </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
            </div>
      </el-dialog>
    </div>
     
  </template>
  <script>
  
  import {listbudget,getinfobudget,updatebudget,removebudget,addbudget} from "@/api/budget/budget";
  
   export default{
       
       name: "apply",
       data(){
           return{
              queryParams: {
                  oid:undefined
              },
              btdata: [],
              open: false,
              form: {},
              allAlign: 'center',
              loading: false
              
           }
       },
      methods: {
           getList() {
                     console.log("---------- N       M       C------------")
                       this.loading = true;
                       
                       listbudget().then(response => {
                          this.loading=false;
                           if(response.code==200)
                           {
                              this.btdata=response.rows;
                           }
                       
                       });
            
           },
           handledit(row) {
                 this.open=true;
                 this.queryParams.oid=row.oid;
                 getinfobudget(this.queryParams).then(response => {
                     console.log(response)
                      if(response.code==200)
                      {
                          this.form=response.data;
                      }
                 }) 
           },
           handleAdd()
           {
               this.rest();
              this.open = true;
              this.title = "添加角色";


           },
           cancel() {
               this.open=false;
               this.rest();
           },
           rest() {
               this.form = {
                    depname:undefined,
                    budgetyear:undefined,
                    budgettype:undefined,
                    approvedamount:undefined,
                    remainingamount:undefined,
                    pamount:undefined,
                    availableamount:undefined
               }
           },
           submitForm: function()
           {
                
              this.$refs["form"].validate(valid => {
                  if(valid){
                      if(this.form.oid != undefined){
                          updatebudget(this.form).then(response => {
                              this.msgSuccess("修改成功");
                              this.open = false;
                              this.getList();
                          });
                      }else{
                          //添加
                          addbudget(this.form).then(response => {
                            this.msgSuccess("修改成功");
                              this.open = false;
                              this.getList();
                          })
                      }
                  }
              })
           },
           handremove(oid)
           {
               this.$confirm('是否删除这条数据记录',"警告",{ confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"}).then(function(){
                 return removebudget(oid);
            }).then(()=>{
                this.getList();
                this.msgSuccess("删除成功");
            })
           }
          
           
          
       },
       created () {
           this.getList();
       }
  
   }
    
  
  </script>
  <style>
  
  </style>