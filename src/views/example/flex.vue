<template>
  <div class="page-container">
    <div><a @click="visible=true">dialog</a></div>
    <div class="d-grow">
      <div style="height:800px">
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
    <ui-dialog title="dialog" :visible.sync="visible" width="50%" height="60%">
      <div style="height:800px">
        <div class="flex-table">
          <div>
            <div>title1</div>
            <div>title2</div>
            <div>title3</div>
            <div>title4</div>
          </div>
          <div>
            <div />
            <div>
              <el-input />
            </div>
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
