<template>
  <div
    class="row scrollable text-dir-rtl"
    :style="'height:' + (calendar.length + 1) * 93 + 'px; margin-top:30px;'"
  >
    <div class="col-md-12 text-dir-ltr">
      <h1 @click="Sort">Upcoming events:</h1>
    </div>
    <div class="row text-dir-ltr">
      <div class="col-md-11 offset-md-1" v-for="(c, i) in calendar" :key="i">
        <a :href="FormatUrl(c.url)"
          ><p class="font-weight-bold text-warning" style="font-size:150%;">
            {{ c.title }}
          </p></a
        >
        <p>{{ c.desc }}</p>
        <p class="ont-weight-light">{{ FormatDate(c.start, c.end) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const ical = require("ical.js");
import config from "@/assets/config.json";
export default {
  name: "calendar",
  data: function() {
    return {
      calendar: [],
      cors: "https://cors-anywhere.herokuapp.com/"
    };
  },
  created() {
    this.calendarEndpoints = config.calendar;
  },
  mounted() {
    this.calendarEndpoints.forEach(endpoint => {
      if (endpoint.endpoint != "path-to.ics") {
        this.FetchCalendar(endpoint);
      }
    });
  },
  methods: {
    Sort() {
      this.calendar.sort(function(a, b) {
        return a.start - b.start;
      });
    },
    FetchCalendar(calendarEndpoint) {
      const dateNow = new Date();
      const lastDate = new Date();
      lastDate.setDate(lastDate.getDate() + 60);
      let request = new XMLHttpRequest();

      config.calendar.forEach(calendar => {
        let url = calendar.cors ? this.cors + calendar.url : calendar.url;
        request.open("GET", url);
        request.onload = request.onerror = () => {
          if (request.status === 200) {
            var iCalendarData = request.responseText;
            var jcalData = ical.parse(iCalendarData);
            var vcalendar = new ical.Component(jcalData);
            var vevents = vcalendar.getAllSubcomponents("vevent");

            vevents.forEach(vevent => {
              let summary = vevent.getFirstPropertyValue("summary");
              let dtStart = new Date(vevent.getFirstPropertyValue("dtstart"));
              let dtEnd = new Date(vevent.getFirstPropertyValue("dtend"));
              let desc = vevent.getFirstPropertyValue("description");
              let urlEvent = vevent.getFirstPropertyValue("url");

              let event_data = {
                title: summary,
                desc: desc,
                start: dtStart,
                end: dtEnd,
                url: urlEvent
              };

              if (dtStart >= dateNow && dtStart <= lastDate)
                this.calendar.push(event_data);
            });
            this.Sort();
          } else {
            console.log(
              "Error Couldnt fetch  " +
                calendarEndpoint +
                ". Response code: " +
                request.status
            );
          }
        };

        request.send("");
      });
    },
    FormatUrl(url) {
      if (url == null) return null;

      if (url.length > 0) {
        if (!url.startsWith("http"));
        return "https://" + url;
      }
      return url;
    },
    FormatDate(start, end) {
      const months = [
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
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      //time
      let shh = start.getHours();
      let smm = start.getMinutes();

      let ehh = end.getHours();
      let emm = end.getMinutes();

      //formatting
      if (shh < 10) shh = "0" + shh;
      if (smm < 10) smm = "0" + smm;

      if (ehh < 10) ehh = "0" + ehh;
      if (emm < 10) emm = "0" + emm;

      //date
      let sdd = start.getDay();
      let sm = start.getMonth();
      let sd = start.getDate();

      let edd = end.getDay();
      let em = end.getMonth();
      let ed = end.getDate();

      let sy = start.getYear();
      let ey = end.getYear();

      if (sdd == edd && sm == em && sd == ed && sy == ey) {
        //Same day
        return `${days[sdd]}, ${sd}. ${months[sm]} at ${shh}:${smm}-${ehh}:${emm}`;
      }

      if (sm == em && ey == sy) {
        //Same month
        return `${days[sdd]} ${sd}. ${months[sm]} at ${shh}:${smm} to ${days[edd]} ${ed}. ${ehh}:${emm}`;
      }

      if (ey == sy) {
        //Same year
        return `${days[sdd]}, ${sd}. ${months[sm]} at ${shh}:${smm} to ${days[edd]}, ${ed}. ${months[em]} at ${ehh}:${emm}`;
      }

      return `${days[sdd]}, ${sd}. ${months[sm]} ${sy +
        1900} at ${shh}:${smm} to ${days[edd]}, ${ed}. ${months[em]} ${ey +
        1900} at ${ehh}:${emm}`;
    }
  }
};
</script>
