import '../app/style.css'
import Vue from 'vue'

const vehicle_times = {
    'Metrobüs': [
        ['00:00', '06:00'],
        ['10:00', '16:00'],
        ['22:00', '23:59'],

    ],
    'Metro': [
        ['06:00', '07:00'],
        ['09:00', '16:00'],
        ['20:00', '23:59'],
    ],
    'Otobüs': [
        ['00:00', '07:00'],
        ['09:00', '16:00'],
        ['22:00', '23:59'],
    ],
    'Marmaray': [
        ['06:00', '07:00'],
        ['09:00', '16:00'],
        ['20:00', '23:59'],
    ],
    'Vapur': [
        ['06:00', '23:00'],
    ],
    'Tünel': [
        ['07:00', '22:45'],
    ],
    'Deniz Otobüsü': [
        ['07:00', '21:00'],
    ],
    'Dentur': [
        ['00:00', '01:00'],
        ['06:00', '23:59'],
    ],
    'Turyol': [
        ['06:00', '23:59'],
        ['00:00', '01:00'],
    ],
    'Mavi Marmara': [
        ['00:00', '01:00'],
        ['07:00', '23:59'],
    ],
    'Araba Vapuru': [
        ['07:00', '22:30'],
    ],
    'Hızlı Feribot': [
        ['07:00', '22:30'],
    ],
}


Vue.config.debug = true;

function getMinutes(str) {
    let time = str.split(':');
    return time[0] * 60 + time[1] * 1;
}

function getMinutesNow() {
    let timeNow = new Date();
    return timeNow.getHours() * 60 + timeNow.getMinutes();
}

function if_ok() {
    let now = this.minutes;
    for (let index = 0; index < this.allowed_times.length; ++index) {
        let time = this.allowed_times[index];
        let start = getMinutes(time[0]);
        let end = getMinutes(time[1]);
        if ((now >= start) && (now <= end)) {
            return true;
        }
    }
    return false;
}

let panel = Vue.extend({
    template: '<div v-bind:class="[\'box\', { ok: status, notok: !status }]">{{ vehicle }}<table class="times"><tbody><tr v-for="time in allowed_times"><td>{{time[0]}}</td><td>{{time[1]}}</td></tr></tbody></table></div>',
    props: ['vehicle'],
    data: function() {
        return {
            allowed_times: vehicle_times[this.vehicle],
            minutes: getMinutesNow(),
            vehicle_times: {},
        };
    },
    computed: {
        status: if_ok,

    },
    created: function() {
            this.interval = setInterval(function(){
                this.minutes = getMinutesNow();
            }.bind(this), 1000)
    }
});

Vue.component('panel', panel);

new Vue({
    el: '#app',
    data: {
        time: "00:00",
        panels: [
          {name: 'Metrobüs'},
          {name: 'Metro'},
          {name: 'Otobüs'},
          {name: 'Marmaray'},
          {name: 'Tünel'},
          {name: 'Vapur'},
          {name: 'Deniz Otobüsü'},
          {name: 'Dentur'},
          {name: 'Turyol'},
          {name: 'Mavi Marmara'},
          {name: 'Araba Vapuru'},
          {name: 'Hızlı Feribot'},
         ],
    },
    created: function() {
            this.interval = setInterval(function(){
                this.time = new Date().toLocaleTimeString('en-GB');
            }.bind(this), 1000)
    }

});
