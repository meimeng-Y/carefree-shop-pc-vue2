<template>
  <!--  收货地址-->
  <div id="signingAddress">
    <el-row>
      <el-col :span="24" class="add-button-box">
        <el-button class="add-button" @click="addAddr">新增收货地址</el-button>
      </el-col>
    </el-row>

    <el-row class="content-box" :gutter="20" v-if="isShow">
      <el-col :span="12" v-for="item in Address" :key="item.id">
        <div class="carBox">
          <!--          卡片内容区-->
          <el-card class="box-card" shadow="never">
            <div class="is-default-switch">
              <span>设为默认地址</span>
              <!--              开关-->
              <el-switch
                v-model="item.isDefault"
                :active-value='1'
                :inactive-value='0'
                @change=" onSubmit(item)"
                active-color="#ff7800"
                inactive-color="#c1c1c1">
              </el-switch>
              <!--              开关end-->
            </div>
            <div class="address-info">
              <div>收货人：{{ item.realName }}</div>
              <div>所在地区：{{ item.province + item.city + item.district }}</div>
              <div>详细地址：{{ item.detail }}</div>
              <div>手机号：{{ item.phone }}</div>
            </div>
          </el-card>
          <!--          卡片内容区end-->
          <div>
            <el-row class="address-icon">
              <el-col :span="12">
                <div class="address-icon-click" @click="delete_dialogVisible = true;setdel(item)">
                  <span><i class="el-icon-delete"></i>删除</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="address-icon-click" @click="modify(item.id)">
                  <span @click=""><i class="el-icon-edit"></i>修改</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--    没有内容时的空状态时占位提示-->
    <el-empty description="没有收货地址" v-if="!isShow">
    </el-empty>
    <!--    没有内容时的空状态时占位提示end-->
    <!--    删除框-->
    <el-dialog
      title="是否删除此项"
      :visible.sync="delete_dialogVisible"
      width="38%"
      :before-close="delete_handleClose"
      center
      id="del_dialog">
      <div class="deleteAddInfo">
        <p>收货人： {{ delVal.realName }}</p>
        <p>手机号码： {{ delVal.phone }}</p>
        <p>收货地址： {{ delVal.province + delVal.city + delVal.district + delVal.detail }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delSubmit(delVal.id);delete_dialogVisible = false">确 定</el-button>
        <el-button @click="delete_dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--    删除框end-->
    <!--    新增框-->
    <el-dialog
      :title="titleName"
      :visible.sync="add_dialogVisible"
      width="38%"
      center
      id="add_dialog">
      <!--      使用v-if进行销毁，保证 add-address组件能被调用钩子函数-->
      <add-address @cancelAdd="closeAdd" :modify-id="modifyId" v-if="add_dialogVisible"></add-address>
    </el-dialog>
    <!--    新增框end-->

  </div>
</template>

<script>
import AddAddress from "../../../components/orderInfo/addAddress";
import {getAddress, postDelEdit, postEdit} from '../../../api/api'

export default {
  name: "signingAddress",
  components: {AddAddress},
  data() {
    return {
      titleName: '新建收货地址',
      value: true,
      delete_dialogVisible: false,//删除框
      add_dialogVisible: false,//新增框
      Address: [],//地址列表
      //分页
      limit: 10,//页大小,默认为 10
      page: 1,//页码,默认为1
      delVal: [],
      modifyId: 0,//要修改的ID
      isShow: true,//控制没有内容时的空状态时占位提示
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
    //提交数据
    onSubmit(val) {
      console.log(val)
      postEdit(val).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
        this.$router.go(0)
      })
    },
    //删除地址
    delSubmit(id) {
      postDelEdit({
        id: id.toString()
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.$router.go(0)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //要删除的内容
    setdel(val) {
      // TODO 如果更多的信息要显示可以从后端请求
      this.delVal = val
    },
    //修改
    modify(id) {
      this.add_dialogVisible = true;
      this.titleName = "修改收货地址"
      this.modifyId = id
    },
    //新增地址
    addAddr() {
      this.add_dialogVisible = true;
      this.titleName = "新建收货地址"
      this.modifyId = null
    }
  },
  mounted() {
    getAddress({
      page: this.page,
      limit: this.limit
    }).then(res => {
      if (res.status === 200) {
        if (res.data.length > 0) {
          console.log(res)
          this.Address = res.data
        } else {
          this.isShow = false
          return
        }
        this.isShow = true
      } else {
        this.$message.warning('获取数据失败')
      }
    })
  }
}
</script>

<style lang="less" scoped>

#signingAddress {
  border: 1px solid #E5E5E5;
  padding: 0 30px;
  height: 100%;
}

.add-button-box {
  display: flex;
}

.add-button {
  margin-top: 25px;
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

.carBox {
  height: 100%;
}

</style>
