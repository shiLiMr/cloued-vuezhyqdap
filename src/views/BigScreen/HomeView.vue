<template>

  <v-scale-screen width="1980" height="1080">
    <div class="all-charts">
      <div class="action-top">
        <img  src="https://fe-hmzs.itheima.net/big-screen/img/park-logo.48f47fe1.png" alt="">
        <div class="top-right">
          <img src="../../assets/a.png" alt="">
          <img src="../../assets/b.png" alt="">
        </div>
      </div>
      <div class="action-one">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt="">
        <div class="onecontent" v-if="data">
          <div class="aa">
            <p class="aas">{{ data.base.buildingTotal }}</p>
            <img src="https://fe-hmzs.itheima.net/big-screen/img/building-icon.604513ec.png" alt="">
            <p>楼宇总数</p>
            <p>( 栋 )</p>
          </div>
          <div class="aa">
            <p class="aas">{{ data.base?.enterpriseTotal }}</p>
            <img src="https://fe-hmzs.itheima.net/big-screen/img/building-icon.604513ec.png" alt="">
            <p>楼宇总数</p>
            <p>( 栋 )</p>
          </div>
          <div class="aa">
            <p class="aas">{{ data.base?.parkingTotal }}</p>
            <img src="https://fe-hmzs.itheima.net/big-screen/img/building-icon.604513ec.png" alt="">
            <p>楼宇总数</p>
            <p>( 栋 )</p>
          </div>
          <div class="aa">
            <p class="aas">{{ data.base?.chargePoleTotal }}</p>
            <img src="https://fe-hmzs.itheima.net/big-screen/img/building-icon.604513ec.png" alt="">
            <p>楼宇总数</p>
            <p>( 栋 )</p>
          </div>
        </div>
      </div>
      <div class="action-tow">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="">

        <div id="oneRef" style="width: 100%; height: calc(100% - 30px)"></div>
      </div>
      <div class="action-three">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
          alt="">

        <div id="twoMycharts" style="width: 100%; height: calc(100% - 30px)"></div>
      </div>
    </div>
    <div class="model-actionss">
      <loadingcom :loadStau="loadStau"></loadingcom>

      <canvas class="canvas3d" ref="canvas3dRef"></canvas>
    </div>
    <div @mousedown.stop="handleClose" v-if="modelSs" class="modeldiv animate__animated"
      :class="{ animate__zoomIn: modelSs }" :style="{ left: x + 'px', top: y + 'px' }">
      <img class="close" @mousedown.stop="handleClose" src="../../assets/close.png" alt="">
      <div v-if="buildingData" class="detalis">
        <p class="title">{{ buildingData.name }}</p>
        <div class="status">
          <p>楼层数:  {{ buildingData.floors }}</p>
          <button>{{ buildingData.status == 0? '空置中':"租凭中" }}</button>
        </div>
        <p>总面积(㎡) : {{ buildingData.area }}</p>
        <p>承租单位 : {{  buildingData.rentEnterpriseName ? buildingData.rentEnterpriseName:'暂无' }}</p>
      </div>
      <div v-if="carsData"  class="detalis">
        <p class="title">{{ carsData.areaName }}</p>
        <div class="status">
          <p>空闲车位:  {{ carsData.remainSpaceNum }}</p>
          <button>占有率:  {{ (carsData.spaceProportion) *100    }}%</button>
        </div>
        <p>占用车位: {{ carsData.occupancySpaceNum }}</p>
        <p>停车位数 : {{ carsData.totalSpaceNum }}</p>
        <p>面积(㎡) : {{ carsData.areaProportion }}</p>
      </div>
    </div>
  </v-scale-screen>

</template>
<script setup lang='ts'>
import {  onMounted, ref, watchEffect, } from 'vue'
import VScaleScreen from 'v-scale-screen'
import { useParkInfo } from './composables/useParkInfo'
const { data, getDatas } = useParkInfo()
import { Application } from '@splinetool/runtime';
import loadingcom from '@/components/LoadingCom.vue'
import { useOnemyCharts } from './composables/useOnemyCharts'
const { oneMycharts } = useOnemyCharts(data)

import { useTwomyCharts } from './composables/useTwomyCharts'
import { getParkAreaApi, getParkBuildingApi } from '@/api/park';
const { twoMycharts } = useTwomyCharts(data)

const loadStau = ref<boolean>(false)
const x = ref()
const y = ref()

const buildingData = ref() //楼宇数据
const carsData = ref()//停车场数据

const canvas3dRef = ref() //模型实例
const init3dModel = () => {
  loadStau.value = true
  //实例化模型加载器以及指定渲染的dom
  const spline = new Application(canvas3dRef.value)

  //加载模型
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    // 模型加载成功后
    loadStau.value = false // loading加载
    spline.addEventListener('mouseDown', (e) => {
      x.value = ''
      y.value = ''

      const params = e.target
      console.log(params);
      
      if (params.name.indexOf('办公楼') !== -1) {
        buildingData.value = null
        carsData.value=null
        
        getBuildingInfoget(params.id) //请求数据
        window.addEventListener('mousedown', (e) => {
          x.value = e.offsetX
          y.value = e.offsetY
        })

        handleClose()

      } else if (params.name.indexOf('停车场') !== -1) {
        buildingData.value = null
        carsData.value=null
        
        getParkingInfoget(params.id) // 请求数据
        window.addEventListener('mousedown', (e) => {
          x.value = e.offsetX
          y.value = e.offsetY
        })

        handleClose()

      } 



    })

  })
}
// 请求楼宇信息
const getBuildingInfoget = async (id) => {
  const res = await getParkBuildingApi(id)
  buildingData.value = res.data
}
// 请求停车场信息
const getParkingInfoget = async (id) => {
  const res = await getParkAreaApi(id)
  carsData.value = res.data
}
const handleClose = () => {
  x.value = ''
  y.value = ''
}
const modelSs = ref(false)
watchEffect(()=>{
  if (x.value && y.value) {
    modelSs.value = true
  } else {
    modelSs.value = false
  }
})



onMounted(async () => {
  await getDatas()

  oneMycharts()

  twoMycharts()
  //加载3D模型
  init3dModel()
})



</script>
<style lang='scss' scoped>
.modeldiv {
  width: 18.75rem;
  height: 170px;
  padding: 6px;
  box-sizing: border-box;
  background-image: url('@/assets/modal-bg.728d15e2.png');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;

  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .detalis{
    padding: 3px;
    box-sizing: border-box;
    width: 100%;
    font-size: 13px;
    p{
      height: 30px;
      line-height: 30px;
    }
    .title{
      font-size: 18px;
    }
    .status{
      display: flex;
      justify-content: space-between;
      align-items: center;
      button{
        background-color: transparent;
        border: .0625rem solid rgba(54, 135, 255, .7);
        border-radius: .0625rem;
        outline: none;
        color: #fff;
        padding: 3px 5px;
      }
    }
  }
}

.model-actionss {
  width: 100%;
  height: 100%;
  background-color: black;
}

.all-charts {
  color: #fff;
  width: 480px;
  height: 100%;
  background: linear-gradient(to left,
      rgba(0, 6, 15, 0) 0%,
      rgba(0, 6, 15, 0) 20%,
      rgba(0, 0, 0, 0.4)30%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(1, 4, 11, 1) 70%,
      #04070d 100%);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  .action-top{
    margin-top: -50px;
    width: 127vw;
    flex-basis: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    >img{
      width: 450px;
    }
    .top-right{
      margin-top: 5px;
      img{
        width: 75px;
        margin-right: 9px;
      }
    }
  }

  .action-one {
    flex-basis: 35%;
    
    height: calc(100% - .3rem);

    .img-header {
      height: 33px;
      margin-bottom: 10px;
      margin-bottom: 11px;
    }

    .onecontent {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .aa {
        width: 25%;
        font-size: 13px;
        text-align: center;
        position: relative;

        >img {
          height: 60px;
        }

        .aas {
          width: 100px;
          text-align: center;
          position: absolute;
          top: 0;
          left: 4.5%;
        }
      }
    }
  }

  .action-tow {
    flex-basis: 35%;

    >img {
      height: 30px;
      margin-top: 20px;

    }
  }

  .action-three {
    flex-basis: 35%;


    >img {
      margin-top: 20px;
      height: 30px;
      // margin-bottom: 10px;
    }

  }
}
</style>
