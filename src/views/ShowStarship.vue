<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="starShip">
      <h1 class=" orange--text mt-5 mb-10" style="font-size: 3em;">{{ starShip.name }}</h1>
      <v-card class="transparent">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Model</v-list-item-subtitle>
              {{ starShip.model }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Manufacturer</v-list-item-subtitle>
              {{ starShip.manufacturer }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Cost in credits</v-list-item-subtitle>
              {{ starShip.cost_in_credits }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Length</v-list-item-subtitle>
              {{ starShip.length }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Max speed</v-list-item-subtitle>
              {{ starShip.max_atmosphering_speed }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Length</v-list-item-subtitle>
              {{ starShip.length }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Passengers</v-list-item-subtitle>
              {{ starShip.passengers }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Cargo capacity</v-list-item-subtitle>
              {{ starShip.cargo_capacity }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Consumables</v-list-item-subtitle>
              {{ starShip.consumables }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Hyperdrive rating</v-list-item-subtitle>
              {{ starShip.hyperdrive_rating }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>MGLT</v-list-item-subtitle>
              {{ starShip.MGLT }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Starship class</v-list-item-subtitle>
              {{ starShip.starship_class }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <div v-if="starShip.pilots.length > 0">
        <v-list-item-title class="orange--text" style="font-size: 2.5em;">Starship pilots</v-list-item-title>
        <people-sub-list :urls="starShip.pilots" />
      </div>

      <div v-if="starShip.films.length > 0">
        <v-list-item-title class="orange--text" style="font-size: 2.5em;"> Been in films</v-list-item-title>
        <films-sub-list :filmsUrl="starShip.films"/>
      </div>
    </div>

    <div v-else>Server Error</div>

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
import PeopleSubList from "../components/PeopleSubList.vue";
import FilmsSubList from '../components/FilmsSubList.vue';
export default {
  components: { PeopleSubList, FilmsSubList },
  data: () => ({
    loading: false,
    starShip: null,
  }),
  mounted() {
    this.loadStarShip();
  },
  computed: {
    id() {
      if (this.$route.params.id == 1) {
        return 2;
      }
      return this.$route.params.id;
    },
  },
  methods: {
    loadStarShip() {
      this.loading = true;
      http
        .get(`starships/${this.id}/?format=json`)
        .then((response) => {
          this.starShip = response.data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>