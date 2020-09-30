<template>
  <ul class="row pl-0">
    <li
      v-for="categoria in $parent.categorias"
      :key="categoria.id"
      class="col-md-6 col-12 mb-4 pb-3 list-unstyled"
      :data-categoria-name="$parent.normalize(categoria.name)"
      @click="$parent.setNombreCategoria(categoria.name)">
      <a
        :id="`link-categoria-${categoria.id}`"
        :href="$parent.urlTiendas('categorias', categoria.id)"
        class="nav-link p-0 bb-gray pb-3">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div class="img-category parauco-icon d-flex align-items-center justify-content-center">
              <i
                class="second-title"
                :class="categoria.icon" />
            </div>
            <div class="pl-3">
              <h3
                :data-categoria-name-h5="$parent.normalize(categoria.name)"
                class="font-weight-bold c-black-2 fs-16 mb-0 text-left">
                {{ categoria.name }}
              </h3>
              <h4 class="fs-16 c-black-2">
                <i>({{ categoria.storeCount }} tiendas encontradas)</i>
              </h4>
            </div>
          </div>
          <a
            class="basic-text align-items-center d-flex"
            title="Ver todos los resultados">
            <u class="d-none d-md-block font-weight-bold pr-2 c-lightblue">
              Ver todas
            </u>
            <i class="category-arrow-ico la la-arrow-right" />
          </a>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ResultadoCategorias',
  data() {
    return {
      keywords: '',
    };
  },
  methods: {
    search() {
      this.$parent.search(this.keywords);
    },
  },
};

</script>
