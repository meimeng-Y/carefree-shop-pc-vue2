<template>
  <!--  新增地址，或修改地址表单-->
  <div id="addAddress">

    <el-form label-position="right" :rules="rules" label-width="130px" :model="addAddressInfo" ref="addAddressInfo">
      <el-form-item label="所在地区:" prop="area">
        <!--        级联选择器-->
        <el-cascader
          v-model="addAddressInfo.VcityId"
          :options="options"
          @change="handleChange"
          ref="deliveryAreaCascader"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址:" prop="detail">
        <el-input type="textarea" :rows="3" resize="none"
                  v-model="addAddressInfo.detail"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名：" prop="realName">
        <el-input v-model="addAddressInfo.realName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="addAddressInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="addAddressInfo.isDefault" :true-label="1" :false-label="0">设置为默认收货地址</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="dialogFooter">
      <el-button type="primary" @click="onSubmit">确 定</el-button>
      <el-button @click="cancelAdd">取 消</el-button>
    </div>
  </div>
</template>

<script>
import {getAddressOne, getCityList, postEdit} from '@/api/api'


export default {
  name: "addAddress",
  data() {
    return {
      addAddressInfo: {
        detail: '',//详细地址
        address: '',
        realName: '',//联系人
        phone: '',
        province: '',//收货人所在省
        city: '', //收货人所在市
        district: '',//收货人所在区
        postCode: '', //收货邮政编码
        isDefault: 0, //是否默认
        VcityId: [],//视图绑定的省市区 ID 用于修改是定位省市区 TODO 暂时无用，没有做回显
        cityId: ''//提交到后端的省市区 ID 用于修改是定位省市区  TODO 暂时无用，没有做回显

      },
      options: [],//城市列表
      rules: {
        detail: [{required: true, message: '请输入详细地址', trigger: 'blur'},],
        realName: [{required: true, message: '请输入收货人姓名', trigger: 'blur'},],
        phone: [{required: true, message: '请输入手机号码', trigger: 'blur'},]
      }
    }
  },
  props: ['modifyId'],//修改的ID
  methods: {
    cancelAdd() {
      this.$emit('cancelAdd')
    },
    // Cascader 级联选择器
    handleChange(value) {
      console.log(value);
      let val = this.$refs['deliveryAreaCascader'].getCheckedNodes()[0].pathLabels//获取板顶的值
      this.addAddressInfo.province = val[0]
      this.addAddressInfo.city = val[1]
      this.addAddressInfo.district = val[2]
    },
    //提交数据
    onSubmit() {
      postEdit(this.addAddressInfo).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
        this.$refs['addAddressInfo'].resetFields()
        this.$router.go(0)
      })
    },
  },
  mounted() {
    getCityList({}).then(res => {
      if (res.status === 200) {
        this.$message.success("获取城市列表成功")
        this.options = res.data
      } else {
        this.$message.warning("获取城市列表失败")
      }
    })
    // console.log(this.modifyId)
    if (this.modifyId != null) {
      let id = this.modifyId
      //说明存在id,是修改
      getAddressOne({id: id}).then(res => {
        // console.log(res)
        this.addAddressInfo = Object.assign({}, this.addAddressInfo, res.data); //两个对象的属性进行合并，并让后面的覆盖前面的值
        // this.address = res.data.province + res.data.city + res.data.district TODO 没有进行联级选择器的自动回显
      })
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
