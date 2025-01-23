<script setup>
import {ref} from 'vue'
import FitnessTestTable from "./FitnessTestTable.vue";

const dialog = ref(false)

const props = defineProps({
  trainee: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            icon="mdi-receipt-text-check-outline"
            size="small"
            color="blue-lighten-1"
            v-bind="activatorProps"
        >

          <v-icon>
            mdi-receipt-text-check-outline
          </v-icon>

        </v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn
              icon="mdi-close"
              @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>{{props.trainee.name}} Fitness Tests</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>

          </v-toolbar-items>
        </v-toolbar>


        <div class="w-full h-100">
          <FitnessTestTable :trainee="props.trainee" />
        </div>

      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>