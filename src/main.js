import Vue from 'vue';
import ListadoTiendasApp from './ListadoTiendasApp.vue';
import './scss/custom.scss';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(ListadoTiendasApp),
}).$mount('#pa-widget-mall-listado-tiendas');
