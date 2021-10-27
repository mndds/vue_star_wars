<template>
  <v-container>
      <div v-if="loading"></div>
      <div v-else-if="film">
        <h1 class="display-2 mt-5 mb-10">{{film.title}}</h1>

        <v-card  class="mb-5">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Episode</v-list-item-subtitle>
              {{ film.episode_id }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Opening crawl</v-list-item-subtitle>
              {{ film.opening_crawl }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Director</v-list-item-subtitle>
              {{ film.director }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Producer</v-list-item-subtitle>
              {{ film.producer }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Release Date</v-list-item-subtitle>
              {{ film.release_date }}
            </v-list-item-content>
          </v-list-item>               
        </v-list>        
      </v-card>


      <v-list-item-subtitle>Characters</v-list-item-subtitle>
      <people-sub-list :urls="film.characters"/>


      </div>

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
import PeopleSubList from '../components/PeopleSubList.vue';

export default {
    components: {PeopleSubList},
    data: () => ({
        loading: false,
        film: null,
    }),
    mounted() {
        this.loadFilm();
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        loadFilm() {
            this.loading = true;

            http.get(`films/${this.id}/?format=json`)
                .then(response => {
                    this.film = response.data;
                })
                .finally(()=>(this.loading = false))
        }
    }
}
</script>

<style>

</style>