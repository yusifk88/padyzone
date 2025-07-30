<template>
  <f7-block-title>{{ item.value }} (UTC {{item.offset>=0 ? '+'+item.offset : item.offset}})</f7-block-title>
  <f7-list-item
      v-for="zone in item.cities"
      link="#"
      :title="zone.city"
      :after="getTime(zone.timezone)"

  />

</template>

<script>
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
  props: {
    item: {
      type: Object
    },
    CurrentTime: {
      type: String
    }
  },
  name: "TimezoneItem",
  methods: {
    getTime(zone) {
      return dayjs(this.CurrentTime).tz(zone).format("MMMM D, YYYY h:mm:ss A")
    }
  }
}
</script>

<style scoped>

</style>