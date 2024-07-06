import * as echarts from 'echarts'

export const useTwomyCharts = (data) => {
    const twoMycharts = () => {
      const ass = document.getElementById('twoMycharts')
        const myChart = echarts.init(ass)
        const { parkIndustry } = data.value
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: '0',
            left: 'center',
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 8,
            textStyle: {
              color: '#fff',
              fontSize: '12'
            }
          },
          series: [
            {
              name: '园区产业分析',
              type: 'pie',
              radius: ['55%', '60%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  return `${params.seriesName} <br/>
                ${params.marker} ${params.name} ${params.percent}%`
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: parkIndustry,
            }
          ]
        }
      
        option && myChart.setOption(option)
      
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      
      }
      
    return{
        twoMycharts
    }
}
