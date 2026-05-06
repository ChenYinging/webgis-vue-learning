<template>
  <div id="cesium-map" class="cesium-map" />
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { anhuiData } from '../assets/anhuiData.js'

export default {
  name: 'CesiumMap',
  emits: ['ready', 'city-click'],
  setup(props, { emit }) {
    let viewer = null

    function getColor(d) {
      return d > 700 ? '#b71c1c' :
        d > 500 ? '#e53935' :
          d > 300 ? '#fb8c00' :
            d > 150 ? '#ffeb3b' :
              '#81c784'
    }

    // ===== 生成圆点 =====
    function createCircleImg(color) {
      const size = 14
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1.5
      ctx.stroke()
      return canvas
    }

    async function initCesium() {
      viewer = new Cesium.Viewer('cesium-map', {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false
      })

      // ===== 相机飞向安徽 =====
      setTimeout(() => {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(117.5, 31.85, 1600000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90)
          },
          duration: 3
        })
      }, 300)

      // ===== 城市标注 =====
      anhuiData.features.forEach(feature => {
        const { name, center, density } = feature.properties
        viewer.entities.add({
          name,
          position: Cesium.Cartesian3.fromDegrees(center[0], center[1]),
          billboard: {
            image: createCircleImg(getColor(density)),
            width: 14,
            height: 14
          },
          label: {
            text: name,
            font: '13px sans-serif',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -14)
          },
          cityData: { name, density, lng: center[0], lat: center[1] }
        })
      })

      anhuiData.features.forEach(feature => {
        const { name } = feature.properties

        feature.geometry.coordinates.forEach(polygonCoords => {
          const flatCoords = polygonCoords[0].flat()
          const lineCoords = [...flatCoords, flatCoords[0], flatCoords[1]]

          // 透明填充（无颜色），只保留边框
          viewer.entities.add({
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArray(flatCoords),
              material: Cesium.Color.TRANSPARENT
            }
          })

          // 白色实线边框
          viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(lineCoords),
              width: 2,
              material: Cesium.Color.WHITE
            }
          })
        })
      })

      // ===== 点击事件 =====
      viewer.screenSpaceEventHandler.setInputAction(click => {
        const picked = viewer.scene.pick(click.position)
        if (picked && picked.id && picked.id.cityData) {
          emit('city-click', picked.id.cityData)
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

      emit('ready', viewer)
    }

    onMounted(() => {
      initCesium()
    })

    onBeforeUnmount(() => {
      viewer?.destroy()
    })

    return {}
  }
}
</script>

<style scoped>
.cesium-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}
</style>
