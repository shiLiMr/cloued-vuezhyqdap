import * as echarts from 'echarts'

export const useOnemyCharts = (data) => {
    const oneMycharts = () => {
      const ass = document.getElementById('oneRef')
        const myChart = echarts.init(ass)
        const { parkIncome } = data.value
      
        const option = {
          title: {
            subtext: '单位  :   元',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: parkIncome?.xMonth,
            axisTick: {
              show: false
            },
      
      
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          legend: {
            data: ['收入情况'],
            left: 'right',
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 8,
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              data: parkIncome?.yIncome.map((item, index) => {
                var color = {}
                if (index % 2 === 0) {
                  color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0.23,
                    color: '#74c0f8'
                  }, {
                    offset: 1,
                    color: 'rgba(116,192,248,0.00)'
                  }])
                } else {
                  color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0.23,
                    color: '#ff7152'
                  }, {
                    offset: 1,
                    color: 'rgba(225,113,82,0.00)'
                  }])
                }
      
                return {
                  value: item,
                  itemStyle: {
                    color: color
                  }
                }
              }),
              type: 'bar',
              // 宽度
              barWidth: 16,
              name: '收入情况',
      
            }
          ],
          textStyle: {
            color: '#B4C0CC'
          }
        }
      
        option && myChart.setOption(option)
      
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      
      }

    return{
        oneMycharts
    }
}
