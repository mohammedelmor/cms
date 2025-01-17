<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          :width="200"
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
          <v-list-item prepend-icon="mdi-home-city" title="Home" to="/" value="home">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Trainees" to="/trainee" value="trainees">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Body Types" to="/bodyTypes" value="bodyTypes">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">

        <RouterView/>

      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>

import {ref} from "vue";

const drawer = ref(true)
const rail = ref(true)

</script>
