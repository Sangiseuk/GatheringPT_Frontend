<template>
    <v-container fluid class="create-game-container">
        <h2>게임 템플릿 생성</h2>

        <!-- Step 1: 범위 유형 선택 -->
        <section>
            <h3>1. 범위 유형 선택</h3>
            <v-row justify="center" class="my-4">
                <v-chip v-for="option in rangeOptions" :key="option.value" outlined color="primary" class="mx-2"
                    @click="selectRange(option.value)" :class="{ 'active-chip': selectedRange === option.value }">
                    {{ option.label }}
                </v-chip>
            </v-row>
        </section>

        <!-- Step 2: 범위 설정 -->
        <section>
            <h3>2. 범위 설정</h3>
            <p>선택한 유형: {{ selectedRange }}</p>
            <div id="map" class="map"></div>
            <v-btn v-if="selectedShape" color="primary" class="mt-4" @click="saveShape">범위 저장</v-btn>
        </section>

        <!-- Step 3: 마커 추가 -->
        <section>
            <h3>3. 마커 추가 및 설정</h3>
            <v-btn @click="addMarker" color="primary" outlined>Add Marker</v-btn>
            <v-row>
                <v-col v-for="(marker, index) in markers" :key="index" cols="12">
                    <v-card class="my-2">
                        <v-card-title>
                            Marker {{ index + 1 }}
                            <v-chip-group v-model="marker.type" active-class="selected-chip">
                                <v-chip value="treasure" outlined>보물</v-chip>
                                <v-chip value="event" outlined>이벤트</v-chip>
                            </v-chip-group>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="marker.contentText" label="마커 내용" outlined
                                class="mb-2"></v-text-field>
                            <v-switch v-model="marker.isVisible" label="공개 여부"></v-switch>
                            <v-text-field v-model="marker.viewCount" label="열람 횟수" type="number"
                                outlined></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </section>

        <!-- Step 4: 게임 정보 입력 -->
        <section>
            <h3>4. 게임 정보 입력</h3>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="maxParticipants" label="최대 참여 인원" type="number" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="timeLimit" label="제한 시간 (분)" type="number" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-textarea v-model="announcement" label="게임 공지사항" rows="3" outlined></v-textarea>
        </section>

        <!-- Submit Button -->
        <section class="mt-4">
            <v-btn @click="createGame" color="success" block>게임 생성</v-btn>
        </section>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const map = ref(null);
const drawingManager = ref(null);
const selectedRange = ref(null);
const selectedShape = ref(null);
const markers = ref([]);
const maxParticipants = ref(10);
const timeLimit = ref(30);
const announcement = ref("");

const rangeOptions = [
    { label: "사각형", value: "rectangle" },
    { label: "다각형", value: "polygon" },
    { label: "라인", value: "polyline" },
];

const initializeMap = () => {
    map.value = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5665, 126.9780),
        zoom: 13,

    });
    naver.maps.Event.once(map, 'init', function () {
        console.log('올바른 참조 시점', map.getOptions('minZoom') === 10);
    });


    drawingManager.value = new naver.maps.drawing.DrawingManager({
        map: map.value,
        drawingControl: true,
        drawingControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
            style: naver.maps.drawing.DrawingStyle.VERTICAL,
            drawingModes: [],
        },
        rectangleOptions: {
            fillColor: "#FFD700",
            fillOpacity: 0.5,
            strokeColor: "#FF8C00",
            strokeWeight: 3,
        },
        polygonOptions: {
            fillColor: "#FFD700",
            fillOpacity: 0.5,
            strokeColor: "#FF8C00",
            strokeWeight: 3,
        },
    });

    drawingManager.value.addListener("rectangleAdded", (overlay) => {
        selectedShape.value = overlay;
        console.log("Rectangle Added:", overlay.getBounds());
    });

    drawingManager.value.addListener("polygonAdded", (overlay) => {
        selectedShape.value = overlay;
        console.log("Polygon Added:", overlay.getPaths());
    });
};

const selectRange = (range) => {
    selectedRange.value = range;
    if (range === "rectangle") {
        drawingManager.value.setOptions({ drawingModes: [naver.maps.drawing.DrawingMode.RECTANGLE] });
    } else if (range === "polygon") {
        drawingManager.value.setOptions({ drawingModes: [naver.maps.drawing.DrawingMode.POLYGON] });
    } else if (range === "polyline") {
        drawingManager.value.setOptions({ drawingModes: [naver.maps.drawing.DrawingMode.POLYLINE] });
    }
};

const addMarker = () => {
    const marker = new naver.maps.Marker({
        position: map.value.getCenter(),
        map: map.value,
    });
    markers.value.push({
        type: "treasure",
        contentText: "",
        isVisible: true,
        viewCount: 0,
        latLng: marker.getPosition(),
    });
};

const saveShape = () => {
    console.log("Selected Shape:", selectedShape.value);
};

const createGame = () => {
    console.log("Game Data:", {
        rangeType: selectedRange.value,
        shapeData: selectedShape.value,
        markers: markers.value,
        maxParticipants: maxParticipants.value,
        timeLimit: timeLimit.value,
        announcement: announcement.value,
    });
};

onMounted(() => initializeMap());
</script>

<style scoped>
.create-game-container {
    background: linear-gradient(to bottom, white 70%, #a1834a);
    min-height: 100vh;
    padding: 20px;
}

.map {
    height: 500px;
    border: 2px solid #795013;
    border-radius: 8px;
}

h2,
h3 {
    color: #795013;
}

.active-chip {
    background-color: #795013 !important;
    color: white !important;
}
</style>