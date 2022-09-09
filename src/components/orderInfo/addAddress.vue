<template>
  <!--  新增地址表单-->
  <div id="addAddress">

    <el-form label-position="right" :rules="rules" label-width="130px" :model="addAddressInfo">
      <el-form-item label="所在地区:" prop="area">
        <!--        级联选择器-->
        <el-cascader
            v-model="addAddressInfo.area"
            :options="options"
            @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址:" prop="address">
        <el-input type="textarea" :rows="3" resize="none"
                  v-model="addAddressInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名：" prop="name">
        <el-input v-model="addAddressInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="addAddressInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="addAddressInfo.is_default">设置为默认收货地址</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="dialogFooter">
      <el-button type="primary" @click="">确 定</el-button>
      <el-button @click="cancelAdd">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addAddress",
  data() {
    return {
      addAddressInfo: {
        area: '',
        address: '',
        name: '',
        phone: '',
        is_default: false,
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          },]
        }]
      }],
      rules: {
        address: [{required: true, message: '请输入详细地址', trigger: 'blur'},],
        name: [{required: true, message: '请输入收货人姓名', trigger: 'blur'},],
        phone: [{required: true, message: '请输入手机号码', trigger: 'blur'},]
      }
    }
  },
  methods: {
    cancelAdd() {
      this.$emit('cancelAdd')
    },
    // Cascader 级联选择器
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>

<style lang="less" scoped>
.dialogFooter {
  display: flex;
  justify-content: center;

  button {
    width: 140px;
    padding: 12px 20px;
  }
}
</style>
