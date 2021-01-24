<template>
  <div class="row">
    <div class="col-md-12">
      <h2 id="time">{{ time }}</h2>
      <p id="date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "date",
  data: function() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      time: "",
      date: ""
    };
  },
  created() {
    this.UpdateTime();
    window.setInterval(this.UpdateTime, 500);
  },
  methods: {
    UpdateTime() {
      let currentDate = new Date();

      //time
      let hh = currentDate.getHours();
      let mm = currentDate.getMinutes();
      let ss = currentDate.getSeconds();

      //formatting
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;

      this.time = `${hh}:${mm}:${ss}`;

      //date
      let dd = currentDate.getDay();
      let m = currentDate.getMonth();
      let d = currentDate.getDate();

      this.date = `${this.days[dd]}, ${d}. ${this.months[m]}`;
    }
  }
};
</script>
