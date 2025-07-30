<template>

  <f7-card>
    <f7-card-header>
      Current Time
    </f7-card-header>
    <f7-card-content>


      {{dayjs().format("MMMM D, YYYY h:mm A") }}

      <p>
        {{dayjs(dayjs().format()).tz("America/Toronto").format("MMMM D, YYYY h:mm A") }}
      </p>

      <p>
        {{dayjs(dayjs().format()).tz("Africa/Nairobi").format("MMMM D, YYYY h:mm A") }}
      </p>
    </f7-card-content>
  </f7-card>

</template>

<script>
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  name: "TimezoneCard",
  methods: {dayjs}
}
</script>

<style scoped>

</style>