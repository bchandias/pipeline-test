<template>
  <div>
    <listado-tiendas />
    <footer id="bottomFooter" />
  </div>
</template>

<script>
import ListadoTiendas from './components/ListadoTiendas.vue';

export default {
  name: 'ListadoTiendasApp',
  components: {
    ListadoTiendas,
  },
};
</script>
