<template>
  <div class="home page">
    <div id="app">
      <div class="row">
        <section class="col-md-5 offset-md-1">
          <greetings></greetings>
          <date></date>
          <calendar> </calendar>
        </section>
        <section class="col-md-5">
          <weather></weather>
          <search></search>
          <sites></sites>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import date from "@/components/home/date.vue";

import greetings from "@/components/home/greetings.vue";
import search from "@/components/home/search.vue";
import sites from "@/components/home/sites.vue";
import weather from "@/components/home/weather.vue";
import calendar from "@/components/home/calendar.vue";

export default {
  name: "Home",
  components: {
    date,
    calendar,
    greetings,
    search,
    sites,
    weather
  }
};
</script>
