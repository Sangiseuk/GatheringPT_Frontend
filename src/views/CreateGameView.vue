<template>
  <v-container fluid class="create-game-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">게임 범위 설정</h1>
      </v-col>
    </v-row>

    <!-- 지도 -->
    <v-row>
      <v-col cols="12">
        <div id="map" class="map-container"></div>
      </v-col>
    </v-row>

    <!-- 범위 선택 버튼 -->
    <v-row class="setting-row">
      <v-col cols="4">
        <v-btn @click="setDrawingMode('rectangle')" color="#795013" outlined
          >사각형 그리기</v-btn
        >
      </v-col>
      <v-col cols="4">
        <v-btn @click="setDrawingMode('circle')" color="#795013" outlined
          >원 그리기</v-btn
        >
      </v-col>
      <v-col cols="4">
        <v-btn @click="setDrawingMode('polygon')" color="#795013" outlined
          >다각형 그리기</v-btn
        >
      </v-col>
    </v-row>

    <!-- 선택 완료 버튼 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="confirmSelection" color="#795013">범위 저장하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Emit 이벤트 정의
const emit = defineEmits(["save-scope"]);

// 지도와 DrawingManager 상태
let map = null;
let drawingManager = null;
const selectedShape = ref(null);

// 지도 초기화
onMounted(() => {
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5665, 126.978),
    zoom: 13,
  });

  drawingManager = new naver.maps.drawing.DrawingManager({
    map: map,
    drawingControl: false,
    rectangleOptions: {
      fillColor: "#00FF00",
      fillOpacity: 0.4,
      strokeColor: "#00FF00",
      strokeWeight: 2,
    },
    circleOptions: {
      fillColor: "#FF0000",
      fillOpacity: 0.4,
      strokeColor: "#FF0000",
      strokeWeight: 2,
    },
    polygonOptions: {
      fillColor: "#0000FF",
      fillOpacity: 0.4,
      strokeColor: "#0000FF",
      strokeWeight: 2,
    },
  });

  // 드로잉 완료 이벤트
  naver.maps.Event.addListener(drawingManager, "drawend", (overlay) => {
    if (selectedShape.value) {
      // 이전 도형 제거
      selectedShape.value.setMap(null);
    }
    selectedShape.value = overlay; // 새로 생성된 도형 저장
    drawingManager.setDrawingMode(null); // 드로잉 모드 종료
    console.log("Shape Drawn:", overlay);
  });
});

// 드로잉 모드 설정
const setDrawingMode = (mode) => {
  console.log(`Setting drawing mode to: ${mode}`);
  const modeMap = {
    rectangle: naver.maps.drawing.OverlayType.RECTANGLE,
    circle: naver.maps.drawing.OverlayType.CIRCLE,
    polygon: naver.maps.drawing.OverlayType.POLYGON,
  };

  if (!drawingManager) {
    console.error("DrawingManager is not initialized");
    return;
  }

  drawingManager.setDrawingMode(modeMap[mode]);
  console.log(`Drawing mode set: ${mode}`);
};

// 선택 완료 버튼 클릭
const confirmSelection = () => {
  if (!selectedShape.value) {
    alert("Please draw a shape on the map first.");
    return;
  }

  let scopeData = null;

  // 도형 정보 구성
  if (selectedShape.value instanceof naver.maps.Rectangle) {
    scopeData = {
      type: "rectangle",
      bounds: selectedShape.value.getBounds().toJSON(),
    };
  } else if (selectedShape.value instanceof naver.maps.Circle) {
    scopeData = {
      type: "circle",
      center: selectedShape.value.getCenter().toJSON(),
      radius: selectedShape.value.getRadius(),
    };
  } else if (selectedShape.value instanceof naver.maps.Polygon) {
    scopeData = {
      type: "polygon",
      paths: selectedShape.value
        .getPaths()
        .getArray()
        .map((path) => path.toJSON()),
    };
  }

  console.log("Selected Shape:", scopeData);
  emit("save-scope", scopeData); // 부모 컴포넌트로 데이터 전달
};
</script>

<style scoped>
.create-game-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
}

.map-container {
  width: 100%;
  height: 500px;
  border: 2px solid #795013;
  border-radius: 8px;
}

.title {
  color: #795013;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.setting-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
