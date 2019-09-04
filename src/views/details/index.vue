<template>
  <div class="da">
    <div class="block">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <el-button @click="handleGo">
        返回上一页
      </el-button>
    </div>
</div>
</template>



<script>
  export default {
    data() {
      return {
      //    center: {lng: 0, lat: 0},
      // zoom: 3,
        reverse: false,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
      };
    },
    methods:{
      handleGo(){
        this.$router.go(-1)
      }
    }
  };
</script>
<style>

.map {
  width: 300px;
  height: 300px;
}
.block{
  margin-top: 100px;
  margin-left: 100px;
}
</style>
