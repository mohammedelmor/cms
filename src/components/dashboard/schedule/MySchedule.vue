<script setup>

import ScheduleCard from "./ScheduleCard.vue";
import {reactive} from "vue";

const sessions = reactive([
  {
    day: "Monday",
    trainer: "Ahmed",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    time: "8:00",
    duration: "1:00"
  },
  {
    day: "Tuesday",
    trainer: "Mohammed",
    image: "https://randomuser.me/api/portraits/men/84.jpg",
    time: "9:00",
    duration: "0:30"
  },
  {
    day: "Wednesday",
    trainer: "Ibrahim",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    time: "10:00",
    duration: "0:45"
  },
])
</script>

<template>
  <v-sheet>
    <v-sheet>
        <div class="d-flex justify-space-between align-center mb-4">
          My Schedule
          <v-btn variant="text" color="yellow-darken-3">
            View All >
          </v-btn>
        </div>
      <ScheduleCard v-for="(session, index) in sessions" :key="index" :session="session" class="my-2"/>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>

</style>
