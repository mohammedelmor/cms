<script setup>


const props = defineProps({
  session: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <v-card
      :title="session.day"
      class="rounded-lg"
  >
    <v-card-text>

      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <v-avatar
              :image="session.image"
              :size="50"
          />
          <div class="d-flex flex-column pa-1 ">
            <p>
              {{ session.trainer }}
            </p>
            <p>
              {{ session.time }}
            </p>
          </div>
        </div>

        <v-chip
            append-icon="mdi-clock"
            class="ma-2"
            color="orange"
        >
          {{ session.duration }}
        </v-chip>
      </div>


    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
