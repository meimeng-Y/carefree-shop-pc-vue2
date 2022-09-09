<template>
  <!--  收货地址-->
  <div id="signingAddress">
    <el-row>
      <el-col :span="24" class="add-button-box">
        <el-button class="add-button" @click="add_dialogVisible = true">新增收货地址</el-button>
      </el-col>
    </el-row>

    <el-row class="content-box" :gutter="20">
      <el-col :span="12" v-for="i in 3" :key="i">
        <div class="">
          <!--          卡片内容区-->
          <el-card class="box-card" shadow="never">
            <div class="is-default-switch">
              <span>设为默认地址</span>
              <!--              开关-->
              <el-switch
                v-model="value"
                active-color="#ff7800"
                inactive-color="#c1c1c1">
              </el-switch>
              <!--              开关end-->
            </div>
            <div class="address-info">
              <div>收货人：Hhhh</div>
              <div>所在地区：河北省邯郸市复兴区</div>
              <div>详细地址：Hhhh：Hhhh</div>
              <div>手机号：18888888888：Hhhh</div>
            </div>
          </el-card>
          <!--          卡片内容区end-->
          <div>
            <el-row class="address-icon">
              <el-col :span="12">
                <div class="address-icon-click" @click="delete_dialogVisible = true">
                  <span><i class="el-icon-delete"></i>删除</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="address-icon-click" @click="add_dialogVisible = true">
                  <span @click=""><i class="el-icon-edit"></i>修改</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--    删除框-->
    <el-dialog
      title="是否删除此项"
      :visible.sync="delete_dialogVisible"
      width="38%"
      :before-close="delete_handleClose"
      center
      id="del_dialog">
      <div class="deleteAddInfo">
        <p>收货人： 1234</p>
        <p>手机号码： 1234</p>
        <p>收货地址： 1234</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delete_dialogVisible = false">确 定</el-button>
        <el-button @click="delete_dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--    删除框end-->
    <!--    新增框-->
    <el-dialog
      title="新建收货地址"
      :visible.sync="add_dialogVisible"
      width="38%"
      center
      id="add_dialog">
      <add-address @cancelAdd="closeAdd"></add-address>
    </el-dialog>
    <!--    新增框end-->

  </div>
</template>

<script>
import AddAddress from "../../../components/orderInfo/addAddress";

export default {
  name: "signingAddress",
  components: {AddAddress},
  data() {
    return {
      value: true,
      delete_dialogVisible: false,//删除框
      add_dialogVisible: false,//新增框
    }
  },
  methods: {
    delete_handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    closeAdd() {
      this.add_dialogVisible = false
    },
  }
}
</script>

<style lang="less" scoped>
#signingAddress {
  padding: 30px;
  border: 1px solid #E5E5E5;
}

.add-button-box {
  display: flex;
}

.add-button {
  border: 1px solid #FF7800;
  color: #FF7800;

  &:hover, &:focus {
    background-color: white;
  }
}

.content-box {
  margin-top: 20px;

  & > .el-col {
    margin-bottom: 20px;
  }
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  border: 2px solid #DDDDDD;
  border-radius: 0;
}

.is-default-switch {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.address-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    margin-bottom: 30px;
  }
}

.address-icon {
  display: flex;
  align-items: center;

  & > div {
    //padding: 15px;
    border: 2px solid #DDDDDD;
    border-top: 0;

    .address-icon-click {
      &:hover {
        cursor: pointer;
      }

      padding: 15px;
    }
  }

  & > div:nth-child(2) {
    border-left: 0;
  }
}

.deleteAddInfo {
  width: 70%;
  margin: 0 auto;

  p {
    font-size: 1rem;
    line-height: 30px;
  }
}

#del_dialog {
  /deep/ .el-dialog__body {
    background-color: #f8f8f8;
  }
}

.dialog-footer {
  button {
    width: 120px;
    height: 45px;
  }
}
</style>
