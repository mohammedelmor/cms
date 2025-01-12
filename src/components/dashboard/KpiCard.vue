<template>
  <v-card
      class="mx-auto"
      :color="kpi.bgColor"
  >
    <v-card-item :title="kpi.title">
      <template v-slot:subtitle>
        <v-icon
            class="me-1 pb-1"
            color="#ffffff"
            icon="mdi-account-multiple-outline"
            size="18"
        ></v-icon>

        {{ kpi.subtitle }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
            class="text-h4"
            cols="6"
        >
          {{ kpi.count }}
        </v-col>

        <v-col class="text-right" cols="6">
          <v-icon
              :icon="kpi.icon"
              size="66"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <v-expand-transition>
      <div v-if="expand">


        <v-list class="bg-transparent">
          <v-list-item
              v-for="item in kpi.stats"
              :key="item.name"
              :append-icon="item.icon"
              :subtitle="item.value"
              :title="item.name"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
          :text="!expand ? 'Full Report' : 'Hide Report'"
          @click="expand = !expand"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

defineProps({
  kpi: {
    type: Object,
    required: true,
  }
});

import {ref} from "vue";


const expand = ref(false);

</script>
<style scoped>

</style>
