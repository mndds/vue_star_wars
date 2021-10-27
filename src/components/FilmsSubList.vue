<template>
<v-container>
    <div v-if="loading"></div>

    <div v-else-if="films != null && films.length > 0">
      <v-card>
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowFilm',
              params: { id: film.url.split('/').reverse()[1] },
            }"
            v-for="(film, index) in films"
            :key="index"
          >
            <v-list-item-content>
              {{ film.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-container>
  
</template>

<script>
import http from "@/plugins/http";
export default {
    props:['filmsUrl'],
    data: () => ({
    loading: false,
    films: [],
  }),
  computed: {
    mustLoad() {
      return this.filmsUrl && this.filmsUrl.length > 0;
    },
    ids() {
      return this.filmsUrl.map((filmsUrl) => filmsUrl.split("/").reverse()[1]);
    },
  },
  mounted() {
    if (this.mustLoad) {
      this.iterator();
    }
  },
  methods: {
    iterator() {
      for (let num = 0; num < this.ids.length; num++) {
        this.load(this.ids[num]);
      }
    },
    load(id) {
      this.loading = false;

      http
        .get(`films/${id}/?format=json`)
        .then((response) => {
          this.films.push(response.data);
        })
        .finally(() => (this.loading = false));
    },
  },

}
</script>

<style>

</style>