<template>
  <div id="choropleth-map" class="choropleth-map" />
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { anhuiData } from '../assets/anhuiData.js'

export default {
  name: 'ChoroplethMap',
  emits: ['cityClick'],
  setup(props, { emit }) {
    let map = null
    let geojsonLayer = null

    function getColor(d) {
      return d > 700 ? '#b71c1c' :
        d > 500 ? '#e53935' :
          d > 300 ? '#fb8c00' :
            d > 150 ? '#ffeb3b' :
              '#81c784'
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      }
    }

    function highlightFeature(e) {
      const layer = e.target
      layer.setStyle({ weight: 3, color: '#666', dashArray: '', fillOpacity: 0.7 })
      layer.bringToFront()
    }

    function resetHighlight(e) {
      geojsonLayer.resetStyle(e.target)
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: () => {
          const p = feature.properties
          emit('cityClick', {
            adcode: p.adcode,
            name: p.name,
            density: p.density,
            center: p.center,
            lng: p.center[0],
            lat: p.center[1]
          })
        }
      })
    }

    function initMap() {
      map = L.map('choropleth-map', { zoomControl: true }).setView([31.73, 117.33], 7)

      L.tileLayer(
        'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        {
          subdomains: ['1', '2', '3', '4'],
          maxZoom: 19,
          attribution: '© 高德地图'
        }
      ).addTo(map)

      geojsonLayer = L.geoJson(anhuiData, { style, onEachFeature }).addTo(map)
    }

    onMounted(() => {
      initMap()
    })

    onBeforeUnmount(() => {
      map?.remove()
    })

    return {}
  }
}
</script>

<style scoped>
.choropleth-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
