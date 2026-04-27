import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YzI3MDNmYS1jODdhLTRmMWYtODk0NS03NDgzZjVkMmNjZWIiLCJpZCI6NDIyODg0LCJpYXQiOjE3NzcwMTMwMTN9.OsIRav1L5PE93LE279SVgiTPmolOhpIJL0S04_qRzO8';
// 创建Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {

  // 隐藏不需要的控件
  baseLayerPicker: false,       // 底图切换器
  timeline: false,              // 底部时间轴
  animation: false,             // 左上角动画播放器
  sceneModePicker: false,       // 2D/3D视角切换
  navigationHelpButton: false,  // 帮助按钮
  geocoder: false,              // 顶部搜索框
  homeButton: false,            // 首页复位按钮
  fullscreenButton: false,      // 全屏按钮
  infoBox: false,               // 点击弹窗信息框
  selectionIndicator: false,    // 选中物体高亮指示器
})

console.log("Cesium Viewer 创建成功！")

// camera 相机控制
// 飞到北京
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.39, 39.90, 150000),
  duration: 3,   // 飞行动画持续时间（秒）

  // 相机姿态（朝向）
  orientation: {
    heading: Cesium.Math.toRadians(0),   // 水平偏转（弧度）
    pitch: Cesium.Math.toRadians(-90),    // 俯仰角
    roll: 0   // 翻滚角
  }
})

// entity 实体标注
// 添加点标记
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 0),
  point: {
    pixelSize: 12,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  },
  label: {
    text: "北京天安门",
    font: "14px sans-serif",
    fillColor: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,    // 样式：填充+轮廓
    pixelOffset: new Cesium.Cartesian2(0, -20),   // 文字偏移：(x=0, y=-20) → 点正上方20px
    showBackground: true,
    backgroundColor: new Cesium.Color(0, 0, 0, 0.5),
  }
})

// 添加折线
const linePositions = [
  Cesium.Cartesian3.fromDegrees(116.39, 39.91),
  Cesium.Cartesian3.fromDegrees(116.44, 39.95),
  Cesium.Cartesian3.fromDegrees(116.50, 39.93),
];

viewer.entities.add({
  polyline: {
    positions: linePositions,
    width: 4,
    material: Cesium.Color.CYAN
  }
})

// 添加多边形
viewer.entities.add({
  polygon: {
    // 层级： 定义多边形顶点
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        116.38, 39.90,
        116.42, 39.90,
        116.42, 39.94,
        116.38, 39.94,
        // 自动闭合，无需重复第一个点
      ])
    },
    material: Cesium.Color.RED.withAlpha(0.5),   // 半透明红色
    outline: true,
    outlineColor: Cesium.Color.DARKRED
  }
})

// 实体拾取
// 创建屏幕空间事件处理器，绑定到画布场景
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// 为左键点击事件绑定处理函数
handler.setInputAction((click) => {
  const picked = viewer.scene.pick(click.position);

  if (picked && picked.id) {
    console.log("点击了实体：", picked.id);
    console.log("实体ID:", picked.id.id)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

const handler2 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// 注册左键单击事件
handler2.setInputAction((click) => {

  // 获取点击处的地理坐标
  // 从相机发射射线，穿过点击的屏幕像素
  const ray = viewer.camera.getPickRay(click.position);
  // 求射线与地球表面的交点
  const cartesian = viewer.scene.globe.pick(ray, viewer.scene);

  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const lon = Cesium.Math.toDegrees(cartographic.longitude);
    const lat = Cesium.Math.toDegrees(cartographic.latitude);
    console.log(`经度: ${lon.toFixed(6)}, 纬度: ${lat.toFixed(6)}`);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


