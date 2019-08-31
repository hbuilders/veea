<template>
  <div class="page-container">
    <div class="p10">
      <el-button @click="visible=true">可拖拽Dialog</el-button>
    </div>
    <div class="d-grow p10">
      <div style="height:800px">
        <div class="py20">内容区域溢出滚动,header 与 footer 固定</div>
        <div class="flex-table">
          <div>
            <div>title1</div>
            <div>title2</div>
            <div>title3</div>
            <div>title4</div>
          </div>
          <div>
            <div />
            <div>value2</div>
            <div>value3</div>
            <div>value4</div>
          </div>
          <div>
            <div>title1</div>
            <div>title2</div>
            <div>title3</div>
            <div>title4</div>
          </div>
          <div>
            <div />
            <div>value2</div>
            <div>value3</div>
            <div>value4val</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div>
        footer
      </div>
    </div>
    <ui-dialog title="拖动标题栏" :visible.sync="visible" width="50%" height="60%">
      <div style="height:800px" class="p10 d-flex x-center">
        内容溢出滚动
      </div>
      <div slot="footer">
        <div>footer</div>
        <div>
          <el-button type="primary">提交</el-button>
        </div>
      </div>
    </ui-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
