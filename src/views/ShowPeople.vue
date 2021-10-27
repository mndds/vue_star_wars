<template>
  <v-container>
      <div v-if="loading"></div>

      <div v-else-if="character">
          <h1 class="mt-5 mb-10 orange--text" style="font-size: 3em;">{{ character.name }}</h1>
          <v-card class="transparent">
               <v-list>
                   <v-list-item >
                       <v-list-item-content>
                           <v-list-item-subtitle>Birth year</v-list-item-subtitle>
                           {{ character.birth_year}}                           
                       </v-list-item-content>
                   </v-list-item>

                   <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Eye color</v-list-item-subtitle>
                                {{ character.eye_color }}
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Gender</v-list-item-subtitle>
                                {{ character.gender }}
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Height</v-list-item-subtitle>
                                {{ character.height }}
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Mass</v-list-item-subtitle>
                                {{ character.mass }}
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Hair color</v-list-item-subtitle>
                                {{ character.hair_color }}
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>Skin color</v-list-item-subtitle>
                                {{ character.skin_color }}
                        </v-list-item-content>
                    </v-list-item>
               </v-list>
      </v-card>
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
import http from '@/plugins/http'
export default {
    data: () => ({
        loading:false,
        character: null,
    }),
    mounted() {
        this.loadPerson();
    },  
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        loadPerson() {
            this.loading = true;
            http.get(`people/${this.id}/?format=json`)
                .then(response => {
                    this.character = response.data;
                })
                .finally(() => (this.loading = false));
        },
    }

}
</script>

<style>

</style>