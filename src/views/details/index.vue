<template>
  <div class="da">
    <div class="block">
      <table
class="tablee"
             cellspacing="0"
             cellpadding="0"
             :data="mmm"
>
        <tbody>
          <tr>
            <td>订单号</td>
            <td>{{ mmm.trans_no }}</td>
          </tr>
          <tr>
            <td>订单详情</td>
            <td>
              {{ mmm.consignor }}在 {{ mmm.created_at }} 创建了订单。
            </td>
          </tr>
          <tr>
            <td>货物总体积</td>
            <td>{{ mmm.volume }} </td>
          </tr>
          <tr>
            <td>货物总重量</td>
            <td>{{ mmm.weight }} </td>
          </tr>
          <tr>
            <td>货物类型</td>
            <td>{{ mmm.goods_type }} </td>
          </tr>
          <tr v-if="mmm.driver">
            <td>接单人</td>
            <td>{{ mmm.driver }}</td>
          </tr>
          <tr>
            <td>发货地址</td>
            <td>{{ mmm.package_addr }}</td>
          </tr>
          <tr>
            <td>货物名称</td>
            <td>{{ mmm.receive_name }}</td>
          </tr>
          <tr>
            <td>电话</td>
            <td>{{ mmm.receive_phone }}</td>
          </tr>
          <tr>
            <td>收货地址</td>
            <td>{{ mmm.receive_addr }}</td>
          </tr>
        </tbody>
      </table>
      <el-timeline :reverse="reverse">
        <el-timeline-item
v-for="(activity, index) in activities"
                          :key="index"
                          :timestamp="activity.timestamp"
>
          {{ activity.content }}{{ activity.po }}
        </el-timeline-item>
      </el-timeline>

      <el-button @click="handleGo">
        返回上一页
      </el-button>
      <el-button
type="primary"
                 :disabled="disabled"
                 @click="handleZ"
>
        支付宝支付
      </el-button>
      <el-button
type="success"
                 :disabled="disabled"
                 @click="handleW"
>
        微信支付
      </el-button>
      <el-dialog
title="扫码支付"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleClose"
>
        <div id="qrcode" />
        <span
slot="footer"
              class="dialog-footer"
>
          <el-button
type="primary"
                     @click="handleM"
>确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>



<script>
import QRCode from 'qrcodejs2'//引入插件
export default {
  name: 'Mmm',
  data () {
    return {
      disabled: false,
      dialogVisible: false,
      id: null,
      order_type: null,
      type: null,
      mmm: {},
      // spike_time:null,  // 接单时间
      appoint_time: null,  // 预约上门时间
      deliver_time: null,  // 司机装货完成
      finish_time: null,  // 订单完成时间
      reverse: true,
      activities: [
        {
          content: '订单创建时间          ',
          timestamp: ''
        }, {
          content: '预约上门时间           ',
          timestamp: ''
        }, {
          content: '司机装货完成           ',
          timestamp: ''
        }, {
          content: '订单司机上传核验完成时间            ',
          timestamp: ''
        }]
    };
  },
  created () {
    this.handleC()

  },

  methods: {
    handleClose () { },
    handleGo () {
      this.$router.go(-1)
    },
    handleC () {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      // console.log(id,type)
      this.$http({
        method: 'POST',
        url: '/third/trace',
        data: {
          type: this.type,
          id: this.id
        }
      }).then(res => {
        console.log(res)
        this.mmm = res.data
        this.order_type = res.data.order_type
        this.activities[0].timestamp = this.mmm.created_at
        // this.activities[0].po = "接单人:"+this.mmm.driver
        this.activities[1].timestamp = this.mmm.appoint_time
        // this.activities[1].po = "预约人:"+this.mmm.driver
        this.activities[2].timestamp = this.mmm.deliver_time
        // this.activities[2].po ="装货完成人员:"+ this.mmm.driver
        this.activities[3].timestamp = this.mmm.finish_time
        // this.activities[3].po = "上传人员:"+this.mmm.driver
      })
    },
    handleZ () {
      if (this.order_type == 13 || this.order_type == 15 || this.order_type == 16 || this.order_type == 58 || this.order_type == 59 || this.order_type == 44 || this.order_type == 46 || this.order_type == 48 || this.order_type == 50) {
        let external_id = JSON.parse(window.localStorage.getItem('user_info')).id
        this.$http({
          method: 'POST',
          url: '/cash/payThirdPcOrder',
          data: {
            id: this.id,
            external_id
          }
        }).then(res => {
          // console.log(res)
          let dwSafari
          dwSafari = window.open();
          dwSafari.document.open();
          let dataObj = res.data.alipay
          let html = dataObj.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
          dwSafari.document.write("<html><head><title></title><meta charset='utf-8'><body>" + dataObj + "</body></html>")
          dwSafari.document.forms[0].submit()
          dwSafari.document.close()
        }).catch(err => {
          throw err
        })
      } else {
        this.$message.error('当前状态不允许支付');
      }

    },
    handleW () {
      if (this.order_type == 13 || this.order_type == 15 || this.order_type == 16 || this.order_type == 58 || this.order_type == 59 || this.order_type == 44 || this.order_type == 46 || this.order_type == 48 || this.order_type == 50) {
        this.dialogVisible = true
        let external_id = JSON.parse(window.localStorage.getItem('user_info')).id
        this.$http({
          method: 'POST',
          url: '/cash/payWeChatThirdPcOrder',
          data: {
            id: this.id,
            external_id
          }
        }).then(res => {
          // console.log(res)
          new QRCode(document.getElementById('qrcode'), res.data.qr)

        }).catch(err => {
          throw err
        })
      } else {
        this.$message.error('当前状态不允许支付');
      }
    },
    handleM () {
      this.dialogVisible = false
      document.getElementById('qrcode').innerHTML = "";
    }
  }
};
</script>
<style scoped>
.tablee {
  width: 600px;
}
.tablee tr {
  height: 60px;
}
.map {
  width: 300px;
  height: 300px;
}
.block {
  margin-top: 100px;
  margin-left: 100px;
  position: relative;
  height: 800px;
}
#qrcode {
  margin-left: 60px;
}
.tablee {
  position: absolute;
  top: -100px;
  right: 150px;
  border-radius: 3px;
  border: 1px solid #666;
  background-color: #f2f6fc;
}
.tablee td {
  border: 1px solid #666;
  text-align: center;
}
/* .aaaaa{
  position: relative;
}
.abcd{
  position: absolute;
} */
.el-timeline-item {
  padding-bottom: 50px;
}
</style>
