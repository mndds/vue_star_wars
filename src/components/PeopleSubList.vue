<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="characters != null && characters.length > 0">
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
    </div>
  </v-container>
</template>

<script>
import http from "@/plugins/http";
export default {
  props: ["urls"],
  data: () => ({
    loading: false,
    characters: [],
  }),
  computed: {
    mustLoad() {
      return this.urls && this.urls.length > 0;
    },
    ids() {
      return this.urls.map((url) => url.split("/").reverse()[1]);
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
        .get(`people/${id}/?format=json`)
        .then((response) => {
          this.characters.push(response.data);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>