<template>
  <div id="k-lines"></div>
</template>

<script>
  import data0 from './data'
  console.log(data0)
  require("echarts/lib/chart/candlestick");
  import 'echarts/lib/chart/line'
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  // require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  // require('echarts/lib/component/tooltip');
  // require('echarts/lib/component/title');
  export default {
    name: "k-line",
    computed:{


    },
    data() {
      return {
        option: {
          title: {
            text: '上证指数',
            left: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: ['2013/1/24'],
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
              data: [[2320.26,2320.26,2287.26,2362.98]],
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
            },
            {
              name: 'MA5',
              type: 'line',
              data: this.calculateMA(5),
              smooth: true,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: this.calculateMA(10),
              smooth: true,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: this.calculateMA(20),
              smooth: true,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: this.calculateMA(30),
              smooth: true,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            },

          ]
        }

      }
    },

    mounted() {
      this.$nextTick(()=>{
        var dom = document.getElementById("k-lines");
        var myChart = echarts.init(dom, 'light', {renderer: 'svg'})
        console.log(this.option)
        myChart.setOption(this.option,true);
      })


    },
    methods: {
      splitData(rawData) {

        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i])
        }
        return {
          categoryData: categoryData,
          values: values
        };
      },
      calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }
    }
  }
</script>

<style scoped>
  #k-lines{
    width: 100%;
    height: 200px;
  }
</style>
