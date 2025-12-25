const Map = await $arcgis.import("@arcgis/core/Map.js");
const SceneView = await $arcgis.import("@arcgis/core/views/SceneView.js");
const Viewpoint = await $arcgis.import("@arcgis/core/Viewpoint.js");

const SceneLayer = await $arcgis.import("@arcgis/core/layers/SceneLayer.js");
const MeshSymbol3D = await $arcgis.import("@arcgis/core/symbols/MeshSymbol3D.js");


// ----------

const sceneView = new SceneView({
  container: "viewDiv",
  map: new Map({
    basemap: "dark-gray-vector"
  })
})

const initialViewPoint = new Viewpoint({
  camera: {
    heading: 0,
    tilt: 60,
    position: [139.7633525, 35.6547036, 1500]
  }
});

sceneView.viewpoint = initialViewPoint;

sceneView.environment = {
  lighting: {
    type: "sun",
    date: new Date(2025, 11, 25, 0, 0, 0)
  },
  weather: {
    type: "snowy"
  }
}

// -----

// ca7baa183c6e4c998a668a6fadc5fc49
// b8fec5af7dfe4866b1b8ac2d2800f282

const buildingSceneLayer = new SceneLayer({
  portalItem: {
    id: "b8fec5af7dfe4866b1b8ac2d2800f282"
  },
  minScale: 0,
  maxScale: 0
});

const meshSymbol3D = (color) => {

  const meshSymbol3D = new MeshSymbol3D({
    symbolLayers: [
      {
        type: "fill",
        castShadows: true,
        edges: {
          type: "sketch",
          color: color,
          size: 1,
          extensionLength: 10
        },
        material: {
          color: [0,255,0,0],
          colorMixMode: "replace",
        }
      },
    ]
  });

  return meshSymbol3D;

}



buildingSceneLayer.renderer = {
  type: "unique-value",
  valueExpression: "When($feature.objectid % 5 == 0, 'red', $feature.objectid % 5 == 1, 'yellow', $feature.objectid % 5 == 2, 'orange', $feature.objectid % 5 == 3, 'lightblue', $feature.objectid % 5 == 4, 'green','none')",
  uniqueValueInfos:[{
    value: "red",
    symbol: meshSymbol3D("red")
  },{
    value: "yellow",
    symbol: meshSymbol3D("yellow")
  },{
    value: "orange",
    symbol: meshSymbol3D("orange")
  },{
    value: "lightblue",
    symbol: meshSymbol3D("lightblue")
  },{
    value: "green",
    symbol: meshSymbol3D("green")
  }]
}


sceneView.map.add(buildingSceneLayer);

