<template>
	<div id="app">
	  <h1>Create Game Test</h1>
	  <form @submit.prevent="submitForm">
		<label>
		  Scope Type:
		  <select v-model="form.scope.type">
			<option value="circle">Circle</option>
			<option value="rectangle">Rectangle</option>
			<option value="custom">Custom</option>
		  </select>
		</label>
		<div v-if="form.scope.type === 'circle'">
		  <label>
			Center X:
			<input type="number" v-model.number="form.scope.centerPosition.x" />
		  </label>
		  <label>
			Center Y:
			<input type="number" v-model.number="form.scope.centerPosition.y" />
		  </label>
		  <label>
			Radius:
			<input type="number" v-model.number="form.scope.radius" />
		  </label>
		</div>
		<div v-if="form.scope.type === 'rectangle'">
		  <label>
			Top Left X:
			<input type="number" v-model.number="form.scope.topLeftPosition.x" />
		  </label>
		  <label>
			Top Left Y:
			<input type="number" v-model.number="form.scope.topLeftPosition.y" />
		  </label>
		  <label>
			Bottom Right X:
			<input type="number" v-model.number="form.scope.bottomRightPosition.x" />
		  </label>
		  <label>
			Bottom Right Y:
			<input type="number" v-model.number="form.scope.bottomRightPosition.y" />
		  </label>
		</div>
		<div v-if="form.scope.type === 'custom'">
		  <label>
			Custom Points (comma-separated, format: x:y):
			<textarea v-model="customPointsInput"></textarea>
		  </label>
		</div>
		<label>
		  Max Participants:
		  <input type="number" v-model.number="form.maxParticipants" />
		</label>
		<label>
		  Announcement Text:
		  <input type="text" v-model="form.announcementText" />
		</label>
		<label>
		  Feedback Range:
		  <input type="number" v-model.number="form.feedbackRange" />
		</label>
		<label>
		  Max Feedback Level:
		  <input type="number" v-model.number="form.maxFeedbackLevel" />
		</label>
		<button type="submit">Create Game</button>
	  </form>
  
	  <h2>Response</h2>
	  <pre>{{ response }}</pre>
	</div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
	data() {
	  return {
		form: {
		  scope: {
			type: "circle",
			centerPosition: { x: 0, y: 0 },
			radius: 0,
			topLeftPosition: { x: 0, y: 0 },
			bottomRightPosition: { x: 0, y: 0 },
			customPoint: [],
		  },
		  maxParticipants: 10,
		  announcementText: "Welcome to the game",
		  feedbackRange: 5,
		  maxFeedbackLevel: 3,
		  markerList: [],
		},
		customPointsInput: "",
		endpoint: "http://localhost:8080",
		response: null,
	  };
	},
	methods: {
	  parseCustomPoints() {
		this.form.scope.customPoint = this.customPointsInput
		  .split(",")
		  .map((point) => {
			const [x, y] = point.split(":").map(Number);
			return { x, y };
		  });
	  },
	  async submitForm() {
		try {
		  if (this.form.scope.type === "custom") {
			this.parseCustomPoints();
		  }
		  const response = await axios.post(this.endpoint + "/create-game", this.form);
		  this.response = response.data;
		} catch (error) {
		  this.response = error.response ? error.response.data : error.message;
		}
	  },
	},
  };
  </script>
  
  <style>
  body {
	font-family: Arial, sans-serif;
  }
  
  label {
	display: block;
	margin: 10px 0;
  }
  
  input,
  select,
  textarea,
  button {
	margin-top: 5px;
  }
  
  button {
	cursor: pointer;
  }
  </style>
  