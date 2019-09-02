<template>
  <div
    id="app"
    v-title
    data-title="物流"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>

