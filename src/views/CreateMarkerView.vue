<template>
  <v-container fluid class="create-marker-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">마커 생성</h1>
      </v-col>
    </v-row>

    <!-- 지도 -->
    <v-row>
      <v-col cols="12">
        <div id="map" class="map-container"></div>
      </v-col>
    </v-row>

    <!-- 마커 정보 입력 -->
    <v-row class="info-row">
      <v-col cols="12">
        <v-form ref="markerForm">
          <!-- 마커 종류 및 열람 가능 횟수 -->
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="markerType"
                :items="['보물', '이벤트']"
                label="마커 종류"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="viewCount"
                label="열람 가능 횟수"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- 마커 내용 -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="markerContent"
                label="마커 내용"
                outlined
                rows="3"
                required
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- 공개 여부 -->
          <v-row>
            <v-col cols="6">
              <v-switch v-model="isPublic" label="공개 여부" inset></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <!-- 저장 버튼 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="saveMarker" color="#795013">마커 저장</v-btn>
      </v-col>
    </v-row>

    <!-- 저장된 마커 목록 -->
    <v-row>
      <v-col cols="12">
        <h3>저장된 마커 목록</h3>
        <ul>
          <li v-for="(marker, index) in savedMarkers" :key="index">
            {{ index + 1 }}. {{ marker.type }} - {{ marker.content }} ({{
              marker.position.lat
            }}, {{ marker.position.lng }})
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Router와 범위 데이터
const route = useRoute();
const scopeData = ref(null);

// Emit 이벤트 정의
const emit = defineEmits(["save-markers"]);

// 지도 및 상태 변수
let map = null;
const markers = ref([]);
const selectedPosition = ref(null);

// 마커 정보
const markerType = ref(null);
const markerContent = ref("");
const isPublic = ref(false);
const viewCount = ref(0);

// 저장된 마커 리스트
const savedMarkers = ref([]);

// 범위 데이터 가져오기
onMounted(() => {
  if (route.query.scope) {
    scopeData.value = JSON.parse(route.query.scope);
    console.log("Scope Data:", scopeData.value);
  }

  // 지도 초기화
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5665, 126.978),
    zoom: 13,
  });

  // 지도 클릭 이벤트
  naver.maps.Event.addListener(map, "click", (event) => {
    selectedPosition.value = event.coord;
    addTemporaryMarker(selectedPosition.value);
  });
});

// 임시 마커 추가
const addTemporaryMarker = (position) => {
  const marker = new naver.maps.Marker({
    position,
    map,
  });

  // 선택한 위치를 업데이트
  selectedPosition.value = position;

  // 임시 마커를 리스트에 추가
  markers.value.push(marker);
};

// 마커 저장
const saveMarker = () => {
  if (!selectedPosition.value) {
    alert("지도를 클릭하여 위치를 선택해주세요.");
    return;
  }

  if (!markerType.value || !markerContent.value || viewCount.value < 1) {
    alert("모든 필드를 올바르게 입력해주세요.");
    return;
  }

  const newMarker = {
    type: markerType.value,
    content: markerContent.value,
    isPublic: isPublic.value,
    viewCount: parseInt(viewCount.value),
    position: selectedPosition.value.toJSON(),
  };

  console.log("Marker Saved:", newMarker);
  savedMarkers.value.push(newMarker);

  // 새로운 마커를 지도에 고정
  new naver.maps.Marker({
    position: selectedPosition.value,
    map,
    title: newMarker.type,
  });

  // 마커 정보 저장 후 입력 필드 초기화
  markerType.value = null;
  markerContent.value = "";
  isPublic.value = false;
  viewCount.value = 0;
  selectedPosition.value = null;
};
</script>

<style scoped>
.create-marker-container {
  background: linear-gradient(to bottom, white 70%, #a1834a);
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

.info-row {
  margin-top: 20px;
}
</style>
