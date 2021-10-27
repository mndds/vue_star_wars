<template>
  <v-app>
    <v-app-bar fixed >
      <v-app-bar-title class="orange--text mr-5" style="font-size: 2.1rem;">Star Wars</v-app-bar-title>        

      <v-btn elevation='0' :to="{name: 'People'}">People</v-btn>
      <v-btn elevation='0' :to="{name: 'FilmList'}">Films</v-btn>
      <v-btn elevation='0' :to="{name: 'StarshipsList'}">Starships</v-btn>

    </v-app-bar>

    <div class="mb-15"></div>

    <v-main app>
      <router-view :key="$route.fullPath"/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    
  }),
};
</script>

<style>
#app {
  background: url('https://i.pinimg.com/originals/8c/c2/1f/8cc21f2a656f70f4ec4a4d52f2ac12c6.jpg')
    no-repeat center  !important;
  background-size: cover;
  font-family: 'Star Jedi', arial;
}

.transparent {
   background-color: white!important;
   opacity: 0.8;
   border-color: transparent!important;
 }


/* $body-font-family = 'Barlow Condensed', sans-serif;
Добавить 
@import url('<link href="https://allfont.net/allfont.css?fonts=star-jedi" rel="stylesheet" type="text/css" />'); */
</style>
