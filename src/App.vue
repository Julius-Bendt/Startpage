<template>
  <div id="app">
    <div class="container-fluid" id="particles-js">
      <homeView> </homeView>
    </div>
  </div>
</template>

<style>
@import "css/app.css";
</style>

<script>
// @ is an alias to /src
import homeView from "@/views/Home.vue";
import config from "@/assets/config.json";
export default {
  name: "Home",
  components: {
    homeView
  },
  data: function() {
    return {
      pictures: [],
      pic: {}
    };
  },
  created() {
    let currentDate = new Date();
    let hh = currentDate.getHours();

    this.pictures = config.backgrounds;
    const chooseBetween = this.pictures.filter(
      pic => pic.start <= hh && pic.end >= hh
    );

    if (chooseBetween.length == 0) return;

    this.pic = chooseBetween[Math.floor(Math.random() * chooseBetween.length)];
    console.log(this.pic);
    localStorage.setItem("particle", this.pic.particles);
    console.log("Set particle to: " + this.pic.particles);
  },
  mounted() {
    if (this.pic.id == null) return;

    const background = document.getElementById("background");

    background.style.backgroundImage = `url('https://source.unsplash.com/${this.pic.id}/1920x1080')`;

    background.style.opacity = this.pic.opacity;
  }
};
</script>
