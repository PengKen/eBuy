<template>
  <div id="k-lines"></div>
</template>

<script>
  import { mapGetters } from 'vuex'
    require("echarts/lib/chart/candlestick");
    import 'echarts/lib/chart/line'

  var echarts = require('echarts');
  export default {
    name: "k-line",
    computed:{
      ...mapGetters({
       values: 'battle/KLineData',
        categoryData: 'battle/KLineTime'
      })
    },
    data() {
      return {
        option: {

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            show:true
          },
          legend: {
            data: ['日K']
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: this.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100
            }
          ],
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: this.values,
              itemStyle: {
                normal: {
                  color: '#ec0000',
                  color0: '#00da3c',
                  borderColor: '#8A0000',
                  borderColor0: '#008F28'
                }
              },
              markPoint: {
                label: {
                  normal: {
                    formatter: function (param) {
                      return param != null ? Math.round(param.value) : '';
                    }
                  }
                },
                data: [
                  {
                    name: 'XX标点',
                    coord: ['2013/5/31', 2300],
                    value: 2300,
                    itemStyle: {
                      normal: {color: 'rgb(41,60,85)'}
                    }
                  },
                  {
                    name: 'highest value',
                    type: 'max',
                    valueDim: 'highest'
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'lowest'
                  },
                  {
                    name: 'average value on close',
                    type: 'average',
                    valueDim: 'close'
                  }
                ],
                tooltip: {
                  formatter: function (param) {
                    return param.name + '<br>' + (param.data.coord || '');
                  }
                }
              },
              markLine: {
                symbol: ['none', 'none'],
                data: [
                  [
                    {
                      name: 'from lowest to highest',
                      type: 'min',
                      valueDim: 'lowest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        normal: {show: false},
                        emphasis: {show: false}
                      }
                    },
                    {
                      type: 'max',
                      valueDim: 'highest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        normal: {show: false},
                        emphasis: {show: false}
                      }
                    }
                  ],
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close'
                  },
                  {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close'
                  }
                ]
              }
            }

          ]
        }

      }
    },



    mounted() {
      this.$nextTick(()=>{
        var dom = document.getElementById("k-lines");
        var myChart = echarts.init(dom, 'light')
        console.log(this.option)
        myChart.setOption(this.option,true);
      })


    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  #k-lines{
    width: 100%;
    height: 100%;
    tspan{
      font-size: 0;
    }
  }
</style>
