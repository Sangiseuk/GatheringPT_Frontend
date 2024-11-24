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
  
		  // STOMP 메시지 수신 처리
		  this.stompClient.subscribe("/operator/1011/receive-location", (message) => {
			console.log("Received from server:", message.body);
		  });
  
		  // 위치 전송 시작
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
  