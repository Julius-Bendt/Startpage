# Start page

Startpage that I've setup to be used as a new page for Google chrome.
It features:
* Personalizing text, date and clock


* Shows weather info(what temperture feels like, cloud condition, wind speeds and directions, humidity and pressure). The icons used are from [FeatherIcons](https://feathericons.com/).

* a search bar which supports DuckDuckGo(Default), Google, Youtube, Facebook, Reddit, Netflix, Soundcloud, Linkedin, Google Drive, Google Calendar, Google Translate. (where to search can be edited with the start letter and a ":". To search via google, it would be "g:".)

* image background, which can be adjusted to specific time of the day, if particles should be included, and opacity

* 4x3 grid of websites.

* Integrated calender



## Setup

### Api keys
The site uses the [OpenWeather api](https://openweathermap.org/price) to show weather data. You should grab a api key from there, the free tier will do you just fine.

### configuration:
in src/assets/config.json 

* Name - your name.

* weatherApiKey - Api key that you just registered for.

* backgrounds - Images will be loaded from (Unsplashed)[https://unsplash.com/]. the picture id goes in the "id" variable. start and end determinds which time of day the page are allowed to show this picture.

* calendar - Endpoint: Where the ics are located, cors: wether to use (this)[https://cors-anywhere.herokuapp.com/] to ensure no CORS problems

* sites - Which sites should be in the 4x3 grid. images should be placed in /public/images/Brands. You can find most brand logos at (Flaticon)[https://www.flaticon.com/]

* searchOperators - Which websites should be accessible by the search. By default, the site uses DuckDuckGo. the "search" variable determinds wether the page should redirect to the site, or search using that site.

* greetings - Grettings are split up in four categories: morning(06-12), day(12-17), evening(17-23) and night greetings(23-06). "{0}" will be replaced with "name".

### Building:
use standard Vue CLI commands like:
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


Made with :heart: in Aalborg, Denmark using Vue and Bootstrap.