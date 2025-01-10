<script setup>

import ScheduleCard from "./ScheduleCard.vue";
</script>

<template>
  <v-sheet class="d-flex flex-wrap">


    <v-sheet class="ma-2 pa-2">
        <div class="d-flex justify-space-between align-center mb-4">
          My Schedule
          <v-btn variant="text" color="yellow-darken-3">
            View All >
          </v-btn>
        </div>
      <div  class="my-2" v-for="i in 3" :key="i">
        <ScheduleCard    />
      </div>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>

</style>