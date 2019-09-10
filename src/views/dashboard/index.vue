<template>
  <!-- <div class="index">
    <el-row :gutter="20">
      <el-col :span="8">
        <div
          class="card kjfs"
          style="border-radius:10px"
        >
          <p class="title">
            <i class="fa fa-th-large fa-lg" />快捷方式
          </p>
          <ul>
            <li>
              <router-link
                to="/nestede/index"
                class="kjfs kjfs-bluee"
              >
                <span><i class="el-icon-tickets fa-2x" /></span><span>店铺信息</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/nestede/index"
                class="kjfs kjfs-pinkk"
              >
                <span /><span>订单管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/example/table"
                class="kjfs kjfs-yelloww"
              >
                <span><i class="fa fa-universal-access fa-2x" /></span><span>合同制列表</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link
                to="/nestede/index"
                class="kjfs kjfs-grennn"
              >
                <span><i class="fa fa-cloud-upload fa-2x" /></span><span>添加用户</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/cw/table"
                class="kjfs kjfs-purplee"
              >
                <span><i class="fa el-icon-menu fa-2x" /></span><span>对账管理</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/cw/tree"
                class="kjfs kjfs-lightBluee"
              >
                <span><i class="fa fa-file-code-o fa-2x" /></span><span>支付管理</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          class="card dbsx"
          style="border-radius:10px"
        >
          <p class="title">
            <i class="fa fa-file-text-o" />待办事项
          </p>
          <ul>
            <li>
              <router-link to="#">
                <span>待审评论</span><span class="num">66</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span>待审帖子</span><span class="num">66</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="#">
                <span>待审商品</span><span class="num">66</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span>代发货</span><span class="num">66</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8" />
    </el-row>
    <el-row>
      <el-col :span="24" />
    </el-row>
    <el-row>
      <el-col :span="24" />
    </el-row>
  </div> -->
  <div>
    <div class="heard">
      <div class="time">
        <div class="time-data1" />
        <router-link
          to="/nodetede/index3"
          class="time-data"
        >
          <div>
            <i class="iconfont">&#xe882;</i>
            <div class="right">
              在途订单
            </div>
          </div>
        </router-link>
        <router-link
          to="/nodetede/index4"
          class="number"
        >
          <div>
            <i class="iconfont">&#xe894;</i>
            <div class="right">
              待处理订单
            </div>
          </div>
        </router-link>
        <router-link
          to="/nodetede/index2"
          class="number1"
        >
          <div>
            <i class="iconfont">&#xe892;</i>
            <div class="right">
              已完成订单
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="content">
      <div class="time">
        <div
          class="time-data1"
        >
          <i class="iconfont" />
        </div>
        <router-link
          to="/example/table"
          class="time-data"
        >
          <div>
            <i class="iconfont">&#xe8a9;</i>
            <div class="right">
              合同制客户
            </div>
          </div>
        </router-link>
        <router-link
to="/example/tree"
                     class="number"
>
          <div>
            <i class="iconfont">&#xe886;</i>
            <div class="right">
              异常订单
            </div>
          </div>
        </router-link>
        <router-link
to="/form/index"
                     class="number1"
>
          <div>
            <i class="iconfont">&#xe88a;</i>
          
            <div class="right">
              店铺名称
            </div>
          </div>
        </router-link>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  created(){
    
  },
  methods:{

  }
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 1380969 */
  src: url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.eot');
  src: url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.woff') format('woff'),
  url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1380969_5hpkg6c3lwa.svg#iconfont') format('svg');
}
.el-icon-date{
  font-style: 80px;
}
.iconfont{
  padding-left: 20px;
  padding-top: 50px;
    font-family:"iconfont" !important;
    font-size:60px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.heard{
  height: 200px;
}
.right{
  z-index: 1;
  float: right;
  margin-right: 80px;
  line-height: 150px;
}
.time{
  display: flex;
  margin-top: 100px;
  padding: 0 50px;
}
.time-data1{
  flex: 1;
  height: 150px;
  padding-top: 30px;
}
.time-data{
  z-index: 999;
flex: 1;
height: 150px;
background-color:rgba(32,167,129);
border-radius: 10px;
padding-top: 30px;

}
.time .number{
  padding-top: 30px;

  margin:0 50px;
  flex: 1;
  height: 150px;
background-color:rgba(38,187,187);
border-radius: 10px;
}
.time .number1{
  padding-top: 30px;

  flex: 1;
  height: 150px;
  background-color:rgba(245,155,74);
  border-radius: 10px;
}

  
</style>
