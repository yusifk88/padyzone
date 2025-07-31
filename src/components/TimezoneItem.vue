<template>
  <f7-block-title>{{ item.value }} (UTC {{ item.offset >= 0 ? '+' + item.offset : item.offset }})</f7-block-title>
  <f7-list-item
      v-for="zone in filteredCities"
      link="#"
      :title="zone.city"
      :after="getTime(zone.timezone)"
      @click="add(zone)"

  />

</template>

<script>
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
  emits:["add"],
  props: {
    item: {
      type: Object
    },
    CurrentTime: {
      type: String
    },
    searchQ: {
      type: String,
      default: null
    }
  },
  name: "TimezoneItem",
  computed: {
    filteredCities() {
      if (!this.searchQ){
        return this.item.cities;
      }

      return this.item.cities.filter(city=>{
        return city.city.toLowerCase().includes(this.searchQ.toLowerCase())
      })

    }
  },
  methods: {
    getTime(zone) {
      return dayjs(this.CurrentTime).tz(zone).format("MMMM D, YYYY h:mm:ss A")
    },
    add(zone){
      this.$emit("add",zone)
    }
  }
}
</script>

<style scoped>

</style>