<template>
  <div id="userInfo">
    <el-form :label-position="labelPosition" label-width="100px">
      <el-form-item label="昵称：">
        {{ nickname }}
      </el-form-item>
      <el-form-item label="手机号：">
        <template v-if="!isUpt">
          {{ phone }}
          <el-button size="mini" style="margin-left: 15px" @click="isUpt ? isUpt=false : isUpt=true">修改</el-button>
        </template>
        <template v-if="isUpt">
          <el-input v-model="userInfo.phone"></el-input>
          <el-button type="primary" size="mini" style="margin-left: 15px" @click="isUpt ? isUpt=false : isUpt=true">
            取消
          </el-button>
          <el-button size="mini">保存</el-button>
        </template>
      </el-form-item>
      <el-form-item label="账户余额：">
        {{ nowMoney }}
      </el-form-item>
      <el-form-item label="原密码：">
        <el-input v-model="userInfo.password" show-password placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input v-model="userInfo.newPassword" show-password placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码：">
        <el-input v-model="userInfo.renewPassword" show-password placeholder="请输入重复新密码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button size="medium" style="color: #FF7800 ; border: 1px solid #FF7800; width: 115px">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUserInfo} from "../../../api/api";
import {mapMutations} from "vuex";

export default {
  name: "userInfo",
  data() {
    return {
      labelPosition: 'left',
      isUpt: false,
      nickname: '',
      phone: '',
      nowMoney: '',//账户余额
      userInfo: {
        phone: '',
        password: '',
        newPassword: '',
        renewPassword: '',
      },
    };
  },
  methods: {
    ...mapMutations([
      'setuserInfoVal'
    ])
  },
  mounted() {
    //更新用户信息
    getUserInfo().then(res => {
      if (res.status === 200) {
        window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        this.setuserInfoVal(res.data)
        let user = JSON.parse(window.localStorage.getItem('userInfo'))
        this.nickname = user.nickname
        this.phone = user.phone
        this.nowMoney = user.nowMoney
      } else {
        this.$message.warning('获取个人信息错误，请重新登录')
      }
    })
  }
}
</script>

<style lang="less" scoped>
#userInfo {
  padding: 30px;
  border: 1px solid #E5E5E5;;

  .el-form-item {
    /deep/ .el-form-item__content {
      text-align: left;

      .el-input {
        width: 200px;
      }
    }
  }
}

</style>
