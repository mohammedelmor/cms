<script setup>
import KpiCard from "../components/dashboard/KpiCard.vue";
import MySchedule from "../components/dashboard/schedule/MySchedule.vue";
import {reactive} from "vue";

const kpis = reactive([
      {
        title: 'Trainers',
        subtitle: 'Kpi Trainers',
        icon: "mdi-account-multiple-outline",
        bgColor: "primary",
        count: 120,
        stats: [
          {
            name: "Trainers",
            value: 120,
            icon: "mdi-account-multiple-outline",
            color: "info"
          }
        ]
      },
      {
        title: 'Meals',
        subtitle: 'Kpi Meals',
        icon: "mdi-food-apple",
        bgColor: "secondary",
        count: 120,
        stats: [
          {
            name: "Meals",
            value: 120,
            icon: "mdi-food-apple",
            color: "info"
          }
        ]
      },
      {
        title: 'Sessions',
        subtitle: 'Kpi Sessions',
        icon: "mdi-timetable",
        bgColor: "success",
        count: 120,
        stats: [
          {
            name: "Sessions",
            value: 120,
            icon: "mdi-timetable",
            color: "info"
          }
        ]
      }

    ]
)

</script>

<template>
  <v-container :fluid="true">
    <v-row
        class="flex-nowrap"
        no-gutters
    >

      <v-col
          class="flex-grow-1 flex-shrink-0"
          cols="5"
          style="min-width: 100px; max-width: 100%;"
      >
        <v-sheet class="flex-1-1 ">
          <v-container>
            <v-row>
              <v-col
                  v-for="(kpi, index) in kpis"
                  :key="index"
                  cols="12"
                  sm="4"
              >
                <v-sheet>
                  <KpiCard :kpi="kpi"/>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>

      <v-col
          class="flex-grow-0 flex-shrink-0"
          cols="4"
      >
        <v-sheet class="ma-2 pa-2">
          <MySchedule/>
        </v-sheet>
      </v-col>


    </v-row>
  </v-container>
</template>

<style scoped>

</style>
