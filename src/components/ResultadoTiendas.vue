<template>
  <div>
    <ul class="row pl-0">
      <li
        v-for="tienda in $parent.tiendas"
        v-show="tienda.active"
        :key="tienda.slug"
        class="card-list col-lg-5-corp col-md-4 col-sm-6 col-6"
        :data-tienda-id="tienda.id"
        :data-tienda-name="$parent.normalize(tienda.name)">
        <a
          v-if="!$parent.vistaRuta"
          :href="tienda.slug.trim().length > 0 ?
            `${getSiteUrl()}/tiendas/detalle?q=${tienda.slug}` : 'javascript:void(0)'">
          <!-- :class="tienda.poiStateId === 1 ? 'card-open' : 'card-closed'" -->
          <span
            class="card-status-store" />
          <div class="card-item">
            <figure class="card-item-image">
              <img
                class="card-img"
                :src="tienda.logo ? tienda.logo.url : ''"
                :alt="tienda.name">
            </figure>
            <div class="card-body">
              <h5
                class="card-title mb-0 text-center text-capitalize"
                :data-tienda-name-h5="tienda.name">
                {{ tienda.name }}
              </h5>
            </div>
          </div>
        </a>
        <!--boton modal -->
        <button
          v-else
          :id="`linkModal-${tienda.suc}`"
          class="linkModal"
          data-toggle="modal"
          data-target="#storeMapModal"
          :data-name="tienda.suc"
          @click="testSuc(tienda.suc)">
          <span
            :class="tienda.poiStateId === 1 ? 'card-open' : 'card-closed'"
            class="card-status-store" />
          <div class="card-item">
            <figure class="card-item-image">
              <img
                class="card-img"
                :src="tienda.logo ? tienda.logo.url : ''"
                :alt="tienda.name">
            </figure>
            <div class="card-body">
              <h5
                class="card-title mb-0 text-center text-capitalize"
                :data-tienda-name-h5="tienda.name">
                {{ tienda.name }}
              </h5>
            </div>
          </div>
        </button>
        <!--fin boton modal -->
      </li>
    </ul>
    <div
      v-if="$parent.busquedaTiendas == 1
        && $parent.tiendas.length > 0
        && ($parent.totalItems >
          (($parent.currentPage + 1) * $parent.limitItems))
        && $parent.loading"
      id="see-more-div"
      class="see-more mx-auto text-center">
      <div class="loaderStores">
        Cargando...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultadoTiendas',
  data() {
    return {
      keywords: '',
      sucTienda: '',
      startPoint: '',
      rutaMapa: window.liquid.trazadoRuta.urlMapa,
    };
  },
  methods: {
    search() {
      this.$parent.search(this.keywords);
    },
    testSuc(data) {
      document.querySelector('#jibaRoute').setAttribute('src', `${this.rutaMapa}/${this.$parent.parameter}/${data}`);
      this.$parent.abrirLateral();
    },
    getSiteUrl() {
      return window.liquid.siteUrl;
    },
  },
};
</script>
