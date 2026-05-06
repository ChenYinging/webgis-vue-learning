<template>
  <div class="map-page">
    <!-- 顶部工具栏 -->
     <div class="toolbar">
        <span class="toolbar-label">地图模式：</span>
        <el-radio-group v-model="mapMode">
          <el-radio-button value="2d"> 2D 地图</el-radio-button>
          <el-radio-button value="3d"> 3D 地图</el-radio-button>
        </el-radio-group>
     </div>

     <!-- 地图主体 -->
      <div class="map-body">
        <div class="map-area">
          <!-- 2D 地图 -->
          <LeafletMap v-if="mapMode === '2d'" @city-click="handleCityClick" />
          <!-- 3D 地图 -->
          <CesiumMap v-else @city-click="handleCityClick" />
        </div>

        <!-- 右侧城市列表 -->
        <div class="city-list">
          <div class="city-list-header">
            <h3>📍 安徽省城市</h3>
          </div>
          <el-scrollbar style="height: calc(100% - 50px)">
            <div
              v-for="city in cityList"
              :key="city.adcode"
              class="city-item"
            >
              <div class="city-name">{{ city.name }}</div>
              <div class="city-density">人口密度：{{ city.density }} 人/km²</div>
              <div class="city-color-bar" :style="{ background: getColor(city.density) }" />
            </div>
          </el-scrollbar>
        </div>

        <!-- 弹窗信息 -->
         <transition name="el-fade-in">
            <div v-if="selectedCity" class="city-popup">
              <div class="popup-header">
               <span>{{ selectedCity.name }}</span>
                <el-button type="link" icon="el-icon-close" @click="selectedCity = null" />
              </div>
              <div class="popup-body">
                <p>人口密度：<strong>{{ selectedCity.density }} 人/km²</strong></p>
                <p>行政区划代码：{{ selectedCity.adcode }}</p>
                <p>经度：{{ selectedCity.lng.toFixed(4) }}°</p>
                <p>纬度：{{ selectedCity.lat.toFixed(4) }}°</p>
              </div>
              <div class="popup-footer">
                <el-button type="primary" size="small" @click="selectedCity = null">
                  关闭
                </el-button>
              </div>
            </div>
         </transition>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import LeafletMap from '../components/LeafletMap.vue'
import CesiumMap from '../components/CesiumMap.vue'
import { anhuiData } from '../assets/anhuiData.js'

export default {
  name: 'MapPage',
  components: { LeafletMap, CesiumMap },
  setup() {
    const mapMode = ref('2d')
    const selectedCity = ref(null)

    // 从 GeoJSON 中提取城市列表
    const cityList = ref(
      anhuiData.features.map(f => ({
        adcode: f.properties.adcode,
        name: f.properties.name,
        density: f.properties.density
      }))
    )

    function getColor(d) {
      return d > 700 ? '#b71c1c' :
        d > 500 ? '#e53935' :
          d > 300 ? '#fb8c00' :
            d > 150 ? '#ffeb3b' :
              '#81c784'
    }

    function handleCityClick(city) {
      selectedCity.value = city
    }

    return {
      mapMode,
      cityList,
      selectedCity,
      getColor,
      handleCityClick
    }
  }
}
</script>

<style scoped>
.map-page {
display: flex;
flex-direction: column;
height: calc(100vh - 60px);
background: #f5f7fa;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.toolbar-label {
  font-weight: 500;
  color: #333;
}

.map-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.map-area {
  flex: 1;
  position: relative;
}

.city-list {
  width: 280px;
  background: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.city-list-header {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.city-list-header h3 {
  margin: 0;
  font-size: 15px;
  color: #333;
}

.city-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.city-name {
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.city-density {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.city-color-bar {
  height: 3px;
  border-radius: 2px;
  margin-top: 4px;
}

/* 弹窗 */
.city-popup {
  position: absolute;
  right: 290px;
  top: 150px;
  width: 260px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 500;
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #409eff;
  color: #fff;
  font-weight: 600;
}

.popup-body {
  padding: 16px;
}

.popup-body p {
  margin: 6px 0;
  font-size: 13px;
  color: #666;
}

.popup-footer {
  padding: 0 16px 12px;
}
</style>