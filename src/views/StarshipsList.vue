<template>
  <v-container>
    <h1 class="orange--text mt-5 mb-10 " style="font-size: 4em;">Starships</h1>
    <div v-if="loading"></div>

    <div v-else-if="info && starships">
      <v-card class="transparent">
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowStarship',
              params: { id: starship.url.split('/').reverse()[1] },
            }"
            v-for="(starship, index) in starships"
            :key="index"
          >
            <v-list-item-content>
              {{ starship.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="page"
        :length="pagesLength"
      />
    </div>

    <div v-else>Server error</div>

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
    info: null,
    loading: false,
    pagesLength: null,
    starships: null,
    page: 1,
  }),
  mounted() {
    this.loadStarships();
  },
  watch: {
    page() {
      this.loadStarships();
    },
  },
  methods: {
    loadStarships() {
      this.loading = true;
      http
        .get(`starships/?page=${this.page}&format=json`)
        .then((response) => {
          const data = response.data;
          this.info = data;
          this.starships = data.results;
          this.pagesLength = Math.ceil(data.count / 10);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>