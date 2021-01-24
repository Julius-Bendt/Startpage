<template>
  <div class="row">
    <div class="col-md-12">
      <h1 id="greeting">{{ greeting }}</h1>
    </div>
  </div>
</template>

<script>
import config from "@/assets/config.json";
export default {
  name: "greetings",
  data: function() {
    return {
      name: "Julius",
      greeting: ""
    };
  },
  created() {
    let currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      this.greeting =
        config.greetings.morningGreetings[
          this.randomInt(0, config.greetings.morningGreetings.length)
        ];
    } else if (currentHour >= 12 && currentHour < 17) {
      this.greeting =
        config.greetings.dayGreetings[
          this.randomInt(0, config.greetings.dayGreetings.length)
        ];
    } else if (currentHour >= 17 && currentHour < 23) {
      this.greeting = config.greetings.eveningGreetings;
      [this.randomInt(0, config.greetings.eveningGreetings.length)];
    } else if (currentHour >= 23 || (currentHour >= 0 && currentHour < 6)) {
      this.greeting =
        config.greetings.nightGreetings[
          this.randomInt(0, config.greetings.nightGreetings.length)
        ];
    }

    this.greeting = this.greeting.replace("{0}", this.name);
  },
  methods: {
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
};
</script>
