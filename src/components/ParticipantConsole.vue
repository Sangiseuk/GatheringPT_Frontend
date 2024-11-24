<template>
	<div>
	  <h1>STOMP WebSocket Location Sender</h1>
	  <p><b>Status:</b> {{ connectionStatus }}</p>
	  <p><b>Current Location:</b> Latitude: {{ latitude }}, Longitude: {{ longitude }}</p>
	  <button @click="connectSocket" :disabled="isConnected">Connect</button>
	  <button @click="disconnectSocket" :disabled="!isConnected">Disconnect</button>
	</div>
  </template>
  
  <script>
  import SockJS from "sockjs-client";
  import Stomp from "stompjs";
  
  export default {
	data() {
	  return {
		stompClient: null,
		connectionStatus: "Disconnected",
		latitude: null,
		longitude: null,
		sendInterval: null,
		isConnected: false,
	  };
	},
	methods: {
	  // WebSocket 연결
	  connectSocket() {
		const socket = new SockJS("http://localhost:8080/game"); // Spring 서버 엔드포인트
		this.stompClient = Stomp.over(socket);
  
		this.stompClient.connect({}, () => {
		  this.connectionStatus = "Connected";
		  this.isConnected = true;
  
		  // 위치 전송 시작
		  this.startSendingLocation();
		}, (error) => {
		  console.error("Error connecting to WebSocket:", error);
		  this.connectionStatus = "Error";
		});
	  },
	  // WebSocket 연결 해제
	  disconnectSocket() {
		if (this.stompClient) {
		  this.stompClient.disconnect(() => {
			this.connectionStatus = "Disconnected";
			this.isConnected = false;
			this.stopSendingLocation();
		  });
		}
	  },
	  // 위치 전송 시작
	  startSendingLocation() {
		this.sendInterval = setInterval(async () => {
		  await this.updateLocation();
		  if (this.stompClient && this.isConnected) {
			const locationData = JSON.stringify({
			  latitude: this.latitude,
			  longitude: this.longitude,
			  timestamp: new Date().toISOString(),
			});
			this.stompClient.send("/app/1011/send-location", {}, locationData); // 서버로 위치 전송
			console.log("Location sent:", locationData);
		  }
		}, 5000); // 5초마다 실행
	  },
	  // 위치 전송 중지
	  stopSendingLocation() {
		clearInterval(this.sendInterval);
		this.sendInterval = null;
	  },
	  // 현재 위치 업데이트
	  updateLocation() {
		return new Promise((resolve, reject) => {
		  if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			  (position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				resolve();
			  },
			  (error) => {
				console.error("Error fetching location:", error);
				reject(error);
			  }
			);
		  } else {
			console.error("Geolocation is not supported by this browser.");
			reject(new Error("Geolocation not supported"));
		  }
		});
	  },
	},
	beforeDestroy() {
	  // 컴포넌트 파괴 시 연결 해제 및 타이머 정리
	  this.disconnectSocket();
	  this.stopSendingLocation();
	},
  };
  </script>
  
  <style scoped>
  h1 {
	font-family: Arial, sans-serif;
  }
  
  button {
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
  }
  </style>
  