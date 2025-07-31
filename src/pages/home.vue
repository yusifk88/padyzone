<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">

      <f7-nav-title sliding>PadyZone</f7-nav-title>

      <f7-nav-title-large>PadyZone</f7-nav-title-large>

      <f7-nav-right>
        <f7-button @click="setTheme">Change Theme</f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-block class="no-margin-top">
      <p>Track time across the world</p>
    </f7-block>

    <template v-if="myTimeZones">
      <timezone-card
          v-for="timeZone in myTimeZones"
          :item="timeZone"
          :CurrentTime="currentTime"
      ></timezone-card>
    </template>

    <f7-fab @click="show=!show" position="center-bottom">
      <f7-icon ios="f7:person_badge_plus" md="material:person_badge_plus"></f7-icon>
    </f7-fab>


    <f7-sheet
        :opened="show"
        class="create-new-sheet"
        style="height: 90vh"
        backdrop
        @sheet:closed="show=false"
    >

      <f7-navbar title="Add a friend">
        <f7-nav-right>
          <f7-button @click="show=!show">
            <f7-icon ios="f7:close" md="material:close"></f7-icon>
          </f7-button>
        </f7-nav-right>
      </f7-navbar>
      <f7-subnavbar :inner="true">
        <f7-searchbar
            @click:clear="searchKey=''"
            placeholder="Enter name of their city"
            :custom-search="true"
            :outline="true"
            @input="searchChanged"
            :backdrop="false"
        ></f7-searchbar>
      </f7-subnavbar>


      <!--        <div class="swipe-handler" style="background-color: transparent"></div>-->
      <f7-page-content>

        <f7-list
            virtual-list
            media-list
            dividers-ios
            strong-ios
            outline-ios
            class="search-list searchbar-found"
        >
          <timezone-item
              v-for="timeZoneItems in filteredItems"
              :item="timeZoneItems"
              :CurrentTime="currentTime"
              :search-q="searchKey"
              @add="addZone"
          ></timezone-item>

        </f7-list>

      </f7-page-content>

    </f7-sheet>

  </f7-page>
</template>
<script>

import TimezoneCard from "@/components/TimezoneCard.vue";
import TimezoneItem from "@/components/TimezoneItem.vue";
import dayjs from "dayjs";
import {f7} from "framework7-vue";
import {liveQuery} from "dexie";
import {useObservable} from "@vueuse/rxjs";
import {db} from "@/js/db";

export default {
  components: {TimezoneItem, TimezoneCard},
  data() {
    return {
      searchKey: "",
      myTimeZones: useObservable(liveQuery(() => db.timezones.toArray())),
      currentTime: dayjs().format(),
      show: false,
      items: [
        {
          value: "UTC-11",
          abbr: "U",
          offset: -11,
          isdst: false,
          text: "(UTC-11:00) Coordinated Universal Time-11",
          utc: [
            "Etc/GMT+11",
            "Pacific/Midway",
            "Pacific/Niue",
            "Pacific/Pago_Pago"
          ],
          cities: [
            {
              timezone: "Etc/GMT+11",
              city: "Atafu"
            },
            {
              timezone: "Etc/GMT+11",
              city: "Midway"
            },
            {
              timezone: "Etc/GMT+11",
              city: "Pago Pago"
            },
            {
              timezone: "Etc/GMT+11",
              city: "Faleasao"
            },
            {
              timezone: "Etc/GMT+11",
              city: "Tula"
            },
            {
              timezone: "Pacific/Midway",
              city: "Midway"
            },
            {
              timezone: "Pacific/Niue",
              city: "Alofi"
            },
            {
              timezone: "Pacific/Pago_Pago",
              city: "Pago Pago"
            },
            {
              timezone: "Pacific/Pago_Pago",
              city: "Fagatogo"
            },
            {
              timezone: "Pacific/Pago_Pago",
              city: "Tafuna"
            }
          ]
        },
        {
          value: "Hawaiian Standard Time",
          abbr: "HST",
          offset: -10,
          isdst: false,
          text: "(UTC-10:00) Hawaii",
          utc: [
            "Etc/GMT+10",
            "Pacific/Honolulu",
            "Pacific/Johnston",
            "Pacific/Rarotonga",
            "Pacific/Tahiti"
          ],
          cities: [
            {
              timezone: "Etc/GMT+10",
              city: "Honolulu"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Hilo"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Pearl City"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Kailua"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Waipahu"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Rarotonga"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Avarua"
            },
            {
              timezone: "Etc/GMT+10",
              city: "Papeete"
            },
            {
              timezone: "Pacific/Honolulu",
              city: "Honolulu"
            },
            {
              timezone: "Pacific/Honolulu",
              city: "Hilo"
            },
            {
              timezone: "Pacific/Honolulu",
              city: "Kailua"
            },
            {
              timezone: "Pacific/Honolulu",
              city: "Waipahu"
            },
            {
              timezone: "Pacific/Honolulu",
              city: "Pearl City"
            },
            {
              timezone: "Pacific/Johnston",
              city: "Johnston Atoll"
            },
            {
              timezone: "Pacific/Rarotonga",
              city: "Rarotonga"
            },
            {
              timezone: "Pacific/Rarotonga",
              city: "Avarua"
            },
            {
              timezone: "Pacific/Tahiti",
              city: "Papeete"
            },
            {
              timezone: "Pacific/Tahiti",
              city: "Faaa"
            },
            {
              timezone: "Pacific/Tahiti",
              city: "Punaauia"
            }
          ]

        },
        {
          value: "Alaskan Standard Time",
          abbr: "AKDT",
          offset: -8,
          isdst: true,
          text: "(UTC-09:00) Alaska",
          utc: [
            "America/Anchorage",
            "America/Juneau",
            "America/Nome",
            "America/Sitka",
            "America/Yakutat"
          ],
          cities: [
            {
              timezone: "America/Anchorage",
              city: "Anchorage"
            },
            {
              timezone: "America/Anchorage",
              city: "Wasilla"
            },
            {
              timezone: "America/Anchorage",
              city: "Palmer"
            },
            {
              timezone: "America/Anchorage",
              city: "Kenai"
            },
            {
              timezone: "America/Anchorage",
              city: "Homer"
            },
            {
              timezone: "America/Juneau",
              city: "Juneau"
            },
            {
              timezone: "America/Juneau",
              city: "Douglas"
            },
            {
              timezone: "America/Juneau",
              city: "Auke Bay"
            },
            {
              timezone: "America/Nome",
              city: "Nome"
            },
            {
              timezone: "America/Nome",
              city: "Teller"
            },
            {
              timezone: "America/Nome",
              city: "Brevig Mission"
            },
            {
              timezone: "America/Nome",
              city: "Wales"
            },
            {
              timezone: "America/Sitka",
              city: "Sitka"
            },
            {
              timezone: "America/Sitka",
              city: "Baranof"
            },
            {
              timezone: "America/Sitka",
              city: "Port Alexander"
            },
            {
              timezone: "America/Yakutat",
              city: "Yakutat"
            },
            {
              timezone: "America/Yakutat",
              city: "Icy Bay"
            },
            {
              timezone: "America/Yakutat",
              city: "Cape Yakataga"
            }
          ]

        },
        {
          value: "Pacific Standard Time (Mexico)",
          abbr: "PDT",
          offset: -7,
          isdst: true,
          text: "(UTC-08:00) Baja California",
          utc: [
            "America/Santa_Isabel"
          ],
          cities: [
            {
              timezone: "America/Santa_Isabel",
              city: "Santa Isabel"
            },
            {
              timezone: "America/Santa_Isabel",
              city: "Ensenada"
            },
            {
              timezone: "America/Santa_Isabel",
              city: "Mexicali"
            },
            {
              timezone: "America/Santa_Isabel",
              city: "Tijuana"
            },
            {
              timezone: "America/Santa_Isabel",
              city: "Tecate"
            }
          ]


        },
        {
          value: "Pacific Daylight Time",
          abbr: "PDT",
          offset: -7,
          isdst: true,
          text: "(UTC-07:00) Pacific Daylight Time (US & Canada)",
          utc: [
            "America/Los_Angeles",
            "America/Tijuana",
            "America/Vancouver"
          ],
          cities: [
            {
              timezone: "America/Los_Angeles",
              city: "Los Angeles"
            },
            {
              timezone: "America/Los_Angeles",
              city: "San Francisco"
            },
            {
              timezone: "America/Los_Angeles",
              city: "San Diego"
            },
            {
              timezone: "America/Los_Angeles",
              city: "Sacramento"
            },
            {
              timezone: "America/Los_Angeles",
              city: "San Jose"
            },
            {
              timezone: "America/Tijuana",
              city: "Tijuana"
            },
            {
              timezone: "America/Tijuana",
              city: "Mexicali"
            },
            {
              timezone: "America/Tijuana",
              city: "Ensenada"
            },
            {
              timezone: "America/Tijuana",
              city: "Tecate"
            },
            {
              timezone: "America/Vancouver",
              city: "Vancouver"
            },
            {
              timezone: "America/Vancouver",
              city: "Surrey"
            },
            {
              timezone: "America/Vancouver",
              city: "Burnaby"
            },
            {
              timezone: "America/Vancouver",
              city: "Richmond"
            },
            {
              timezone: "America/Vancouver",
              city: "Abbotsford"
            }
          ]

        },
        {
          value: "Pacific Standard Time",
          abbr: "PST",
          offset: -8,
          isdst: false,
          text: "(UTC-08:00) Pacific Standard Time (US & Canada)",
          utc: [
            "PST8PDT"
          ],
          cities: [
            {
              timezone: "PST8PDT",
              city: "Los Angeles"
            },
            {
              timezone: "PST8PDT",
              city: "San Francisco"
            },
            {
              timezone: "PST8PDT",
              city: "San Diego"
            },
            {
              timezone: "PST8PDT",
              city: "Sacramento"
            },
            {
              timezone: "PST8PDT",
              city: "San Jose"
            },
            {
              timezone: "PST8PDT",
              city: "Seattle"
            },
            {
              timezone: "PST8PDT",
              city: "Portland"
            },
            {
              timezone: "PST8PDT",
              city: "Las Vegas"
            }
          ]

        },
        {
          value: "US Mountain Standard Time",
          abbr: "UMST",
          offset: -7,
          isdst: false,
          text: "(UTC-07:00) Arizona",
          utc: [
            "America/Creston",
            "America/Dawson",
            "America/Dawson_Creek",
            "America/Hermosillo",
            "America/Phoenix",
            "America/Whitehorse",
            "Etc/GMT+7"
          ],
          cities: [
            {
              timezone: "America/Creston",
              city: "Creston"
            },
            {
              timezone: "America/Dawson",
              city: "Dawson"
            },
            {
              timezone: "America/Dawson",
              city: "Eagle Plains"
            },
            {
              timezone: "America/Dawson_Creek",
              city: "Dawson Creek"
            },
            {
              timezone: "America/Dawson_Creek",
              city: "Fort St. John"
            },
            {
              timezone: "America/Hermosillo",
              city: "Hermosillo"
            },
            {
              timezone: "America/Hermosillo",
              city: "Guaymas"
            },
            {
              timezone: "America/Hermosillo",
              city: "Ciudad Obregón"
            },
            {
              timezone: "America/Phoenix",
              city: "Phoenix"
            },
            {
              timezone: "America/Phoenix",
              city: "Tucson"
            },
            {
              timezone: "America/Phoenix",
              city: "Mesa"
            },
            {
              timezone: "America/Phoenix",
              city: "Scottsdale"
            },
            {
              timezone: "America/Phoenix",
              city: "Tempe"
            },
            {
              timezone: "America/Whitehorse",
              city: "Whitehorse"
            },
            {
              timezone: "America/Whitehorse",
              city: "Haines Junction"
            },
            {
              timezone: "America/Whitehorse",
              city: "Watson Lake"
            },
            {
              timezone: "Etc/GMT+7",
              city: "San Felipe"
            },
            {
              timezone: "Etc/GMT+7",
              city: "Puerto Peñasco"
            },
            {
              timezone: "Etc/GMT+7",
              city: "Page"
            }
          ]

        },
        {
          value: "Mountain Standard Time (Mexico)",
          abbr: "MDT",
          offset: -6,
          isdst: true,
          text: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
          utc: [
            "America/Chihuahua",
            "America/Mazatlan"
          ],
          cities: [
            {
              timezone: "America/Chihuahua",
              city: "Chihuahua"
            },
            {
              timezone: "America/Chihuahua",
              city: "Ciudad Juárez"
            },
            {
              timezone: "America/Chihuahua",
              city: "Delicias"
            },
            {
              timezone: "America/Chihuahua",
              city: "Parral"
            },
            {
              timezone: "America/Chihuahua",
              city: "Cuauhtémoc"
            },
            {
              timezone: "America/Mazatlan",
              city: "Mazatlán"
            },
            {
              timezone: "America/Mazatlan",
              city: "Culiacán"
            },
            {
              timezone: "America/Mazatlan",
              city: "Los Mochis"
            },
            {
              timezone: "America/Mazatlan",
              city: "Durango"
            },
            {
              timezone: "America/Mazatlan",
              city: "Navolato"
            }
          ]

        },
        {
          value: "Mountain Standard Time",
          abbr: "MDT",
          offset: -6,
          isdst: true,
          text: "(UTC-07:00) Mountain Time (US & Canada)",
          utc: [
            "America/Boise",
            "America/Cambridge_Bay",
            "America/Denver",
            "America/Edmonton",
            "America/Inuvik",
            "America/Ojinaga",
            "America/Yellowknife",
            "MST7MDT"
          ],
          cities: [
            {
              timezone: "America/Boise",
              city: "Boise"
            },
            {
              timezone: "America/Boise",
              city: "Twin Falls"
            },
            {
              timezone: "America/Boise",
              city: "Pocatello"
            },
            {
              timezone: "America/Cambridge_Bay",
              city: "Cambridge Bay"
            },
            {
              timezone: "America/Cambridge_Bay",
              city: "Kugluktuk"
            },
            {
              timezone: "America/Denver",
              city: "Denver"
            },
            {
              timezone: "America/Denver",
              city: "Colorado Springs"
            },
            {
              timezone: "America/Denver",
              city: "Aurora"
            },
            {
              timezone: "America/Denver",
              city: "Fort Collins"
            },
            {
              timezone: "America/Edmonton",
              city: "Edmonton"
            },
            {
              timezone: "America/Edmonton",
              city: "Red Deer"
            },
            {
              timezone: "America/Edmonton",
              city: "Lethbridge"
            },
            {
              timezone: "America/Edmonton",
              city: "Grande Prairie"
            },
            {
              timezone: "America/Inuvik",
              city: "Inuvik"
            },
            {
              timezone: "America/Inuvik",
              city: "Tuktoyaktuk"
            },
            {
              timezone: "America/Inuvik",
              city: "Aklavik"
            },
            {
              timezone: "America/Ojinaga",
              city: "Ojinaga"
            },
            {
              timezone: "America/Ojinaga",
              city: "Presidio"
            },
            {
              timezone: "America/Yellowknife",
              city: "Yellowknife"
            },
            {
              timezone: "America/Yellowknife",
              city: "Hay River"
            },
            {
              timezone: "America/Yellowknife",
              city: "Fort Smith"
            },
            {
              timezone: "MST7MDT",
              city: "Salt Lake City"
            },
            {
              timezone: "MST7MDT",
              city: "Cheyenne"
            },
            {
              timezone: "MST7MDT",
              city: "Helena"
            },
            {
              timezone: "MST7MDT",
              city: "Billings"
            }
          ]

        },
        {
          value: "Central America Standard Time",
          abbr: "CAST",
          offset: -6,
          isdst: false,
          text: "(UTC-06:00) Central America",
          utc: [
            "America/Belize",
            "America/Costa_Rica",
            "America/El_Salvador",
            "America/Guatemala",
            "America/Managua",
            "America/Tegucigalpa",
            "Etc/GMT+6",
            "Pacific/Galapagos"
          ],
          cities: [
            {
              timezone: "America/Belize",
              city: "Belize City"
            },
            {
              timezone: "America/Belize",
              city: "San Ignacio"
            },
            {
              timezone: "America/Belize",
              city: "Orange Walk"
            },
            {
              timezone: "America/Costa_Rica",
              city: "San José"
            },
            {
              timezone: "America/Costa_Rica",
              city: "Alajuela"
            },
            {
              timezone: "America/Costa_Rica",
              city: "Cartago"
            },
            {
              timezone: "America/El_Salvador",
              city: "San Salvador"
            },
            {
              timezone: "America/El_Salvador",
              city: "Santa Ana"
            },
            {
              timezone: "America/El_Salvador",
              city: "Soyapango"
            },
            {
              timezone: "America/Guatemala",
              city: "Guatemala City"
            },
            {
              timezone: "America/Guatemala",
              city: "Mixco"
            },
            {
              timezone: "America/Guatemala",
              city: "Quetzaltenango"
            },
            {
              timezone: "America/Managua",
              city: "Managua"
            },
            {
              timezone: "America/Managua",
              city: "León"
            },
            {
              timezone: "America/Managua",
              city: "Masaya"
            },
            {
              timezone: "America/Tegucigalpa",
              city: "Tegucigalpa"
            },
            {
              timezone: "America/Tegucigalpa",
              city: "San Pedro Sula"
            },
            {
              timezone: "America/Tegucigalpa",
              city: "La Ceiba"
            },
            {
              timezone: "Etc/GMT+6",
              city: "Puerto Barrios"
            },
            {
              timezone: "Etc/GMT+6",
              city: "Bluefields"
            },
            {
              timezone: "Etc/GMT+6",
              city: "Punta Gorda"
            },
            {
              timezone: "Pacific/Galapagos",
              city: "Puerto Ayora"
            },
            {
              timezone: "Pacific/Galapagos",
              city: "Puerto Baquerizo Moreno"
            },
            {
              timezone: "Pacific/Galapagos",
              city: "Isabela Island"
            }
          ]

        },
        {
          value: "Central Standard Time",
          abbr: "CDT",
          offset: -5,
          isdst: true,
          text: "(UTC-06:00) Central Time (US & Canada)",
          utc: [
            "America/Chicago",
            "America/Indiana/Knox",
            "America/Indiana/Tell_City",
            "America/Matamoros",
            "America/Menominee",
            "America/North_Dakota/Beulah",
            "America/North_Dakota/Center",
            "America/North_Dakota/New_Salem",
            "America/Rainy_River",
            "America/Rankin_Inlet",
            "America/Resolute",
            "America/Winnipeg",
            "CST6CDT"
          ],
          cities: [
            {
              timezone: "America/Chicago",
              city: "Chicago"
            },
            {
              timezone: "America/Chicago",
              city: "Houston"
            },
            {
              timezone: "America/Chicago",
              city: "Dallas"
            },
            {
              timezone: "America/Chicago",
              city: "Austin"
            },
            {
              timezone: "America/Chicago",
              city: "Minneapolis"
            },
            {
              timezone: "America/Indiana/Knox",
              city: "Knox"
            },
            {
              timezone: "America/Indiana/Knox",
              city: "North Judson"
            },
            {
              timezone: "America/Indiana/Tell_City",
              city: "Tell City"
            },
            {
              timezone: "America/Indiana/Tell_City",
              city: "Cannelton"
            },
            {
              timezone: "America/Matamoros",
              city: "Matamoros"
            },
            {
              timezone: "America/Matamoros",
              city: "Reynosa"
            },
            {
              timezone: "America/Matamoros",
              city: "Nuevo Laredo"
            },
            {
              timezone: "America/Menominee",
              city: "Menominee"
            },
            {
              timezone: "America/Menominee",
              city: "Escanaba"
            },
            {
              timezone: "America/North_Dakota/Beulah",
              city: "Beulah"
            },
            {
              timezone: "America/North_Dakota/Center",
              city: "Center"
            },
            {
              timezone: "America/North_Dakota/New_Salem",
              city: "New Salem"
            },
            {
              timezone: "America/Rainy_River",
              city: "Rainy River"
            },
            {
              timezone: "America/Rainy_River",
              city: "Fort Frances"
            },
            {
              timezone: "America/Rankin_Inlet",
              city: "Rankin Inlet"
            },
            {
              timezone: "America/Rankin_Inlet",
              city: "Arviat"
            },
            {
              timezone: "America/Resolute",
              city: "Resolute"
            },
            {
              timezone: "America/Resolute",
              city: "Grise Fiord"
            },
            {
              timezone: "America/Winnipeg",
              city: "Winnipeg"
            },
            {
              timezone: "America/Winnipeg",
              city: "Brandon"
            },
            {
              timezone: "America/Winnipeg",
              city: "Steinbach"
            },
            {
              timezone: "CST6CDT",
              city: "Springfield"
            },
            {
              timezone: "CST6CDT",
              city: "Des Moines"
            },
            {
              timezone: "CST6CDT",
              city: "Little Rock"
            },
            {
              timezone: "CST6CDT",
              city: "Baton Rouge"
            }
          ]

        },
        {
          value: "Central Standard Time (Mexico)",
          abbr: "CDT",
          offset: -5,
          isdst: true,
          text: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
          utc: [
            "America/Bahia_Banderas",
            "America/Cancun",
            "America/Merida",
            "America/Mexico_City",
            "America/Monterrey"
          ],
          cities: [
            {
              timezone: "America/Bahia_Banderas",
              city: "Puerto Vallarta"
            },
            {
              timezone: "America/Bahia_Banderas",
              city: "Bahía de Banderas"
            },
            {
              timezone: "America/Bahia_Banderas",
              city: "Nuevo Vallarta"
            },
            {
              timezone: "America/Cancun",
              city: "Cancún"
            },
            {
              timezone: "America/Cancun",
              city: "Playa del Carmen"
            },
            {
              timezone: "America/Cancun",
              city: "Tulum"
            },
            {
              timezone: "America/Cancun",
              city: "Cozumel"
            },
            {
              timezone: "America/Merida",
              city: "Mérida"
            },
            {
              timezone: "America/Merida",
              city: "Progreso"
            },
            {
              timezone: "America/Merida",
              city: "Valladolid"
            },
            {
              timezone: "America/Mexico_City",
              city: "Mexico City"
            },
            {
              timezone: "America/Mexico_City",
              city: "Puebla"
            },
            {
              timezone: "America/Mexico_City",
              city: "Toluca"
            },
            {
              timezone: "America/Mexico_City",
              city: "Cuernavaca"
            },
            {
              timezone: "America/Mexico_City",
              city: "Querétaro"
            },
            {
              timezone: "America/Monterrey",
              city: "Monterrey"
            },
            {
              timezone: "America/Monterrey",
              city: "Saltillo"
            },
            {
              timezone: "America/Monterrey",
              city: "San Nicolás de los Garza"
            },
            {
              timezone: "America/Monterrey",
              city: "Guadalupe"
            }
          ]

        },
        {
          value: "Canada Central Standard Time",
          abbr: "CCST",
          offset: -6,
          isdst: false,
          text: "(UTC-06:00) Saskatchewan",
          utc: [
            "America/Regina",
            "America/Swift_Current"
          ]
        },
        {
          value: "SA Pacific Standard Time",
          abbr: "SPST",
          offset: -5,
          isdst: false,
          text: "(UTC-05:00) Bogota, Lima, Quito",
          utc: [
            "America/Bogota",
            "America/Cayman",
            "America/Coral_Harbour",
            "America/Eirunepe",
            "America/Guayaquil",
            "America/Jamaica",
            "America/Lima",
            "America/Panama",
            "America/Rio_Branco",
            "Etc/GMT+5"
          ],
          cities: [
            {
              timezone: "America/Bogota",
              city: "Bogotá"
            },
            {
              timezone: "America/Bogota",
              city: "Medellín"
            },
            {
              timezone: "America/Bogota",
              city: "Cali"
            },
            {
              timezone: "America/Cayman",
              city: "George Town"
            },
            {
              timezone: "America/Coral_Harbour",
              city: "Atikokan"
            },
            {
              timezone: "America/Coral_Harbour",
              city: "Marathon"
            },
            {
              timezone: "America/Eirunepe",
              city: "Eirunepé"
            },
            {
              timezone: "America/Eirunepe",
              city: "Envira"
            },
            {
              timezone: "America/Guayaquil",
              city: "Guayaquil"
            },
            {
              timezone: "America/Guayaquil",
              city: "Quito"
            },
            {
              timezone: "America/Jamaica",
              city: "Kingston"
            },
            {
              timezone: "America/Jamaica",
              city: "Montego Bay"
            },
            {
              timezone: "America/Lima",
              city: "Lima"
            },
            {
              timezone: "America/Lima",
              city: "Arequipa"
            },
            {
              timezone: "America/Lima",
              city: "Trujillo"
            },
            {
              timezone: "America/Panama",
              city: "Panama City"
            },
            {
              timezone: "America/Panama",
              city: "Colón"
            },
            {
              timezone: "America/Rio_Branco",
              city: "Rio Branco"
            },
            {
              timezone: "America/Rio_Branco",
              city: "Cruzeiro do Sul"
            },
            {
              timezone: "Etc/GMT+5",
              city: "Leticia"
            },
            {
              timezone: "Etc/GMT+5",
              city: "Puerto Ayacucho"
            },
            {
              timezone: "Etc/GMT+5",
              city: "Puerto Leguízamo"
            }
          ]

        },
        {
          value: "Eastern Standard Time",
          abbr: "EST",
          offset: -5,
          isdst: false,
          text: "(UTC-05:00) Eastern Time (US & Canada)",
          utc: [
            "America/Detroit",
            "America/Havana",
            "America/Indiana/Petersburg",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Iqaluit",
            "America/Kentucky/Monticello",
            "America/Louisville",
            "America/Montreal",
            "America/Nassau",
            "America/New_York",
            "America/Nipigon",
            "America/Pangnirtung",
            "America/Port-au-Prince",
            "America/Thunder_Bay",
            "America/Toronto"
          ],
          cities: [
            {
              timezone: "America/Detroit",
              city: "Detroit"
            },
            {
              timezone: "America/Detroit",
              city: "Ann Arbor"
            },
            {
              timezone: "America/Detroit",
              city: "Flint"
            },
            {
              timezone: "America/Havana",
              city: "Havana"
            },
            {
              timezone: "America/Havana",
              city: "Santiago de Cuba"
            },
            {
              timezone: "America/Indiana/Petersburg",
              city: "Petersburg"
            },
            {
              timezone: "America/Indiana/Vincennes",
              city: "Vincennes"
            },
            {
              timezone: "America/Indiana/Winamac",
              city: "Winamac"
            },
            {
              timezone: "America/Iqaluit",
              city: "Iqaluit"
            },
            {
              timezone: "America/Iqaluit",
              city: "Apex"
            },
            {
              timezone: "America/Kentucky/Monticello",
              city: "Monticello"
            },
            {
              timezone: "America/Louisville",
              city: "Louisville"
            },
            {
              timezone: "America/Louisville",
              city: "Jeffersontown"
            },
            {
              timezone: "America/Montreal",
              city: "Montreal"
            },
            {
              timezone: "America/Nassau",
              city: "Nassau"
            },
            {
              timezone: "America/New_York",
              city: "New York"
            },
            {
              timezone: "America/New_York",
              city: "Philadelphia"
            },
            {
              timezone: "America/New_York",
              city: "Boston"
            },
            {
              timezone: "America/New_York",
              city: "Baltimore"
            },
            {
              timezone: "America/New_York",
              city: "Washington D.C."
            },
            {
              timezone: "America/New_York",
              city: "Charlotte"
            },
            {
              timezone: "America/Nipigon",
              city: "Nipigon"
            },
            {
              timezone: "America/Pangnirtung",
              city: "Pangnirtung"
            },
            {
              timezone: "America/Port-au-Prince",
              city: "Port-au-Prince"
            },
            {
              timezone: "America/Thunder_Bay",
              city: "Thunder Bay"
            },
            {
              timezone: "America/Toronto",
              city: "Toronto"
            },
            {
              timezone: "America/Toronto",
              city: "Mississauga"
            },
            {
              timezone: "America/Toronto",
              city: "Ottawa"
            },
            {
              timezone: "America/Toronto",
              city: "Hamilton"
            }
          ]

        },
        {
          value: "Eastern Daylight Time",
          abbr: "EDT",
          offset: -4,
          isdst: true,
          text: "(UTC-04:00) Eastern Daylight Time (US & Canada)",
          utc: [
            "America/Detroit",
            "America/Havana",
            "America/Indiana/Petersburg",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Iqaluit",
            "America/Kentucky/Monticello",
            "America/Louisville",
            "America/Montreal",
            "America/Nassau",
            "America/New_York",
            "America/Nipigon",
            "America/Pangnirtung",
            "America/Port-au-Prince",
            "America/Thunder_Bay",
            "America/Toronto"
          ],
          cities: [
            {
              timezone: "America/Detroit",
              city: "Detroit"
            },
            {
              timezone: "America/Havana",
              city: "Havana"
            },
            {
              timezone: "America/Indiana/Petersburg",
              city: "Petersburg"
            },
            {
              timezone: "America/Indiana/Vincennes",
              city: "Vincennes"
            },
            {
              timezone: "America/Indiana/Winamac",
              city: "Winamac"
            },
            {
              timezone: "America/Iqaluit",
              city: "Iqaluit"
            },
            {
              timezone: "America/Kentucky/Monticello",
              city: "Monticello"
            },
            {
              timezone: "America/Louisville",
              city: "Louisville"
            },
            {
              timezone: "America/Montreal",
              city: "Montreal"
            },
            {
              timezone: "America/Nassau",
              city: "Nassau"
            },
            {
              timezone: "America/New_York",
              city: "New York"
            },
            {
              timezone: "America/New_York",
              city: "Philadelphia"
            },
            {
              timezone: "America/New_York",
              city: "Boston"
            },
            {
              timezone: "America/New_York",
              city: "Washington"
            },
            {
              timezone: "America/New_York",
              city: "Baltimore"
            },
            {
              timezone: "America/New_York",
              city: "Atlanta"
            },
            {
              timezone: "America/New_York",
              city: "Charlotte"
            },
            {
              timezone: "America/Nipigon",
              city: "Nipigon"
            },
            {
              timezone: "America/Pangnirtung",
              city: "Pangnirtung"
            },
            {
              timezone: "America/Port-au-Prince",
              city: "Port-au-Prince"
            },
            {
              timezone: "America/Thunder_Bay",
              city: "Thunder Bay"
            },
            {
              timezone: "America/Toronto",
              city: "Toronto"
            },
            {
              timezone: "America/Toronto",
              city: "Ottawa"
            },
            {
              timezone: "America/Toronto",
              city: "Mississauga"
            },
            {
              timezone: "America/Toronto",
              city: "Hamilton"
            }
          ]

        },
        {
          value: "US Eastern Standard Time",
          abbr: "UEDT",
          offset: -5,
          isdst: false,
          text: "(UTC-05:00) Indiana (East)",
          utc: [
            "America/Indiana/Marengo",
            "America/Indiana/Vevay",
            "America/Indianapolis"
          ],
          cities: [
            {
              timezone: "America/Indiana/Marengo",
              city: "Marengo"
            },
            {
              timezone: "America/Indiana/Vevay",
              city: "Vevay"
            },
            {
              timezone: "America/Indianapolis",
              city: "Indianapolis"
            }
          ]

        },
        {
          value: "Venezuela Standard Time",
          abbr: "VST",
          offset: -4.5,
          isdst: false,
          text: "(UTC-04:30) Caracas",
          utc: [
            "America/Caracas"
          ],
          cities: [
            {
              timezone: "America/Caracas",
              city: "Caracas"
            }
          ]

        },
        {
          value: "Paraguay Standard Time",
          abbr: "PYT",
          offset: -4,
          isdst: false,
          text: "(UTC-04:00) Asuncion",
          utc: [
            "America/Asuncion"
          ],
          cities: [
            {
              timezone: "America/Asuncion",
              city: "Asunción"
            }
          ]

        },
        {
          value: "Atlantic Standard Time",
          abbr: "ADT",
          offset: -3,
          isdst: true,
          text: "(UTC-04:00) Atlantic Time (Canada)",
          utc: [
            "America/Glace_Bay",
            "America/Goose_Bay",
            "America/Halifax",
            "America/Moncton",
            "America/Thule",
            "Atlantic/Bermuda"
          ],
          cities: [
            {
              timezone: "America/Glace_Bay",
              city: "Glace Bay"
            },
            {
              timezone: "America/Goose_Bay",
              city: "Goose Bay"
            },
            {
              timezone: "America/Halifax",
              city: "Halifax"
            },
            {
              timezone: "America/Halifax",
              city: "Dartmouth"
            },
            {
              timezone: "America/Halifax",
              city: "Truro"
            },
            {
              timezone: "America/Halifax",
              city: "Sydney (Nova Scotia)"
            },
            {
              timezone: "America/Moncton",
              city: "Moncton"
            },
            {
              timezone: "America/Moncton",
              city: "Dieppe"
            },
            {
              timezone: "America/Thule",
              city: "Qaanaaq"
            },
            {
              timezone: "Atlantic/Bermuda",
              city: "Hamilton"
            }
          ]

        },
        {
          value: "Central Brazilian Standard Time",
          abbr: "CBST",
          offset: -4,
          isdst: false,
          text: "(UTC-04:00) Cuiaba",
          utc: [
            "America/Campo_Grande",
            "America/Cuiaba"
          ],
          cities: [
            {
              timezone: "America/Campo_Grande",
              city: "Campo Grande"
            },
            {
              timezone: "America/Campo_Grande",
              city: "Dourados"
            },
            {
              timezone: "America/Cuiaba",
              city: "Cuiabá"
            },
            {
              timezone: "America/Cuiaba",
              city: "Várzea Grande"
            }
          ]

        },
        {
          value: "SA Western Standard Time",
          abbr: "SWST",
          offset: -4,
          isdst: false,
          text: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
          utc: [
            "America/Anguilla",
            "America/Antigua",
            "America/Aruba",
            "America/Barbados",
            "America/Blanc-Sablon",
            "America/Boa_Vista",
            "America/Curacao",
            "America/Dominica",
            "America/Grand_Turk",
            "America/Grenada",
            "America/Guadeloupe",
            "America/Guyana",
            "America/Kralendijk",
            "America/La_Paz",
            "America/Lower_Princes",
            "America/Manaus",
            "America/Marigot",
            "America/Martinique",
            "America/Montserrat",
            "America/Port_of_Spain",
            "America/Porto_Velho",
            "America/Puerto_Rico",
            "America/Santo_Domingo",
            "America/St_Barthelemy",
            "America/St_Kitts",
            "America/St_Lucia",
            "America/St_Thomas",
            "America/St_Vincent",
            "America/Tortola",
            "Etc/GMT+4"
          ],
          cities: [
            {timezone: "America/Anguilla", city: "The Valley"},
            {timezone: "America/Antigua", city: "St. John's"},
            {timezone: "America/Aruba", city: "Oranjestad"},
            {timezone: "America/Barbados", city: "Bridgetown"},
            {timezone: "America/Blanc-Sablon", city: "Blanc-Sablon"},
            {timezone: "America/Boa_Vista", city: "Boa Vista"},
            {timezone: "America/Curacao", city: "Willemstad"},
            {timezone: "America/Dominica", city: "Roseau"},
            {timezone: "America/Grand_Turk", city: "Cockburn Town"},
            {timezone: "America/Grenada", city: "St. George's"},
            {timezone: "America/Guadeloupe", city: "Basse-Terre"},
            {timezone: "America/Guyana", city: "Georgetown"},
            {timezone: "America/Kralendijk", city: "Kralendijk"},
            {timezone: "America/La_Paz", city: "La Paz"},
            {timezone: "America/Lower_Princes", city: "Lower Prince's Quarter"},
            {timezone: "America/Manaus", city: "Manaus"},
            {timezone: "America/Manaus", city: "Itacoatiara"},
            {timezone: "America/Porto_Velho", city: "Porto Velho"},
            {timezone: "America/Marigot", city: "Marigot"},
            {timezone: "America/Martinique", city: "Fort-de-France"},
            {timezone: "America/Montserrat", city: "Plymouth"},
            {timezone: "America/Montserrat", city: "Brades"},
            {timezone: "America/Port_of_Spain", city: "Port of Spain"},
            {timezone: "America/Puerto_Rico", city: "San Juan"},
            {timezone: "America/Santo_Domingo", city: "Santo Domingo"},
            {timezone: "America/St_Barthelemy", city: "Gustavia"},
            {timezone: "America/St_Kitts", city: "Basseterre"},
            {timezone: "America/St_Lucia", city: "Castries"},
            {timezone: "America/St_Thomas", city: "Charlotte Amalie"},
            {timezone: "America/St_Vincent", city: "Kingstown"},
            {timezone: "America/Tortola", city: "Road Town"},
            {timezone: "Etc/GMT+4", city: "GMT+4 Reference Zone"}
          ]

        },
        {
          value: "Pacific SA Standard Time",
          abbr: "PSST",
          offset: -4,
          isdst: false,
          text: "(UTC-04:00) Santiago",
          utc: [
            "America/Santiago",
            "Antarctica/Palmer"
          ],
          cities: [
            {
              timezone: "America/Santiago",
              city: "Santiago"
            },
            {
              timezone: "America/Santiago",
              city: "Valparaíso"
            },
            {
              timezone: "Antarctica/Palmer",
              city: "Palmer Station"
            }
          ]

        },
        {
          value: "Newfoundland Standard Time",
          abbr: "NDT",
          offset: -2.5,
          isdst: true,
          text: "(UTC-03:30) Newfoundland",
          utc: [
            "America/St_Johns"
          ],
          cities: [
            {
              timezone: "America/St_Johns",
              city: "St. John's"
            },
            {
              timezone: "America/St_Johns",
              city: "Mount Pearl"
            }
          ]

        },
        {
          value: "E. South America Standard Time",
          abbr: "ESAST",
          offset: -3,
          isdst: false,
          text: "(UTC-03:00) Brasilia",
          utc: [
            "America/Sao_Paulo"
          ],
          cities: [
            {
              timezone: "America/Sao_Paulo",
              city: "São Paulo"
            },
            {
              timezone: "America/Sao_Paulo",
              city: "Rio de Janeiro"
            },
            {
              timezone: "America/Sao_Paulo",
              city: "Belo Horizonte"
            },
            {
              timezone: "America/Sao_Paulo",
              city: "Brasília"
            },
            {
              timezone: "America/Sao_Paulo",
              city: "Campinas"
            }
          ]

        },
        {
          value: "Argentina Standard Time",
          abbr: "AST",
          offset: -3,
          isdst: false,
          text: "(UTC-03:00) Buenos Aires",
          utc: [
            "America/Argentina/Buenos_Aires",
            "America/Argentina/Catamarca",
            "America/Argentina/Cordoba",
            "America/Argentina/Jujuy",
            "America/Argentina/La_Rioja",
            "America/Argentina/Mendoza",
            "America/Argentina/Rio_Gallegos",
            "America/Argentina/Salta",
            "America/Argentina/San_Juan",
            "America/Argentina/San_Luis",
            "America/Argentina/Tucuman",
            "America/Argentina/Ushuaia",
            "America/Buenos_Aires",
            "America/Catamarca",
            "America/Cordoba",
            "America/Jujuy",
            "America/Mendoza"
          ],
          cities: [
            {
              timezone: "America/Argentina/Buenos_Aires",
              city: "Buenos Aires"
            },
            {
              timezone: "America/Argentina/Catamarca",
              city: "San Fernando del Valle de Catamarca"
            },
            {
              timezone: "America/Argentina/Cordoba",
              city: "Córdoba"
            },
            {
              timezone: "America/Argentina/Jujuy",
              city: "San Salvador de Jujuy"
            },
            {
              timezone: "America/Argentina/La_Rioja",
              city: "La Rioja"
            },
            {
              timezone: "America/Argentina/Mendoza",
              city: "Mendoza"
            },
            {
              timezone: "America/Argentina/Rio_Gallegos",
              city: "Río Gallegos"
            },
            {
              timezone: "America/Argentina/Salta",
              city: "Salta"
            },
            {
              timezone: "America/Argentina/San_Juan",
              city: "San Juan"
            },
            {
              timezone: "America/Argentina/San_Luis",
              city: "San Luis"
            },
            {
              timezone: "America/Argentina/Tucuman",
              city: "San Miguel de Tucumán"
            },
            {
              timezone: "America/Argentina/Ushuaia",
              city: "Ushuaia"
            },
            {
              timezone: "America/Buenos_Aires",
              city: "Buenos Aires"
            },
            {
              timezone: "America/Catamarca",
              city: "San Fernando del Valle de Catamarca"
            },
            {
              timezone: "America/Cordoba",
              city: "Córdoba"
            },
            {
              timezone: "America/Jujuy",
              city: "San Salvador de Jujuy"
            },
            {
              timezone: "America/Mendoza",
              city: "Mendoza"
            }
          ]

        },
        {
          value: "SA Eastern Standard Time",
          abbr: "SEST",
          offset: -3,
          isdst: false,
          text: "(UTC-03:00) Cayenne, Fortaleza",
          utc: [
            "America/Araguaina",
            "America/Belem",
            "America/Cayenne",
            "America/Fortaleza",
            "America/Maceio",
            "America/Paramaribo",
            "America/Recife",
            "America/Santarem",
            "Antarctica/Rothera",
            "Atlantic/Stanley",
            "Etc/GMT+3"
          ],
          cities: [
            {
              timezone: "America/Araguaina",
              city: "Araguaína"
            },
            {
              timezone: "America/Belem",
              city: "Belém"
            },
            {
              timezone: "America/Cayenne",
              city: "Cayenne"
            },
            {
              timezone: "America/Fortaleza",
              city: "Fortaleza"
            },
            {
              timezone: "America/Maceio",
              city: "Maceió"
            },
            {
              timezone: "America/Paramaribo",
              city: "Paramaribo"
            },
            {
              timezone: "America/Recife",
              city: "Recife"
            },
            {
              timezone: "America/Santarem",
              city: "Santarém"
            },
            {
              timezone: "Antarctica/Rothera",
              city: "Rothera Research Station"
            },
            {
              timezone: "Atlantic/Stanley",
              city: "Stanley"
            },
            {
              timezone: "Etc/GMT+3",
              city: "Generic GMT+3 Zone"
            }
          ]

        },
        {
          value: "Greenland Standard Time",
          abbr: "GDT",
          offset: -3,
          isdst: true,
          text: "(UTC-03:00) Greenland",
          utc: [
            "America/Godthab"
          ],
          cities: [
            {
              timezone: "America/Godthab",
              city: "Nuuk"
            }
          ]
        },
        {
          value: "Montevideo Standard Time",
          abbr: "MST",
          offset: -3,
          isdst: false,
          text: "(UTC-03:00) Montevideo",
          utc: [
            "America/Montevideo"
          ],
          cities: [
            {
              timezone: "America/Montevideo",
              city: "Montevideo"
            }
          ]

        },
        {
          value: "Bahia Standard Time",
          abbr: "BST",
          offset: -3,
          isdst: false,
          text: "(UTC-03:00) Salvador",
          utc: [
            "America/Bahia"
          ],
          cities: [
            {
              timezone: "America/Bahia",
              city: "Salvador"
            },
            {
              timezone: "America/Bahia",
              city: "Feira de Santana"
            },
            {
              timezone: "America/Bahia",
              city: "Vitória da Conquista"
            }
          ]

        },
        {
          value: "UTC-02",
          abbr: "U",
          offset: -2,
          isdst: false,
          text: "(UTC-02:00) Coordinated Universal Time-02",
          utc: [
            "America/Noronha",
            "Atlantic/South_Georgia",
            "Etc/GMT+2"
          ],
          cities: [
            {
              timezone: "America/Noronha",
              city: "Fernando de Noronha"
            },
            {
              timezone: "Atlantic/South_Georgia",
              city: "King Edward Point"
            },
            {
              timezone: "Etc/GMT+2",
              city: "Generic GMT+2 Zone"
            }
          ]

        },
        {
          value: "Mid-Atlantic Standard Time",
          abbr: "MDT",
          offset: -1,
          isdst: true,
          text: "(UTC-02:00) Mid-Atlantic - Old",
          utc: [],
          cities: [
            {
              timezone: "Atlantic/South_Georgia",
              city: "Cape Verde"
            },
            {
              timezone: "Atlantic/South_Georgia",
              city: "South Georgia"
            }
          ]
        },
        {
          value: "Azores Standard Time",
          abbr: "ADT",
          offset: 0,
          isdst: true,
          text: "(UTC-01:00) Azores",
          utc: [
            "America/Scoresbysund",
            "Atlantic/Azores"
          ],
          cities: [
            {
              timezone: "America/Scoresbysund",
              city: "Ittoqqortoormiit"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Ponta Delgada"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Angra do Heroísmo"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Horta"
            }
          ]

        },
        {
          value: "Cape Verde Standard Time",
          abbr: "CVST",
          offset: -1,
          isdst: false,
          text: "(UTC-01:00) Cape Verde Is.",
          utc: [
            "Atlantic/Cape_Verde",
            "Etc/GMT+1"
          ],
          cities: [
            {
              timezone: "America/Scoresbysund",
              city: "Ittoqqortoormiit"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Ponta Delgada"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Angra do Heroísmo"
            },
            {
              timezone: "Atlantic/Azores",
              city: "Horta"
            }
          ]

        },
        {
          value: "Morocco Standard Time",
          abbr: "MDT",
          offset: 1,
          isdst: true,
          text: "(UTC) Casablanca",
          utc: [
            "Africa/Casablanca",
            "Africa/El_Aaiun"
          ],
          cities: [
            {
              timezone: "Africa/Casablanca",
              city: "Casablanca"
            },
            {
              timezone: "Africa/El_Aaiun",
              city: "El Aaiún"
            }
          ]

        },
        {
          value: "UTC",
          abbr: "UTC",
          offset: 0,
          isdst: false,
          text: "(UTC) Coordinated Universal Time",
          utc: [
            "America/Danmarkshavn",
            "Etc/GMT"
          ],
          cities: [
            {
              timezone: "America/Danmarkshavn",
              city: "Danmarkshavn"
            },
            {
              timezone: "Etc/GMT",
              city: "Generic GMT Zone"
            }
          ]

        },
        {
          value: "GMT Standard Time",
          abbr: "GMT",
          offset: 0,
          isdst: false,
          text: "(UTC) Edinburgh, London",
          utc: [
            "Europe/Isle_of_Man",
            "Europe/Guernsey",
            "Europe/Jersey",
            "Europe/London"
          ],
          cities: [
            {
              timezone: "Europe/Isle_of_Man",
              city: "Douglas"
            },
            {
              timezone: "Europe/Guernsey",
              city: "St. Peter Port"
            },
            {
              timezone: "Europe/Jersey",
              city: "Saint Helier"
            },
            {
              timezone: "Europe/London",
              city: "London"
            }
          ]

        },
        {
          value: "British Summer Time",
          abbr: "BST",
          offset: 1,
          isdst: true,
          text: "(UTC+01:00) Edinburgh, London",
          utc: [
            "Europe/Isle_of_Man",
            "Europe/Guernsey",
            "Europe/Jersey",
            "Europe/London"
          ],
          cities: []
        },
        {
          value: "GMT Standard Time",
          abbr: "GDT",
          offset: 1,
          isdst: true,
          text: "(UTC) Dublin, Lisbon",
          utc: [
            "Atlantic/Canary",
            "Atlantic/Faeroe",
            "Atlantic/Madeira",
            "Europe/Dublin",
            "Europe/Lisbon"
          ],
          cities: [
            {
              timezone: "Atlantic/Canary",
              city: "Las Palmas de Gran Canaria"
            },
            {
              timezone: "Atlantic/Faeroe",
              city: "Tórshavn"
            },
            {
              timezone: "Atlantic/Madeira",
              city: "Funchal"
            },
            {
              timezone: "Europe/Dublin",
              city: "Dublin"
            },
            {
              timezone: "Europe/Lisbon",
              city: "Lisbon"
            }
          ]

        },
        {
          value: "Greenwich Standard Time",
          abbr: "GST",
          offset: 0,
          isdst: false,
          text: "(UTC) Monrovia, Reykjavik",
          utc: [
            "Africa/Abidjan",
            "Africa/Accra",
            "Africa/Bamako",
            "Africa/Banjul",
            "Africa/Bissau",
            "Africa/Conakry",
            "Africa/Dakar",
            "Africa/Freetown",
            "Africa/Lome",
            "Africa/Monrovia",
            "Africa/Nouakchott",
            "Africa/Ouagadougou",
            "Africa/Sao_Tome",
            "Atlantic/Reykjavik",
            "Atlantic/St_Helena"
          ],
          cities: [
            {
              timezone: "Africa/Abidjan",
              city: "Abidjan"
            },
            {
              timezone: "Africa/Accra",
              city: "Accra"
            },
            {
              timezone: "Africa/Bamako",
              city: "Bamako"
            },
            {
              timezone: "Africa/Banjul",
              city: "Banjul"
            },
            {
              timezone: "Africa/Bissau",
              city: "Bissau"
            },
            {
              timezone: "Africa/Conakry",
              city: "Conakry"
            },
            {
              timezone: "Africa/Dakar",
              city: "Dakar"
            },
            {
              timezone: "Africa/Freetown",
              city: "Freetown"
            },
            {
              timezone: "Africa/Lome",
              city: "Lomé"
            },
            {
              timezone: "Africa/Monrovia",
              city: "Monrovia"
            },
            {
              timezone: "Africa/Nouakchott",
              city: "Nouakchott"
            },
            {
              timezone: "Africa/Ouagadougou",
              city: "Ouagadougou"
            },
            {
              timezone: "Africa/Sao_Tome",
              city: "São Tomé"
            },
            {
              timezone: "Atlantic/Reykjavik",
              city: "Reykjavík"
            },
            {
              timezone: "Atlantic/St_Helena",
              city: "Jamestown"
            }
          ]

        },
        {
          value: "W. Europe Standard Time",
          abbr: "WEDT",
          offset: 2,
          isdst: true,
          text: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
          utc: [
            "Arctic/Longyearbyen",
            "Europe/Amsterdam",
            "Europe/Andorra",
            "Europe/Berlin",
            "Europe/Busingen",
            "Europe/Gibraltar",
            "Europe/Luxembourg",
            "Europe/Malta",
            "Europe/Monaco",
            "Europe/Oslo",
            "Europe/Rome",
            "Europe/San_Marino",
            "Europe/Stockholm",
            "Europe/Vaduz",
            "Europe/Vatican",
            "Europe/Vienna",
            "Europe/Zurich"
          ],
          cities: [
            {
              timezone: "Arctic/Longyearbyen",
              city: "Longyearbyen"
            },
            {
              timezone: "Europe/Amsterdam",
              city: "Amsterdam"
            },
            {
              timezone: "Europe/Andorra",
              city: "Andorra la Vella"
            },
            {
              timezone: "Europe/Berlin",
              city: "Berlin"
            },
            {
              timezone: "Europe/Busingen",
              city: "Büsingen"
            },
            {
              timezone: "Europe/Gibraltar",
              city: "Gibraltar"
            },
            {
              timezone: "Europe/Luxembourg",
              city: "Luxembourg"
            },
            {
              timezone: "Europe/Malta",
              city: "Valletta"
            },
            {
              timezone: "Europe/Monaco",
              city: "Monaco"
            },
            {
              timezone: "Europe/Oslo",
              city: "Oslo"
            },
            {
              timezone: "Europe/Rome",
              city: "Rome"
            },
            {
              timezone: "Europe/San_Marino",
              city: "San Marino"
            },
            {
              timezone: "Europe/Stockholm",
              city: "Stockholm"
            },
            {
              timezone: "Europe/Vaduz",
              city: "Vaduz"
            },
            {
              timezone: "Europe/Vatican",
              city: "Vatican City"
            },
            {
              timezone: "Europe/Vienna",
              city: "Vienna"
            },
            {
              timezone: "Europe/Zurich",
              city: "Zurich"
            }
          ]

        },
        {
          value: "Central Europe Standard Time",
          abbr: "CEDT",
          offset: 2,
          isdst: true,
          text: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
          utc: [
            "Europe/Belgrade",
            "Europe/Bratislava",
            "Europe/Budapest",
            "Europe/Ljubljana",
            "Europe/Podgorica",
            "Europe/Prague",
            "Europe/Tirane"
          ],
          cities: [
            {
              timezone: "Europe/Belgrade",
              city: "Belgrade"
            },
            {
              timezone: "Europe/Bratislava",
              city: "Bratislava"
            },
            {
              timezone: "Europe/Budapest",
              city: "Budapest"
            },
            {
              timezone: "Europe/Ljubljana",
              city: "Ljubljana"
            },
            {
              timezone: "Europe/Podgorica",
              city: "Podgorica"
            },
            {
              timezone: "Europe/Prague",
              city: "Prague"
            },
            {
              timezone: "Europe/Tirane",
              city: "Tirana"
            }
          ]

        },
        {
          value: "Romance Standard Time",
          abbr: "RDT",
          offset: 2,
          isdst: true,
          text: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
          utc: [
            "Africa/Ceuta",
            "Europe/Brussels",
            "Europe/Copenhagen",
            "Europe/Madrid",
            "Europe/Paris"
          ],
          cities: [
            {
              timezone: "Africa/Ceuta",
              city: "Ceuta"
            },
            {
              timezone: "Europe/Brussels",
              city: "Brussels"
            },
            {
              timezone: "Europe/Copenhagen",
              city: "Copenhagen"
            },
            {
              timezone: "Europe/Madrid",
              city: "Madrid"
            },
            {
              timezone: "Europe/Paris",
              city: "Paris"
            }
          ]

        },
        {
          value: "Central European Standard Time",
          abbr: "CEDT",
          offset: 2,
          isdst: true,
          text: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
          utc: [
            "Europe/Sarajevo",
            "Europe/Skopje",
            "Europe/Warsaw",
            "Europe/Zagreb"
          ],
          cities: [
            {
              timezone: "Europe/Sarajevo",
              city: "Sarajevo"
            },
            {
              timezone: "Europe/Skopje",
              city: "Skopje"
            },
            {
              timezone: "Europe/Warsaw",
              city: "Warsaw"
            },
            {
              timezone: "Europe/Zagreb",
              city: "Zagreb"
            }
          ]

        },
        {
          value: "W. Central Africa Standard Time",
          abbr: "WCAST",
          offset: 1,
          isdst: false,
          text: "(UTC+01:00) West Central Africa",
          utc: [
            "Africa/Algiers",
            "Africa/Bangui",
            "Africa/Brazzaville",
            "Africa/Douala",
            "Africa/Kinshasa",
            "Africa/Lagos",
            "Africa/Libreville",
            "Africa/Luanda",
            "Africa/Malabo",
            "Africa/Ndjamena",
            "Africa/Niamey",
            "Africa/Porto-Novo",
            "Africa/Tunis",
            "Etc/GMT-1"
          ],
          cities: [
            {
              timezone: "Africa/Algiers",
              city: "Algiers"
            },
            {
              timezone: "Africa/Bangui",
              city: "Bangui"
            },
            {
              timezone: "Africa/Brazzaville",
              city: "Brazzaville"
            },
            {
              timezone: "Africa/Douala",
              city: "Douala"
            },
            {
              timezone: "Africa/Kinshasa",
              city: "Kinshasa"
            },
            {
              timezone: "Africa/Lagos",
              city: "Lagos"
            },
            {
              timezone: "Africa/Libreville",
              city: "Libreville"
            },
            {
              timezone: "Africa/Luanda",
              city: "Luanda"
            },
            {
              timezone: "Africa/Malabo",
              city: "Malabo"
            },
            {
              timezone: "Africa/Ndjamena",
              city: "N'Djamena"
            },
            {
              timezone: "Africa/Niamey",
              city: "Niamey"
            },
            {
              timezone: "Africa/Porto-Novo",
              city: "Porto-Novo"
            },
            {
              timezone: "Africa/Tunis",
              city: "Tunis"
            },
            {
              timezone: "Etc/GMT-1",
              city: "GMT-1"
            }
          ]

        },
        {
          value: "Namibia Standard Time",
          abbr: "NST",
          offset: 1,
          isdst: false,
          text: "(UTC+01:00) Windhoek",
          utc: [
            "Africa/Windhoek"
          ],
          cities: [
            {
              timezone: "Africa/Windhoek",
              city: "Windhoek"
            }
          ]

        },
        {
          value: "GTB Standard Time",
          abbr: "GDT",
          offset: 3,
          isdst: true,
          text: "(UTC+02:00) Athens, Bucharest",
          utc: [
            "Asia/Nicosia",
            "Europe/Athens",
            "Europe/Bucharest",
            "Europe/Chisinau"
          ],
          cities: [
            {
              timezone: "Asia/Nicosia",
              city: "Nicosia"
            },
            {
              timezone: "Europe/Athens",
              city: "Athens"
            },
            {
              timezone: "Europe/Bucharest",
              city: "Bucharest"
            },
            {
              timezone: "Europe/Chisinau",
              city: "Chisinau"
            }
          ]

        },
        {
          value: "Middle East Standard Time",
          abbr: "MEDT",
          offset: 3,
          isdst: true,
          text: "(UTC+02:00) Beirut",
          utc: [
            "Asia/Beirut"
          ],
          cities: [
            {
              timezone: "Asia/Beirut",
              city: "Beirut"
            }
          ]

        },
        {
          value: "Egypt Standard Time",
          abbr: "EST",
          offset: 2,
          isdst: false,
          text: "(UTC+02:00) Cairo",
          utc: [
            "Africa/Cairo"
          ],
          cities: [
            {
              timezone: "Africa/Cairo",
              city: "Cairo"
            }
          ]

        },
        {
          value: "Syria Standard Time",
          abbr: "SDT",
          offset: 3,
          isdst: false,
          text: "(UTC+02:00) Damascus",
          utc: [
            "Asia/Damascus"
          ],
          cities: [
            {
              timezone: "Asia/Damascus",
              city: "Damascus"
            }
          ]

        },
        {
          value: "E. Europe Standard Time",
          abbr: "EEDT",
          offset: 3,
          isdst: true,
          text: "(UTC+02:00) E. Europe",
          utc: [
            "Asia/Nicosia",
            "Europe/Athens",
            "Europe/Bucharest",
            "Europe/Chisinau",
            "Europe/Helsinki",
            "Europe/Kyiv",
            "Europe/Mariehamn",
            "Europe/Nicosia",
            "Europe/Riga",
            "Europe/Sofia",
            "Europe/Tallinn",
            "Europe/Vilnius"

          ],
          cities: [
            {timezone: "Asia/Nicosia", city: "Nicosia"},
            {timezone: "Europe/Athens", city: "Athens"},
            {timezone: "Europe/Bucharest", city: "Bucharest"},
            {timezone: "Europe/Chisinau", city: "Chisinau"},
            {timezone: "Europe/Helsinki", city: "Helsinki"},
            {timezone: "Europe/Kyiv", city: "Kyiv"},
            {timezone: "Europe/Mariehamn", city: "Mariehamn"},
            {timezone: "Europe/Nicosia", city: "Nicosia"},
            {timezone: "Europe/Riga", city: "Riga"},
            {timezone: "Europe/Sofia", city: "Sofia"},
            {timezone: "Europe/Tallinn", city: "Tallinn"},
            {timezone: "Europe/Vilnius", city: "Vilnius"}
          ]

        },
        {
          value: "South Africa Standard Time",
          abbr: "SAST",
          offset: 2,
          isdst: false,
          text: "(UTC+02:00) Harare, Pretoria",
          utc: [
            "Africa/Blantyre",
            "Africa/Bujumbura",
            "Africa/Gaborone",
            "Africa/Harare",
            "Africa/Johannesburg",
            "Africa/Kigali",
            "Africa/Lubumbashi",
            "Africa/Lusaka",
            "Africa/Maputo",
            "Africa/Maseru",
            "Africa/Mbabane",
            "Etc/GMT-2"
          ],
          cities: [
            {timezone: "Africa/Blantyre", city: "Blantyre"},
            {timezone: "Africa/Bujumbura", city: "Bujumbura"},
            {timezone: "Africa/Gaborone", city: "Gaborone"},
            {timezone: "Africa/Harare", city: "Harare"},
            {timezone: "Africa/Johannesburg", city: "Johannesburg"},
            {timezone: "Africa/Kigali", city: "Kigali"},
            {timezone: "Africa/Lubumbashi", city: "Lubumbashi"},
            {timezone: "Africa/Lusaka", city: "Lusaka"},
            {timezone: "Africa/Maputo", city: "Maputo"},
            {timezone: "Africa/Maseru", city: "Maseru"},
            {timezone: "Africa/Mbabane", city: "Mbabane"},
            {timezone: "Etc/GMT-2", city: "GMT-2 Offset"}
          ]

        },
        {
          value: "FLE Standard Time",
          abbr: "FDT",
          offset: 3,
          isdst: true,
          text: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
          utc: [
            "Europe/Helsinki",
            "Europe/Kyiv",
            "Europe/Mariehamn",
            "Europe/Riga",
            "Europe/Sofia",
            "Europe/Tallinn",
            "Europe/Vilnius"
          ],
          cities: [
            {timezone: "Europe/Helsinki", city: "Helsinki"},
            {timezone: "Europe/Kyiv", city: "Kyiv"},
            {timezone: "Europe/Mariehamn", city: "Mariehamn"},
            {timezone: "Europe/Riga", city: "Riga"},
            {timezone: "Europe/Sofia", city: "Sofia"},
            {timezone: "Europe/Tallinn", city: "Tallinn"},
            {timezone: "Europe/Vilnius", city: "Vilnius"}
          ]

        },
        {
          value: "Turkey Standard Time",
          abbr: "TDT",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Istanbul",
          utc: [
            "Europe/Istanbul"
          ],
          cities: [
            {timezone: "Europe/Istanbul", city: "Istanbul"}
          ]
        },
        {
          value: "Israel Standard Time",
          abbr: "JDT",
          offset: 3,
          isdst: true,
          text: "(UTC+02:00) Jerusalem",
          utc: [
            "Asia/Jerusalem"
          ],
          cities: [
            {timezone: "Asia/Jerusalem", city: "Jerusalem"}
          ]
        },
        {
          value: "Libya Standard Time",
          abbr: "LST",
          offset: 2,
          isdst: false,
          text: "(UTC+02:00) Tripoli",
          utc: [
            "Africa/Tripoli"
          ],
          cities: [
            {timezone: "Africa/Tripoli", city: "Tripoli"}
          ]
        },
        {
          value: "Jordan Standard Time",
          abbr: "JST",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Amman",
          utc: [
            "Asia/Amman"
          ],
          cities: [
            {timezone: "Asia/Amman", city: "Amman"}
          ]

        },
        {
          value: "Arabic Standard Time",
          abbr: "AST",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Baghdad",
          utc: [
            "Asia/Baghdad"
          ],
          cities: [
            {timezone: "Asia/Baghdad", city: "Baghdad"}
          ]

        },
        {
          value: "Kaliningrad Standard Time",
          abbr: "KST",
          offset: 3,
          isdst: false,
          text: "(UTC+02:00) Kaliningrad",
          utc: [
            "Europe/Kaliningrad"
          ],
          cities: [
            {timezone: "Europe/Kaliningrad", city: "Kaliningrad"}
          ]

        },
        {
          value: "Arab Standard Time",
          abbr: "AST",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Kuwait, Riyadh",
          utc: [
            "Asia/Aden",
            "Asia/Bahrain",
            "Asia/Kuwait",
            "Asia/Qatar",
            "Asia/Riyadh"
          ],
          cities: [
            {timezone: "Asia/Aden", city: "Aden"},
            {timezone: "Asia/Bahrain", city: "Manama"},
            {timezone: "Asia/Kuwait", city: "Kuwait City"},
            {timezone: "Asia/Qatar", city: "Doha"},
            {timezone: "Asia/Riyadh", city: "Riyadh"}
          ]

        },
        {
          value: "E. Africa Standard Time",
          abbr: "EAST",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Nairobi",
          utc: [
            "Africa/Addis_Ababa",
            "Africa/Asmera",
            "Africa/Dar_es_Salaam",
            "Africa/Djibouti",
            "Africa/Juba",
            "Africa/Kampala",
            "Africa/Khartoum",
            "Africa/Mogadishu",
            "Africa/Nairobi",
            "Antarctica/Syowa",
            "Etc/GMT-3",
            "Indian/Antananarivo",
            "Indian/Comoro",
            "Indian/Mayotte"
          ],
          cities: [
            {timezone: "Africa/Addis_Ababa", city: "Addis Ababa"},
            {timezone: "Africa/Asmera", city: "Asmara"},
            {timezone: "Africa/Dar_es_Salaam", city: "Dar es Salaam"},
            {timezone: "Africa/Djibouti", city: "Djibouti"},
            {timezone: "Africa/Juba", city: "Juba"},
            {timezone: "Africa/Kampala", city: "Kampala"},
            {timezone: "Africa/Khartoum", city: "Khartoum"},
            {timezone: "Africa/Mogadishu", city: "Mogadishu"},
            {timezone: "Africa/Nairobi", city: "Nairobi"},
            {timezone: "Antarctica/Syowa", city: "Syowa Station"},
            {timezone: "Etc/GMT-3", city: "GMT-3"},
            {timezone: "Indian/Antananarivo", city: "Antananarivo"},
            {timezone: "Indian/Comoro", city: "Moroni"},
            {timezone: "Indian/Mayotte", city: "Mamoudzou"}
          ]

        },
        {
          value: "Moscow Standard Time",
          abbr: "MSK",
          offset: 3,
          isdst: false,
          text: "(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk",
          utc: [
            "Europe/Kirov",
            "Europe/Moscow",
            "Europe/Simferopol",
            "Europe/Volgograd",
            "Europe/Minsk"
          ],
          cities: [
            {timezone: "Europe/Kirov", city: "Kirov"},
            {timezone: "Europe/Moscow", city: "Moscow"},
            {timezone: "Europe/Simferopol", city: "Simferopol"},
            {timezone: "Europe/Volgograd", city: "Volgograd"},
            {timezone: "Europe/Minsk", city: "Minsk"}
          ]
        },
        {
          value: "Samara Time",
          abbr: "SAMT",
          offset: 4,
          isdst: false,
          text: "(UTC+04:00) Samara, Ulyanovsk, Saratov",
          utc: [
            "Europe/Astrakhan",
            "Europe/Samara",
            "Europe/Ulyanovsk"
          ],
          cities: [
            {timezone: "Europe/Astrakhan", city: "Astrakhan"},
            {timezone: "Europe/Samara", city: "Samara"},
            {timezone: "Europe/Ulyanovsk", city: "Ulyanovsk"}
          ]

        },
        {
          value: "Iran Standard Time",
          abbr: "IDT",
          offset: 4.5,
          isdst: true,
          text: "(UTC+03:30) Tehran",
          utc: [
            "Asia/Tehran"
          ],
          cities: [
            {timezone: "Asia/Tehran", city: "Tehran"}
          ]
        },
        {
          value: "Arabian Standard Time",
          abbr: "AST",
          offset: 4,
          isdst: false,
          text: "(UTC+04:00) Abu Dhabi, Muscat",
          utc: [
            "Asia/Dubai",
            "Asia/Muscat",
            "Etc/GMT-4"
          ],
          cities: [
            {timezone: "Asia/Dubai", city: "Dubai"},
            {timezone: "Asia/Muscat", city: "Muscat"},
            {timezone: "Etc/GMT-4", city: "GMT-4 (no specific city)"}
          ]

        },
        {
          value: "Azerbaijan Standard Time",
          abbr: "ADT",
          offset: 5,
          isdst: true,
          text: "(UTC+04:00) Baku",
          utc: [
            "Asia/Baku"
          ],
          cities: [
            {timezone: "Asia/Baku", city: "Baku"}
          ]
        },
        {
          value: "Mauritius Standard Time",
          abbr: "MST",
          offset: 4,
          isdst: false,
          text: "(UTC+04:00) Port Louis",
          utc: [
            "Indian/Mahe",
            "Indian/Mauritius",
            "Indian/Reunion"
          ],
          cities: [
            {timezone: "Indian/Mahe", city: "Victoria"},
            {timezone: "Indian/Mauritius", city: "Port Louis"},
            {timezone: "Indian/Reunion", city: "Saint-Denis"}
          ]

        },
        {
          value: "Georgian Standard Time",
          abbr: "GET",
          offset: 4,
          isdst: false,
          text: "(UTC+04:00) Tbilisi",
          utc: [
            "Asia/Tbilisi"
          ],
          cities: [
            {timezone: "Asia/Tbilisi", city: "Tbilisi"}
          ]

        },
        {
          value: "Caucasus Standard Time",
          abbr: "CST",
          offset: 4,
          isdst: false,
          text: "(UTC+04:00) Yerevan",
          utc: [
            "Asia/Yerevan"
          ],
          cities: [
            {timezone: "Asia/Yerevan", city: "Yerevan"}
          ]

        },
        {
          value: "Afghanistan Standard Time",
          abbr: "AST",
          offset: 4.5,
          isdst: false,
          text: "(UTC+04:30) Kabul",
          utc: [
            "Asia/Kabul"
          ],
          cities: [
            {timezone: "Asia/Kabul", city: "Kabul"}
          ]
        },
        {
          value: "West Asia Standard Time",
          abbr: "WAST",
          offset: 5,
          isdst: false,
          text: "(UTC+05:00) Ashgabat, Tashkent",
          utc: [
            "Antarctica/Mawson",
            "Asia/Aqtau",
            "Asia/Aqtobe",
            "Asia/Ashgabat",
            "Asia/Dushanbe",
            "Asia/Oral",
            "Asia/Samarkand",
            "Asia/Tashkent",
            "Etc/GMT-5",
            "Indian/Kerguelen",
            "Indian/Maldives"
          ],
          cities: [
            {timezone: "Antarctica/Mawson", city: "Mawson Station"},
            {timezone: "Asia/Aqtau", city: "Aqtau"},
            {timezone: "Asia/Aqtobe", city: "Aqtobe"},
            {timezone: "Asia/Ashgabat", city: "Ashgabat"},
            {timezone: "Asia/Dushanbe", city: "Dushanbe"},
            {timezone: "Asia/Oral", city: "Oral"},
            {timezone: "Asia/Samarkand", city: "Samarkand"},
            {timezone: "Asia/Tashkent", city: "Tashkent"},
            {timezone: "Etc/GMT-5", city: "UTC+5"},
            {timezone: "Indian/Kerguelen", city: "Port-aux-Français"},
            {timezone: "Indian/Maldives", city: "Malé"}
          ]

        },
        {
          value: "Yekaterinburg Time",
          abbr: "YEKT",
          offset: 5,
          isdst: false,
          text: "(UTC+05:00) Yekaterinburg",
          utc: [
            "Asia/Yekaterinburg"
          ],
          cities: [
            {timezone: "Asia/Yekaterinburg", city: "Yekaterinburg"}
          ]

        },
        {
          value: "Pakistan Standard Time",
          abbr: "PKT",
          offset: 5,
          isdst: false,
          text: "(UTC+05:00) Islamabad, Karachi",
          utc: [
            "Asia/Karachi"
          ],
          cities: [
            {timezone: "Asia/Karachi", city: "Karachi"}
          ]

        },
        {
          value: "India Standard Time",
          abbr: "IST",
          offset: 5.5,
          isdst: false,
          text: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
          utc: [
            "Asia/Kolkata",
            "Asia/Calcutta"
          ],
          cities: [
            {timezone: "Asia/Kolkata", city: "Kolkata"},
            {timezone: "Asia/Calcutta", city: "Calcutta"}
          ]

        },
        {
          value: "Sri Lanka Standard Time",
          abbr: "SLST",
          offset: 5.5,
          isdst: false,
          text: "(UTC+05:30) Sri Jayawardenepura",
          utc: [
            "Asia/Colombo"
          ],
          cities: [
            {timezone: "Asia/Colombo", city: "Colombo"}
          ]

        },
        {
          value: "Nepal Standard Time",
          abbr: "NST",
          offset: 5.75,
          isdst: false,
          text: "(UTC+05:45) Kathmandu",
          utc: [
            "Asia/Kathmandu"
          ],
          cities: [
            {timezone: "Asia/Kathmandu", city: "Kathmandu"}
          ]

        },
        {
          value: "Central Asia Standard Time",
          abbr: "CAST",
          offset: 6,
          isdst: false,
          text: "(UTC+06:00) Nur-Sultan (Astana)",
          utc: [
            "Antarctica/Vostok",
            "Asia/Almaty",
            "Asia/Bishkek",
            "Asia/Qyzylorda",
            "Asia/Urumqi",
            "Etc/GMT-6",
            "Indian/Chagos"
          ],
          cities: [
            {timezone: "Antarctica/Vostok", city: "Vostok Station"},
            {timezone: "Asia/Almaty", city: "Almaty"},
            {timezone: "Asia/Bishkek", city: "Bishkek"},
            {timezone: "Asia/Qyzylorda", city: "Qyzylorda"},
            {timezone: "Asia/Urumqi", city: "Urumqi"},
            {timezone: "Etc/GMT-6", city: "GMT-6"},
            {timezone: "Indian/Chagos", city: "Diego Garcia"}
          ]

        },
        {
          value: "Bangladesh Standard Time",
          abbr: "BST",
          offset: 6,
          isdst: false,
          text: "(UTC+06:00) Dhaka",
          utc: [
            "Asia/Dhaka",
            "Asia/Thimphu"
          ],
          cities: [
            {timezone: "Asia/Dhaka", city: "Dhaka"},
            {timezone: "Asia/Thimphu", city: "Thimphu"}
          ]

        },
        {
          value: "Myanmar Standard Time",
          abbr: "MST",
          offset: 6.5,
          isdst: false,
          text: "(UTC+06:30) Yangon (Rangoon)",
          utc: [
            "Asia/Rangoon",
            "Indian/Cocos"
          ],
          cities: [
            {timezone: "Asia/Rangoon", city: "Yangon"},
            {timezone: "Indian/Cocos", city: "West Island"}
          ]

        },
        {
          value: "SE Asia Standard Time",
          abbr: "SAST",
          offset: 7,
          isdst: false,
          text: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
          utc: [
            "Antarctica/Davis",
            "Asia/Bangkok",
            "Asia/Hovd",
            "Asia/Jakarta",
            "Asia/Phnom_Penh",
            "Asia/Pontianak",
            "Asia/Saigon",
            "Asia/Vientiane",
            "Etc/GMT-7",
            "Indian/Christmas"
          ],
          cities: [
            {timezone: "Antarctica/Davis", city: "Davis Station"},
            {timezone: "Asia/Bangkok", city: "Bangkok"},
            {timezone: "Asia/Hovd", city: "Hovd"},
            {timezone: "Asia/Jakarta", city: "Jakarta"},
            {timezone: "Asia/Phnom_Penh", city: "Phnom Penh"},
            {timezone: "Asia/Pontianak", city: "Pontianak"},
            {timezone: "Asia/Saigon", city: "Ho Chi Minh City"},
            {timezone: "Asia/Vientiane", city: "Vientiane"},
            {timezone: "Etc/GMT-7", city: "GMT-7"},
            {timezone: "Indian/Christmas", city: "Flying Fish Cove"}
          ]

        },
        {
          value: "N. Central Asia Standard Time",
          abbr: "NCAST",
          offset: 7,
          isdst: false,
          text: "(UTC+07:00) Novosibirsk",
          utc: [
            "Asia/Novokuznetsk",
            "Asia/Novosibirsk",
            "Asia/Omsk",
            "Asia/Tomsk"
          ],
          cities: [
            {timezone: "Asia/Novokuznetsk", city: "Novokuznetsk"},
            {timezone: "Asia/Novosibirsk", city: "Novosibirsk"},
            {timezone: "Asia/Omsk", city: "Omsk"},
            {timezone: "Asia/Tomsk", city: "Tomsk"}
          ]

        },
        {
          value: "China Standard Time",
          abbr: "CST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
          utc: [
            "Asia/Hong_Kong",
            "Asia/Macau",
            "Asia/Shanghai"
          ],
          cities: [
            {timezone: "Asia/Hong_Kong", city: "Hong Kong"},
            {timezone: "Asia/Macau", city: "Macau"},
            {timezone: "Asia/Shanghai", city: "Shanghai"}
          ]

        },
        {
          value: "North Asia Standard Time",
          abbr: "NAST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Krasnoyarsk",
          utc: [
            "Asia/Krasnoyarsk"
          ],
          cities: [
            {timezone: "Asia/Krasnoyarsk", city: "Krasnoyarsk"}
          ]

        },
        {
          value: "Singapore Standard Time",
          abbr: "MPST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Kuala Lumpur, Singapore",
          utc: [
            "Asia/Brunei",
            "Asia/Kuala_Lumpur",
            "Asia/Kuching",
            "Asia/Makassar",
            "Asia/Manila",
            "Asia/Singapore",
            "Etc/GMT-8"
          ],
          cities: [
            {timezone: "Asia/Brunei", city: "Bandar Seri Begawan"},
            {timezone: "Asia/Kuala_Lumpur", city: "Kuala Lumpur"},
            {timezone: "Asia/Kuching", city: "Kuching"},
            {timezone: "Asia/Makassar", city: "Makassar"},
            {timezone: "Asia/Manila", city: "Manila"},
            {timezone: "Asia/Singapore", city: "Singapore"},
            {timezone: "Etc/GMT-8", city: "GMT-8 (unspecified location)"}
          ]

        },
        {
          value: "W. Australia Standard Time",
          abbr: "WAST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Perth",
          utc: [
            "Antarctica/Casey",
            "Australia/Perth"
          ],
          cities: [
            {timezone: "Antarctica/Casey", city: "Casey Station"},
            {timezone: "Australia/Perth", city: "Perth"}
          ]

        },
        {
          value: "Taipei Standard Time",
          abbr: "TST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Taipei",
          utc: [
            "Asia/Taipei"
          ],
          cities: [
            {timezone: "Asia/Taipei", city: "Taipei"}
          ]

        },
        {
          value: "Ulaanbaatar Standard Time",
          abbr: "UST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Ulaanbaatar",
          utc: [
            "Asia/Choibalsan",
            "Asia/Ulaanbaatar"
          ],
          cities: [
            {timezone: "Asia/Choibalsan", city: "Choibalsan"},
            {timezone: "Asia/Ulaanbaatar", city: "Ulaanbaatar"}
          ]

        },
        {
          value: "North Asia East Standard Time",
          abbr: "NAEST",
          offset: 8,
          isdst: false,
          text: "(UTC+08:00) Irkutsk",
          utc: [
            "Asia/Irkutsk"
          ],
          cities: [
            {timezone: "Asia/Irkutsk", city: "Irkutsk"}
          ]

        },
        {
          value: "Japan Standard Time",
          abbr: "JST",
          offset: 9,
          isdst: false,
          text: "(UTC+09:00) Osaka, Sapporo, Tokyo",
          utc: [
            "Asia/Dili",
            "Asia/Jayapura",
            "Asia/Tokyo",
            "Etc/GMT-9",
            "Pacific/Palau"
          ],
          cities: [
            {timezone: "Asia/Dili", city: "Dili"},
            {timezone: "Asia/Jayapura", city: "Jayapura"},
            {timezone: "Asia/Tokyo", city: "Tokyo"},
            {timezone: "Etc/GMT-9", city: "Etc GMT-9"},
            {timezone: "Pacific/Palau", city: "Ngerulmud"}
          ]

        },
        {
          value: "Korea Standard Time",
          abbr: "KST",
          offset: 9,
          isdst: false,
          text: "(UTC+09:00) Seoul",
          utc: [
            "Asia/Pyongyang",
            "Asia/Seoul"
          ],
          cities: [
            {timezone: "Asia/Pyongyang", city: "Pyongyang"},
            {timezone: "Asia/Seoul", city: "Seoul"}
          ]

        },
        {
          value: "Cen. Australia Standard Time",
          abbr: "CAST",
          offset: 9.5,
          isdst: false,
          text: "(UTC+09:30) Adelaide",
          utc: [
            "Australia/Adelaide",
            "Australia/Broken_Hill"
          ],
          cities: [
            {timezone: "Australia/Adelaide", city: "Adelaide"},
            {timezone: "Australia/Broken_Hill", city: "Broken Hill"}
          ]

        },
        {
          value: "AUS Central Standard Time",
          abbr: "ACST",
          offset: 9.5,
          isdst: false,
          text: "(UTC+09:30) Darwin",
          utc: [
            "Australia/Darwin"
          ],
          cities: [
            {timezone: "Australia/Darwin", city: "Darwin"}
          ]

        },
        {
          value: "E. Australia Standard Time",
          abbr: "EAST",
          offset: 10,
          isdst: false,
          text: "(UTC+10:00) Brisbane",
          utc: [
            "Australia/Brisbane",
            "Australia/Lindeman"
          ],
          cities: [
            {timezone: "Australia/Brisbane", city: "Brisbane"},
            {timezone: "Australia/Lindeman", city: "Lindeman"}
          ]

        },
        {
          value: "AUS Eastern Standard Time",
          abbr: "AEST",
          offset: 10,
          isdst: false,
          text: "(UTC+10:00) Canberra, Melbourne, Sydney",
          utc: [
            "Australia/Melbourne",
            "Australia/Sydney"
          ],
          cities: [
            {timezone: "Australia/Melbourne", city: "Melbourne"},
            {timezone: "Australia/Sydney", city: "Sydney"}
          ]

        },
        {
          value: "West Pacific Standard Time",
          abbr: "WPST",
          offset: 10,
          isdst: false,
          text: "(UTC+10:00) Guam, Port Moresby",
          utc: [
            "Antarctica/DumontDUrville",
            "Etc/GMT-10",
            "Pacific/Guam",
            "Pacific/Port_Moresby",
            "Pacific/Saipan",
            "Pacific/Truk"
          ],
          cities: [
            {timezone: "Antarctica/DumontDUrville", city: "Dumont d'Urville Station"},
            {timezone: "Etc/GMT-10", city: "UTC+10 (no specific city)"},
            {timezone: "Pacific/Guam", city: "Hagatna"},
            {timezone: "Pacific/Port_Moresby", city: "Port Moresby"},
            {timezone: "Pacific/Saipan", city: "Saipan"},
            {timezone: "Pacific/Truk", city: "Weno"}
          ]

        },
        {
          value: "Tasmania Standard Time",
          abbr: "TST",
          offset: 10,
          isdst: false,
          text: "(UTC+10:00) Hobart",
          utc: [
            "Australia/Currie",
            "Australia/Hobart"
          ],
          cities: [
            {timezone: "Australia/Currie", city: "Currie"},
            {timezone: "Australia/Hobart", city: "Hobart"}
          ]

        },
        {
          value: "Yakutsk Standard Time",
          abbr: "YST",
          offset: 9,
          isdst: false,
          text: "(UTC+09:00) Yakutsk",
          utc: [
            "Asia/Chita",
            "Asia/Khandyga",
            "Asia/Yakutsk"
          ],
          cities: [
            {timezone: "Asia/Chita", city: "Chita"},
            {timezone: "Asia/Khandyga", city: "Khandyga"},
            {timezone: "Asia/Yakutsk", city: "Yakutsk"}
          ]

        },
        {
          value: "Central Pacific Standard Time",
          abbr: "CPST",
          offset: 11,
          isdst: false,
          text: "(UTC+11:00) Solomon Is., New Caledonia",
          utc: [
            "Antarctica/Macquarie",
            "Etc/GMT-11",
            "Pacific/Efate",
            "Pacific/Guadalcanal",
            "Pacific/Kosrae",
            "Pacific/Noumea",
            "Pacific/Ponape"
          ],
          cities: [
            {timezone: "Antarctica/Macquarie", city: "Macquarie Island"},
            {timezone: "Etc/GMT-11", city: "GMT-11 (No specific city)"},
            {timezone: "Pacific/Efate", city: "Port Vila"},
            {timezone: "Pacific/Guadalcanal", city: "Honiara"},
            {timezone: "Pacific/Kosrae", city: "Tofol"},
            {timezone: "Pacific/Noumea", city: "Nouméa"},
            {timezone: "Pacific/Ponape", city: "Palikir"}
          ]

        },
        {
          value: "Vladivostok Standard Time",
          abbr: "VLAT",
          offset: 10,
          isdst: false,
          text: "(UTC+10:00) Vladivostok",
          utc: [
            "Asia/Ust-Nera",
            "Asia/Vladivostok"
          ],
          cities: [
            {timezone: "Asia/Ust-Nera", city: "Ust-Nera"},
            {timezone: "Asia/Vladivostok", city: "Vladivostok"}
          ]

        },
        {
          value: "Sakhalin Standard Time",
          abbr: "SAKT",
          offset: 11,
          isdst: false,
          text: "(UTC+11:00) Sakhalin",
          utc: [
            "Asia/Sakhalin"
          ],
          cities: [
            {timezone: "Asia/Sakhalin", city: "Yuzhno-Sakhalinsk"}
          ]

        },

        {
          value: "New Zealand Standard Time",
          abbr: "NZST",
          offset: 12,
          isdst: false,
          text: "(UTC+12:00) Auckland, Wellington",
          utc: [
            "Antarctica/McMurdo",
            "Pacific/Auckland"
          ],
          cities: [
            {timezone: "Antarctica/McMurdo", city: "McMurdo Station"},
            {timezone: "Pacific/Auckland", city: "Auckland"}
          ]

        },
        {
          value: "UTC+12",
          abbr: "U",
          offset: 12,
          isdst: false,
          text: "(UTC+12:00) Coordinated Universal Time+12",
          utc: [
            "Etc/GMT-12",
            "Pacific/Funafuti",
            "Pacific/Kwajalein",
            "Pacific/Majuro",
            "Pacific/Nauru",
            "Pacific/Tarawa",
            "Pacific/Wake",
            "Pacific/Wallis"
          ],
          cities: [
            {timezone: "Etc/GMT-12", city: "GMT-12"},
            {timezone: "Pacific/Funafuti", city: "Funafuti"},
            {timezone: "Pacific/Kwajalein", city: "Kwajalein"},
            {timezone: "Pacific/Majuro", city: "Majuro"},
            {timezone: "Pacific/Nauru", city: "Nauru"},
            {timezone: "Pacific/Tarawa", city: "Tarawa"},
            {timezone: "Pacific/Wake", city: "Wake Island"},
            {timezone: "Pacific/Wallis", city: "Wallis"}
          ]
        },
        {
          value: "Fiji Standard Time",
          abbr: "FST",
          offset: 12,
          isdst: false,
          text: "(UTC+12:00) Fiji",
          utc: [
            "Pacific/Fiji"
          ],
          cities: [
            {timezone: "Pacific/Fiji", city: "Suva"}
          ]

        },
        {
          value: "Magadan Standard Time",
          abbr: "MST",
          offset: 12,
          isdst: false,
          text: "(UTC+12:00) Magadan",
          utc: [
            "Asia/Anadyr",
            "Asia/Kamchatka",
            "Asia/Magadan",
            "Asia/Srednekolymsk"
          ],
          cities: [
            {timezone: "Asia/Anadyr", city: "Anadyr"},
            {timezone: "Asia/Kamchatka", city: "Petropavlovsk-Kamchatsky"},
            {timezone: "Asia/Magadan", city: "Magadan"},
            {timezone: "Asia/Srednekolymsk", city: "Srednekolymsk"}
          ]

        },
        {
          value: "Kamchatka Standard Time",
          abbr: "KDT",
          offset: 13,
          isdst: true,
          text: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old",
          utc: [
            "Asia/Kamchatka"
          ],
          cities: [
            {timezone: "Asia/Kamchatka", city: "Petropavlovsk-Kamchatsky"}
          ]

        },
        {
          value: "Tonga Standard Time",
          abbr: "TST",
          offset: 13,
          isdst: false,
          text: "(UTC+13:00) Nuku'alofa",
          utc: [
            "Etc/GMT-13",
            "Pacific/Enderbury",
            "Pacific/Fakaofo",
            "Pacific/Tongatapu"
          ],
          cities: [
            {timezone: "Etc/GMT-13", city: "N/A (Fixed offset timezone)"},
            {timezone: "Pacific/Enderbury", city: "Enderbury Island"},
            {timezone: "Pacific/Fakaofo", city: "Fakaofo"},
            {timezone: "Pacific/Tongatapu", city: "Nukuʻalofa"}
          ]

        },
        {
          value: "Samoa Standard Time",
          abbr: "SST",
          offset: 13,
          isdst: false,
          text: "(UTC+13:00) Samoa",
          utc: [
            "Pacific/Apia"
          ],
          cities: [
            {timezone: "Pacific/Apia", city: "Apia"}
          ]

        }
      ]
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTime = dayjs().format();
    }, 1000);
  },
  computed: {

    // myTimeZones() {
    //  return useObservable(liveQuery(() => db.timezones.toArray()));
    //
    // },

    filteredItems() {

      if (!this.searchKey) {

        return this.items;

      }


      return this.items.filter(item => {
        return item.cities && item.cities.filter(city => city.city.toLowerCase().includes(this.searchKey.toLowerCase())).length > 0
      });
    }

  },
  methods: {

    searchChanged(q) {
      this.searchKey = q.target.value;
      console.log(this.searchKey)
    },
    setTheme() {

      f7.setDarkMode(false);
    },
    async addZone(zone) {

      const data = {
        timezone: zone.timezone,
        city: zone.city,
        people: []
      };

      const savedItem = await db.timezones.add(data);

      console.log(savedItem);
      this.show = false;

    }
  }
}


</script>