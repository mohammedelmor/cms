<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
        >
          <template v-slot:append>
            <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">

        <v-sheet class="d-flex flex-wrap">
          <v-sheet class="flex-1-1 ma-2 pa-2">
            <v-container>
              <v-row>
                <v-col
                    v-for="(kpi, index) in kpis"
                    :key="index"
                    cols="12"
                    sm="4"
                >
                  <v-sheet class="ma-2 pa-2">
                    <KpiCard :kpi="kpi" />
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-sheet class="ma-2 pa-2">
            <MySchedule />
          </v-sheet>

          <v-sheet class="flex-1-1-100 ma-2 pa-2">
            I'm a single element in an inline flexbox container!
          </v-sheet>
        </v-sheet>


      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>

import {reactive, ref} from "vue";
import KpiCard from "./components/dashboard/KpiCard.vue";
import MySchedule from "./components/dashboard/schedule/MySchedule.vue";

const drawer = ref(true)
const rail = ref(true)

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