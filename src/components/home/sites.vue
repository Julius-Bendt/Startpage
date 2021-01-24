<template>
  <div
    class="row justify-content-between"
    style="margin-top:60px"
    id="topSites"
  >
    <div class="col-md-3" v-for="(site, i) in sites" :key="i">
      <a :href="site.url">
        <div class="quick-navigation-item">
          <img
            class="img-fluid-small"
            :src="'images/brands/' + site.img"
            :alt="site.title + 'logo'"
          />
          <p>{{ site.title }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import config from "@/assets/config.json";
export default {
  name: "sites",
  data: function() {
    return {
      sites: []
    };
  },
  created() {
    this.sites = config.sites;
  }
};
</script>
