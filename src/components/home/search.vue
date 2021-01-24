<template>
  <div class="row">
    <div class="col-md-12">
      <div class="control-group">
        <div class="form-group floating-label-form-group controls mb-0 pb-2">
          <label class="text-white"
            >Search {{ sites[siteIndex].name }} for:</label
          >
          <input
            ref="search"
            class="form-control"
            type="text"
            :placeholder="'Search ' + sites[siteIndex].name"
            @change="Submit"
            @input="Change"
            v-model="searchText"
          />
          <p class="help-block text-danger"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/assets/config.json";
export default {
  name: "search",

  data: function() {
    return {
      siteIndex: 6,
      searchText: ""
    };
  },
  created() {
    this.sites = config.searchOperators;
  },
  methods: {
    Submit() {
      console.log("test");
      const searchQuery = this.sites[this.siteIndex].search
        ? this.searchText
        : "";
      console.log(
        "Search query: " + this.sites[this.siteIndex].searchURL + searchQuery
      );
      window.location.href = this.sites[this.siteIndex].searchURL + searchQuery;
    },
    Change() {
      console.log("changed!" + this.searchText);

      if (this.searchText.length == 2) {
        for (let i = 0; i < this.sites.length; i++) {
          const site = this.sites[i];
          console.log(site);

          if (site.code.startsWith(this.searchText)) {
            this.siteIndex = i;
            if (site.search) this.searchText = "";

            return;
          }
        }
      }
    }
  }
};
</script>
