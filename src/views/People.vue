<template>
  <v-container >
    <h1 class="mt-5 mb-10 orange--text" style="font-size: 3.75rem;">Characters List</h1>
    <div v-if="loading"></div>

    <div v-else-if="info && characters">


      <div class="mb-5" style="display: flex; align-items: center; gap:10px;">
            <div>                
                <v-text-field color="orange" v-model="filter.name"  label="Name"/>
            </div>        
      
            <v-btn color="grey lighten-1" @click="loadFilteredCharacters" >Search</v-btn>           

      </div>

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

      <v-pagination v-if="!filter.name"
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
    filter: {
            name: null,        
        },
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
    loadFilteredCharacters() {
      this.loading = true;
      http.get(`people/?search=${this.filter.name}&format=json`)
        .then(response => {
            const data = response.data;
            this.info = data;
            this.characters = data.results;
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