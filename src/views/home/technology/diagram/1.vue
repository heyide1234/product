<template>
  <div :style="{height:clientHeight+'px',width:clientWidth+'px'}" class="des">
    <div ref="main" id="mainS"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
var myChart = "";
export default {
  props: {
    datas: {
      type: Array,
      default: () => ([{name:"123456",value:0,children:[]}])
    }
  },
  data() {
    return {
      option:{
        
        }, 
        
        //////
       
    };
  },
  methods:{
      SetChartsData(){
            myChart.setOption(
              {
                tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        // legend: {
        //     top: '2%',
        //     left: '3%',
        //     orient: 'vertical',
        //     data: [{
        //         name: '1212345',
        //         icon: 'rectangle'
        //     }],
        //     borderColor: '#c23531'
        // },
        series:[
            {
                type: 'tree',
                name: '1212345',
                data: this.datas,
                top: '5%',
                left: '7%',
                bottom: '2%',
                right: '10%',
                symbolSize: 10,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750

            },]
              },true
            );
         }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
   
    myChart = echarts.init(this.$refs.main);

    // 绘制图表
    myChart.setOption(this.option);
 
  },
  destroyed(){

  },
  computed: {
    clientHeight() {
      // return document.body.clientHeight / 10;
      return window.screen.availHeight - 135;
    },
    clientWidth() {
      // return document.body.clientHeight / 10;
      return window.screen.availWidth;
    }
  },
  watch: {
    //观察option的变化
    datas: {
                handler(newVal, oldVal) {
                   console.log(newVal, oldVal);
          
                    this.SetChartsData()
       

                },
                deep: true
            }
  },
  created(){
    this.$nextTick(()=>{
      // document.querySelector("#mainS").style.width="500px";
      //  document.querySelector("#mainS").style.height="500px";
    })
  }
};
</script>
<style scoped>
#mainS {
  background-color: "#05224d";
  height:100%;
  width: 100%;
}

</style>
