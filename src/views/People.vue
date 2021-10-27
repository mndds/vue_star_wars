<template>
  <v-container >
    <h1 class="display-2 mt-5 mb-10">Characters List</h1>
    <div v-if="loading"></div>

    <div v-else-if="info && characters">
      <v-card class="transparent">
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowPeople',
              params: { id: character.url.split('/').reverse()[1] },
            }"
            v-for="(character, index) in characters"
            :key="index"
          >
            <v-list-item-content>
              {{ character.name }}
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
    characters: null,
    page: 1,
  }),
  mounted() {
    this.loadCharacters();
  },
  watch: {
    page() {
      this.loadCharacters();
    },
  },
  methods: {
    loadCharacters() {
      this.loading = true;
      http
        .get(`people/?page=${this.page}&format=json`)
        .then((response) => {
          const data = response.data;
          this.info = data;
          this.characters = data.results;
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
.transparent {
   background-color: white!important;
   opacity: 0.8;
   border-color: transparent!important;
 }
</style>