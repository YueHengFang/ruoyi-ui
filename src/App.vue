<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style>
.dialogBox {
  border: 1px solid #f7f7f7;
  border-radius: 5px;
}
.dialogTop {
  display: flex;
  justify-content: space-between;
  background: #f7f7f7;
}
.dialogBox table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: rgba(103, 122, 142, 1);
}

.dialogBox tr td {
  border: 1px solid rgba(196, 208, 219, 1);
  /* padding: 5px 15px; */
  text-align: left;
}

.dialogBox tr td:nth-child(odd) {
  text-align: center;
  width: 6%;
  background: #f3f3f3;
  font-weight: bold;
  font-size: 14px;
  text-align: right;
  padding-right: 10px;
}

.dialogBox table tr {
  height: 45px;
}

.dialogBox tr:nth-child(1) {
  border-top: none;
}

.dialogBox .title-container {
  display: inline-block;
}

.dialogBox .width-style {
  width: 19%;
}

.dialogBox .content {
  /*min-width: 175px;*/
  width: 100%;
  display: inline-block;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: rgba(74, 74, 74, 1);
}

.dialogBox .el-select {
  width: 100%;
}

.dialogForm {
  margin: 0;
}
.dialogBox .content .el-radio__label {
  padding-left: 10px;
}

.dialogBox .el-radio + .el-radio {
  margin-left: 16px;
}

.dialogBox .el-input__inner {
  width: 100%;
  /*border: none;*/
}
.dialogBox .el-date-editor.el-input,
.dialogBox .el-date-editor.el-input__inner {
  width: 100%;
}

.dialogBox .el-form-item {
  margin-bottom: 0;
}
.formRed {
  color: red !important;
}
.el-table th,
.el-table td {
  padding: 5px 0;
}
.app-container {
  background: #f2f2f2;
  min-height: calc(100vh - 120px);
  padding: 10px;
}
body .el-table th.gutter {
  display: table-cell !important;
}
/* 校验错误提示 */
.el-form-item__error {
  color: #ff4949;
  line-height: 1;
  padding-top: 0;
  padding-right: 15px;
  position: absolute;
  top: calc(50% - 7px);
  right: 0;
  left: auto;
}
/* 修改查看界面disabled下的字体颜色 */
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner,
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  color: #a0a5af;
}
/* 取消单选按钮的label */
.none-label .el-radio__label {
  display: none;
}
.el-dialog__body {
  padding: 5px 20px 20px;
}
.el-table {
  z-index: 1;
}
</style>
