<template>
  <div>
    <TextList-my>
      <TextListItem-my
        v-for="(item, key) in datas"
        :key="key"
        :widthLength="widthLengthD"
        :leftLength="leftLengthD"
        :rightLength="rightLengthD"
        :isshowFs="true"
      >
        <template slot="left">{{ item.Key }}</template>
        <template slot="right">
          <el-input
            v-model.trim="item.Value"
            v-if="item.ViewType === 'Input'"
            :maxlength="item.maxlen ? item.maxlen : 1000"
          />

          <el-switch v-model="item.Value" v-else-if="item.ViewType === 'Switch'" />
          <!-- <Select-my
            :checked="item.Value"
            v-else-if="item.ViewType === 'Switch'"
            @click.native="adds"
          ></Select-my>-->
          <!-- <div class="pretty success" v-else-if="item.ViewType === 'Switch'">
            <input class="checkbox" type="checkbox" v-model="item.Value" value />
            <label class="label" @click="checkclick"></label>
          </div>-->

          <el-select v-model="item.Value" v-else-if="item.ViewType === 'Select'">
            <el-option v-for="items in item.SubItem" :value="items" :key="items">{{ items }}</el-option>
          </el-select>

          <el-button
            class="buttons"
            v-else-if="item.ViewType === 'Button'"
            type="primary"
            @click="cmdmentod(item.Value)"
          >{{ item.Value }}</el-button>
        </template>
      </TextListItem-my>
    </TextList-my>
  </div>
</template>
<script>
export default {
  props: {
    datas: {},
    widthLengthD: {
      type: Number,
      default: 100
    },
    leftLengthD: {
      type: Number,
      default: 30
    },
    rightLengthD: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {};
  },

  methods: {
    cmdmentod(v) {
      this.$emit("parentmt", v);
    }

    // checkclick(event) {
    //   event.currentTarget.previousElementSibling.checked = !event.currentTarget
    //     .previousElementSibling.checked;
    //   event.currentTarget.previousElementSibling.value = !event.currentTarget
    //     .previousElementSibling.checked;

    //   console.log(event.currentTarget.previousElementSibling.value);
    //   console.log(this.datas);
    // },
  },
  components: {
    "TextList-my": () =>
      import(
        // webpackChunkName:"myComp",
        "components/common/TextList"
      ),
    "TextListItem-my": () =>
      import(
        // webpackChunkName:"myComp",
        "components/common/TextListItem"
      )
  },
  computed: {},
  mounted() {},
  filters: {
    isBtn(val) {
      if (val.indexOf("button") > -1) {
        return "";
      } else {
        return val;
      }
    }
  }
};
</script>
<style>
.el-select {
  width: 100%;
}
.buttons {
  width: 100%;
}
</style>
