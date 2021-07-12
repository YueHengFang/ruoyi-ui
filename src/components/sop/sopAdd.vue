
<template>
  <div class="dragDialog consultBox">
    <!-- v-el-drag-dialog -->
    <el-dialog
      :visible="visible"
      :before-close="handleClose"
      title="SOP信息"
      v-el-drag-dialog
      width="55%"
      :destroy-on-close="true"
      class="father"
    >
    
    <div class="containers" id="container">
      <div class="left">   
        <ul>
          <li class="tabOptions" v-for='item in sopDataCopy' v:key="item.createName">{{item.taskNodeName}}</li>
       </ul> 
        </div>
        <div class="right">
          <div class="header">
            <div class="first">
              <h2>审批情况</h2>
              </div>
               
          </div>
          <div id="main">
            <div class="clzbyd" v-bind:id="index"  ref="clzbydRef"  v-for='(item,index) in sopDataCopy' v:key="item.createName">
              <div class="herder-head">
                <i class="el-icon-folder"></i>
                <h3>{{item.taskNodeName}}</h3>
              </div>
              <div class="content_01">
                  <span>审批人:</span><span>{{item.createName}}</span><br/>
                  <span>审批时间:</span><span>{{item.createdDate}}</span><br/>
                  <span>{{item.formHistoryDataDTO[0].title}}:</span><span>{{item.formHistoryDataDTO[0].value}}</span><br/>
              </div>
            </div>
          </div>
        </div>
    </div>
    

      <div class="dban">
      
        <el-button class="close" type="primary" @click="closeDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 
export default {
  name: 'addIndex',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提出申请',
    },

    sopData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      xianshi: false,
      //左侧tabs
      tabPosition: 'left',
       
      innerVisible: false,
      // 表格封装
      // tabConfig: {
      //   selectionVisible: true,
      //   pageType: true,
      //   parameter: {
      //     size: 10,
      //     current: 1,
      //   },
      //   height: '360px',
      //   tableData: [],
      //   total: 0,
      //   loading: false,
      //   columnData: [
      //     {
      //       label: '材料名称',
      //       prop: 'materialName',
      //     },
      //     {
      //       label: '是否必要',
      //       prop: 'needType',
      //       width: '100px',
      //     },
      //     {
      //       label: '材料形式',
      //       prop: 'materialClass',
      //       width: '100px',
      //     },
      //     {
      //       label: '材料类型',
      //       prop: 'materialType',
      //       width: '100px',
      //     },
      //     {
      //       label: '操作',
      //       /**使用的插槽*/
      //       slot: 'operate',
      //     },
      //   ],
      // },
      // activeName: 'first',
      // radio: '1',
      // rules: {
      //   depName: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
      //   transName: [{ required: true, message: '请输入事项名称', trigger: 'blur' }],
      //   // depid: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
      //   materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
      // },
      // options: [
      //   {
      //     label: '龙华区行政审批服务局',
      //     value: '龙华区行政审批服务局',
      //   },
      //   {
      //     label: '区房屋租赁管理所',
      //     value: '区房屋租赁管理所',
      //   },
      //   {
      //     label: '区建设工程质量安全监督站',
      //     value: '区建设工程质量安全监督站',
      //   },
      //   {
      //     label: '区新闻出版局',
      //     value: '区新闻出版局',
      //   },
      // ],
      // options1: [],
      // dialogVisible: false,
      // materialFormList: ['电子', '纸质', '电子和纸质'],
      // materialTypeList: ['原件', '复印件', '原件和复印件'],
      // requirementList: ['收原件', '收复印件', '核原件收复印件'],
      // twoTitleL: '',
      // cailiaoType: 1,
      // fileList: [],
      // url: process.env.VUE_APP_BASE_API + '/common/upload',
      // selectList: [],
      // downloadUrl: process.env.VUE_APP_BASE_API,
      // depNameList: [],
      //子组件点击下一个 需要重新使用getlist里面的数据
      nextList: [],
      //当前oid
      currentOid: '',
      //新的数据
      newSopData: [],
    }
  },
  filter: {
    fiterStatus(val) {
      if (val == 0) {
        return '编辑'
      } else if (val == 1) {
        return '发布'
      } else if (val == 2) {
        return '提交审核'
      } else if (val == 3) {
        return '审核通过(部门)'
      } else if (val == 4) {
        return '审核通过(局级)'
      } else if (val == 5) {
        return '审核不通过(暂时无用)'
      } else if (val == 6) {
        return '撤销'
      } else if (val == 7) {
        return '取消'
      } else if (val == 8) {
        return '停用'
      } else {
        return '未设置'
      }
    },
  },
  methods: {
    tabScroll() {
      if (this.xianshi == true) {
        let tabChange = document.getElementsByClassName('tabOptions')
        tabChange.forEach((item, index) => {
          let scro = document.getElementById('main')
          //滚动总高度
          let gdgd = scro.scrollHeight - scro.offsetHeight
          //每个盒子的高度
          let height_01 = this.$refs.clzbydRef.offsetHeight
          let height_02 = this.$refs.xsscRef.offsetHeight
          let height_03 = this.$refs.szscRef.offsetHeight
          let height_04 = this.$refs.tkydRef.offsetHeight
          let height_05 = this.$refs.stydRef.offsetHeight
          let height_06 = this.$refs.tbsmRef.offsetHeight
          //每个盒子占总高度的百分比
          let avg_01 = height_01 / scro.scrollHeight
          let avg_02 = height_02 / scro.scrollHeight
          let avg_03 = height_03 / scro.scrollHeight
          let avg_04 = height_04 / scro.scrollHeight
          let avg_05 = height_05 / scro.scrollHeight
          let avg_06 = height_06 / scro.scrollHeight
          //百分比×滚动的总高度 = 应该滚动的距离
          let sHeight_01 = avg_01 * gdgd
          let sHeight_02 = avg_02 * gdgd
          let sHeight_03 = avg_03 * gdgd
          let sHeight_04 = avg_04 * gdgd
          let sHeight_05 = avg_05 * gdgd
          let sHeight_06 = avg_06 * gdgd
          //1+2 1+2+3 1+2+3+4 1+2+3+4+5 1+2+3+4+5+6
          let sHeightNum_12 = sHeight_01 + sHeight_02
          let sHeightNum_123 = sHeightNum_12 + sHeight_03
          let sHeightNum_1234 = sHeightNum_123 + sHeight_04
          let sHeightNum_12345 = sHeightNum_1234 + sHeight_05
          let sHeightNum_123456 = sHeightNum_12345 + sHeight_06
          item.addEventListener('click', function () {
            console.log(index)
            if (index == 0) {
              scro.scrollTop = sHeight_01 - 500
            } else if (index == 1) {
              scro.scrollTop = sHeightNum_12
            } else if (index == 2) {
              scro.scrollTop = sHeightNum_123
            } else if (index == 3) {
              scro.scrollTop = sHeightNum_1234
            } else if (index == 4) {
              scro.scrollTop = sHeightNum_12345
            } else if (index == 5) {
              scro.scrollTop = sHeightNum_123456 + 100
            }
          })
        })
      }
    },
    isScroll() {
      if (this.xianshi == true) {
        //默认第一个li为高亮
        let zy = document.getElementsByClassName('tabOptions')
        zy[0].classList.add('isActive')
        //监听容器滚动
        let scro = document.getElementById('main')
        scro.addEventListener('scroll', () => {
          //滚动总高度
          let gdgd = scro.scrollHeight - scro.offsetHeight
          //每个盒子的高度
          let height_01 = this.$refs.clzbydRef.offsetHeight
          let height_02 = this.$refs.xsscRef.offsetHeight
          let height_03 = this.$refs.szscRef.offsetHeight
          let height_04 = this.$refs.tkydRef.offsetHeight
          let height_05 = this.$refs.stydRef.offsetHeight
          let height_06 = this.$refs.tbsmRef.offsetHeight
          //每个盒子占总高度的百分比
          let avg_01 = height_01 / scro.scrollHeight
          let avg_02 = height_02 / scro.scrollHeight
          let avg_03 = height_03 / scro.scrollHeight
          let avg_04 = height_04 / scro.scrollHeight
          let avg_05 = height_05 / scro.scrollHeight
          let avg_06 = height_06 / scro.scrollHeight
          //百分比×滚动的总高度 = 应该滚动的距离
          let sHeight_01 = avg_01 * gdgd
          let sHeight_02 = avg_02 * gdgd
          let sHeight_03 = avg_03 * gdgd
          let sHeight_04 = avg_04 * gdgd
          let sHeight_05 = avg_05 * gdgd
          let sHeight_06 = avg_06 * gdgd
          //1+2 1+2+3 1+2+3+4 1+2+3+4+5 1+2+3+4+5+6
          let sHeightNum_12 = sHeight_01 + sHeight_02
          let sHeightNum_123 = sHeightNum_12 + sHeight_03
          let sHeightNum_1234 = sHeightNum_123 + sHeight_04
          let sHeightNum_12345 = sHeightNum_1234 + sHeight_05
          // let sHeightNum_123456 = sHeightNum_12345 + sHeight_06
          if (scro.scrollTop > sHeight_01 && scro.scrollTop < sHeightNum_12) {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[1].classList.add('isActive')
          } else if (scro.scrollTop > sHeightNum_12 && scro.scrollTop < sHeightNum_123) {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[2].classList.add('isActive')
          } else if (scro.scrollTop > sHeightNum_123 && scro.scrollTop < sHeightNum_1234) {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[3].classList.add('isActive')
          } else if (scro.scrollTop > sHeightNum_1234 && scro.scrollTop < sHeightNum_12345) {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[4].classList.add('isActive')
          } else if (scro.scrollTop > sHeightNum_12345) {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[5].classList.add('isActive')
          } else {
            zy.forEach(item => {
              item.classList.remove('isActive')
            })
            zy[0].classList.add('isActive')
          }
        })
      }
    },

    closeDialog() {
      this.visible = false
    },
     
    
    handleClose() {
      this.$emit('close-callback')
      this.$refs['form'].resetFields()
    },
    //   changeDepName(node) {
    //     console.log(node)
    //     this.$emit('event1', node.label)
    //     this.options1 = []
    //     this.departmentList.forEach(ele => {
    //       if (node.label == ele.deptName) {
    //         console.log(ele.deptName)
    //         this.form.transName = ''
    //         console.log(ele.templateList)
    //         this.options1 = ele.templateList
    //         throw new Error('终止forEach循环')
    //       }
    //     })
    //   },
    //   changeTransName() {
    //     console.log('change一下')
    //     this.options1.forEach(ele => {
    //       if (this.form.transName == ele.transname) {
    //         console.log(ele)
    //         this.form.transCode = ele.transcode
    //         // this.form.itemName = ele.transname;
    //         throw new Error('终止forEach循环')
    //       }
    //     })
    //   },
    //   saveTwo(formName) {
    //     this.$refs[formName].validate(valid => {
    //       if (valid) {
    //         if (this.twoTitleL == '添加材料') {
    //           this.queryParams.oid = this.tabConfig.tableData.length + 1
    //           this.tabConfig.tableData.push(JSON.parse(JSON.stringify(this.queryParams)))
    //           this.innerVisible = false
    //         } else {
    //           this.tabConfig.tableData.forEach((Element, i) => {
    //             if (Element.oid == this.queryParams.oid) {
    //               this.tabConfig.tableData[i] = JSON.parse(JSON.stringify(this.queryParams))
    //             }
    //           })
    //         }
    //         this.tabConfig.tableData = JSON.parse(JSON.stringify(this.tabConfig.tableData))
    //         this.$forceUpdate()
    //         this.innerVisible = false
    //       } else {
    //         console.log('error submit!!')
    //         return false
    //       }
    //     })
    //   },
    //   handleResetPwd(row, type) {
    //     if (type == 1) {
    //       this.twoTitleL = '准备要点'
    //     } else if (type == 2) {
    //       this.twoTitleL = '形式审查'
    //     } else if (type == 3) {
    //       this.twoTitleL = '实质审查'
    //     }
    //     let data = JSON.parse(JSON.stringify(row))
    //     this.queryParams = data
    //     this.innerVisible = true
    //     this.cailiaoType = type
    //   },
    //   handleCloseTwo() {
    //     this.innerVisible = false
    //   },
    //   addUser() {
    //     this.cailiaoType = 1
    //     this.twoTitleL = '添加材料'
    //     this.queryParams = {
    //       materialName: '',
    //       needType: '',
    //       needDesc: '',
    //       materialClass: '',
    //       materialType: '',
    //       materialCount: '',
    //       materialSpec: '',
    //       materialWay: '',
    //       materialWayDesc: '',
    //       signNotice: '',
    //     }
    //     this.innerVisible = true
    //   },
    //   pageChange(val) {
    //     console.log(val)
    //   },
    //   handleSelectionChange(val) {
    //     this.selectList = val
    //   },
    //   deleteRow() {
    //     if (this.selectList.length == 0) {
    //       this.$message({
    //         type: 'warning',
    //         message: '请选择相应数据进行删除！',
    //       })
    //     } else {
    //       this.$confirm('此操作将永久删除所选择材料, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       })
    //         .then(() => {
    //           let add = this.tabConfig.tableData.filter(
    //             item => !this.selectList.some(ele => ele.oid === item.oid)
    //           )
    //           this.tabConfig.tableData = add
    //           this.$message({
    //             message: '删除成功',
    //             type: 'success',
    //           })
    //         })
    //         .catch(() => {
    //           this.$message({
    //             type: 'info',
    //             message: '已取消删除',
    //           })
    //         })
    //     }
    //   },
    //   AddMaterial() {
    //     this.dialogVisible = true
    //   },
    //   preservation(formName) {
    //     this.$refs[formName].validate(valid => {
    //       if (valid) {
    //         this.tabConfig.tableData.forEach(Element => {
    //           Element.oid = ''
    //         })
    //         this.$emit('saveSop', this.tabConfig.tableData, 0)
    //       } else {
    //         console.log('error submit!!')
    //         return false
    //       }
    //     })
    //   },
    //   submit(formName) {
    //     this.$refs[formName].validate(valid => {
    //       if (valid) {
    //         this.tabConfig.tableData.forEach(Element => {
    //           Element.oid = ''
    //         })
    //         this.$emit('saveSop', this.tabConfig.tableData, 2)
    //       } else {
    //         console.log('error submit!!')
    //         return false
    //       }
    //     })
    //   },
    //   handleChange(file, fileList) {
    //     this.fileList = fileList.slice(-3)
    //   },
    //   handleSuccess(response, file, fileList) {
    //     this.queryParams.fileName = response.fileName
    //     this.queryParams.fileRealName = file.name
    //     this.queryParams.fileType = file.raw.type
    //   },
    //   download() {
    //     let data = {
    //       name: this.queryParams.fileName,
    //     }
    //     downloadFain(data).then(res => {
    //       console.log(res)
    //     })
    //   },
    //   handleError(err, file, fileList) {
    //     console.log(err)
    //   },
    //   init() {
    //     this.getTreeselect()
    //   },
    //   getTreeselect() {
    //     treeselect().then(res => {
    //       this.depNameList = res.data
    //     })
    //   },
  },
  updated() {
    this.isScroll()
    this.tabScroll()
  },
  computed: {
    sopDataCopy: {
      get() {
        return this.newSopData
      },
      set(v) {
        this.newSopData = v
      },
    },
  },
  watch: {
    sopData(v) {
       this.newSopData = v
    },
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>

.content_01{
   margin-top: 1%;
   margin-bottom: 1%;
   

}
.content_01 span{
  font-size: 16px;
  line-height:25px;
}
.dragDialog {
  .dialogForm {
    .fourChild {
      td {
        padding: 0;
        .el-textarea {
          height: 70px;
          .el-textarea__inner {
            height: 70px;
            border: none;
            resize: none;
          }
        }
      }
    }
  }
  .dialogTop {
    overflow: hidden;
    div {
      width: 100%;
      text-align: right;
    }
  }
  .el-dialog__body {
    // padding: 15px;

    height: 400px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #337ab7;
    color: #fff;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
}

.el-upload-list__item:first-child {
  margin-top: 0;
}
.consultBox {
  .el-dialog:not(.is-fullscreen) {
    margin-top: 10vh !important;
  }
}
p,
span {
  font-size: 14px;
  margin: 0px !important;
  padding: 3px !important;
}

h3 {
  color: white;
  margin: 2px;
  padding: 2px;
  font-size: 1.2em;
  font-weight: bold;
}
ul {
  margin-top: 5px;
  height: 100%;
  border-right: #126bb9 2px solid;
  padding-left: 2px;
  li {
    // margin-right: 10px;
    font-family: 'Microsoft yahei';
    text-align: center;
    font-size: 16px;
    list-style: none;
    padding: 10px 28px;
    color: #666666;
    background-color: #f3f3f3;
  }
}

.containers {
  display: flex;
  // overflow: auto;
  height: 600px;
  margin: 0;
  padding: 0;
}

.left {

  height: 90%;
  position: absolute;
  left: 0px;
  top: 50px;
}

.right {
   margin-left: 145px;
  width: 100%;
  #main{
    height: 500px;
    overflow: auto;
  }
  margin-left: 145px;
  width: 100%;
 
  .header {
    .first {
      display: flex;
    }
    .second {
      width: 600px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.dban {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
.herder-head {
  display: flex;
  background-color: #88cff0;
  margin: 2px 0;
  padding: 2px 0;
  i {
    padding-left: 3px;
    padding-right: 3px;
    color: white;
    line-height: 26px;
  }
}
.byxkd,
.clxskd,
.clfskd {
  display: inline-block;
  width: 200px;
}
.sxlx {
  float: left;
}
.fssm {
  margin-left: 400px;
}

.clmc {
  font-size: 14px;
  font-weight: bold;
}
.isActive {
  color: #1d9fd3;
  background-color: #fff;
}
.byx,
.clxs,
.clfx,
.suojin {
  margin-left: 28px;
}
</style>


