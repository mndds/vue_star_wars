<template>
  <v-container>
    <h1 class="orange--text mt-5 mb-10" style="font-size: 4em;">Films</h1>
    <v-row>

    <div v-if="loading"></div>   
    
    <v-col class="transparent" cols="4" v-else-if="info" v-for="(film, index) in films" :key="index">
      <v-card class="mx-auto mb-10" max-width="600">
        <v-card-title>{{ film.title }}</v-card-title>

        <v-card-subtitle class="pb-0"> Episode  {{ film.episode_id }}  </v-card-subtitle>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Release date</v-list-item-subtitle>
            {{ film.release_date }}
          </v-list-item-content>
        </v-list-item>
        <v-card-actions >
            <v-btn :to="{name: 'ShowFilm', params: {id: index + 1}}" color="orange" text> Read more </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <div v-else>Server Error</div>

    </v-row>

    <v-dialog :value="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import http from "@/plugins/http";
export default {
  data: () => ({
    loading: false,
    info: null,
    films: null,
  }),
  computed: {},
  mounted() {
    this.loadFilms();
  },
  methods: {
    loadFilms() {
      this.loading = true;

      http
        .get("films/?format=json")
        .then((response) => {
          const data = response.data;
          this.info = data;
          this.films = data.results;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>