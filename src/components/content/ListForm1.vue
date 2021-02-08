<template>
  <div>
    <TextList-my>
      <TextListItem-my
        v-for="(item, key) in datas"
        :key="key"
        :widthLength="100"
        :leftLength="30"
        :rightLength="30"
      >
        <template slot="left">{{ key }}</template>
        <template slot="right">
          <el-input
            v-model.trim="item.Value"
            v-if="item.ViewType === 'Input'"
            :maxlength="item.maxlen ? item.maxlen : 1000"
          />

          <el-switch
            v-model="item.Value"
            v-else-if="item.ViewType === 'Switch'"
          />
          <!-- <Select-my
            :checked="item.Value"
            v-else-if="item.ViewType === 'Switch'"
            @click.native="adds"
          ></Select-my>-->
          <!-- <div class="pretty success" v-else-if="item.ViewType === 'Switch'">
            <input class="checkbox" type="checkbox" v-model="item.Value" value />
            <label class="label" @click="checkclick"></label>
          </div>-->

          <el-select
            v-model="item.Value"
            v-else-if="item.ViewType === 'Select'"
          >
            <el-option
              v-for="items in item.SubItem"
              :value="items"
              :key="items"
            >
              {{ items }}
            </el-option>
          </el-select>
        </template>
      </TextListItem-my>
    </TextList-my>
  </div>
</template>
<script>
export default {
  props: {
    datas: {},
  },
  data() {
    return {};
  },

  methods: {
    checkselect(event) {
      console.log("点击", event);
    },
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
    "TextList-my": () => import("components/common/TextList"),
    "TextListItem-my": () => import("components/common/TextListItem"),
  },
  computed: {},
  mounted() {},
};
</script>
<style>
.el-select {
  width: 100%;
}
</style>
