<template>

  <f7-card>
    <f7-card-header class="no-padding-bottom">
     {{zoneTime}}
    </f7-card-header>
    <f7-card-content class="no-padding-top">
      <h2 class="no-margin-top no-margin-bottom">{{item.city}}</h2>
      <small class="display-block">{{item.timezone}}</small>

      <f7-chip text="Jane Doe">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="John Doe" style="margin-left: 10px">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="Adam Smith" style="margin-left: 10px" >
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
        </template>
      </f7-chip>
    </f7-card-content>
    <f7-card-footer>
      <f7-button small><f7-icon f7="plus" size="small"></f7-icon>Person</f7-button>
    </f7-card-footer>
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
  props:{
    item: {
      type: Object
    },
    CurrentTime: {
      type: String
    },
  },
  computed:{
    zoneTime(){

      return dayjs(this.CurrentTime).tz(this.item.timezone).format("MMMM D, YYYY h:mm:ss A")
    }
  },
  methods: {
    dayjs,
  }
}
</script>

<style scoped>

</style>