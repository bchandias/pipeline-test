<template>
  <section class="bg-white pad-top-2">
    <div class="container">
      <h1
        class="title-stores font-weight-bold c-black-2 text-center"
        v-html="tituloBuscador">
        <i
          v-if="vistaRuta"
          data-toggle="modal"
          data-target="#modalContingencia"
          class="c-lightblue cursor-pointer la la-question-circle" />
      </h1>
      <h2
        v-if="busquedaTiendas < 3"
        class="fs-16 c-black-2 text-center "
        :class="!vistaRuta ? 'mb-4 pb-4' : 'pb-4'"
        v-html="subtituloBuscador" />
      <!-- START: TABS -->
      <div
        class="row d-flex align-items-center margin-desk"
        :class="!vistaRuta ? 'justify-content-between' : 'justify-content-center'">
        <div
          v-if="busquedaTiendas < 3"
          class="w-100 d-block basic-text c-gray-1 col-md-12 col-lg-12">
          <p
            v-if="!vistaRuta"
            class="mb-0 pl-2">
            Filtrar por
          </p>
        </div>
        <ul
          v-if="!vistaRuta"
          :class="busquedaTiendas < 3 ? 'col-md-12 col-lg-6 nav blue-tabs-list'
            : 'col-md-12 nav blue-tabs-list'">
          <li
            v-if="busquedaTiendas < 3"
            :class="busquedaTiendas == 1 ? 'tab active' : 'tab'">
            <a
              :href="urlTiendas(null, null)"
              class="nav-link"
              :class="busquedaTiendas == 1 ? 'nav-link active' : 'nav-link '"
              v-html="lblTienda()" />
          </li>
          <li
            v-if="busquedaTiendas < 3"
            :class="busquedaTiendas == 2 ? 'tab active' : 'tab'">
            <a
              :href="urlTiendas('categorias', null)"
              class="nav-link"
              :class="busquedaTiendas == 2 ? 'nav-link active' : 'nav-link '"
              v-html="lblCategorias()" />
          </li>
          <li
            v-if="busquedaTiendas > 2"
            class="nav-item mx-auto">
            <a
              :href="urlTiendas('categorias', null)"
              class="text-center nav-link nav-item"
              title="Volver">
              Volver a buscador de categor&iacute;a
            </a>
          </li>
        </ul>
        <div
          v-if="busquedaTiendas < 3"
          class="col-lg-6 col-12 searchbar-input-container">
          <input
            v-if="busquedaTiendas === 1"
            v-model="keywords"
            type="search"
            maxlength="100"
            class="search-input filter-store-input"
            :placeholder="phInput()"
            @input="keywords.length == 0 ? resetSearch() : true"
            @keyup.enter="resetSearch()">

          <input
            v-if="busquedaTiendas === 2"
            v-model="keywordsCategory"
            type="search"
            maxlength="100"
            class="search-input filter-store-input"
            :placeholder="phInput()"
            @input="keywordsCategory.length == 0
              ? searchCategorias() : true"
            @keyup.enter="keywordsCategory.length > 1
              ? searchCategorias() : true">

          <button
            type="button"
            :class="'btn-corp btn-search'
              + (busquedaTiendas === 2 && keywordsCategory.length < 2
                ? ' disabled' : '')"
            :disabled="busquedaTiendas === 2 && keywordsCategory.length < 2"
            @click="busquedaTiendas === 1 ? searchTiendas(false)
              : (keywordsCategory.length > 1 ? searchCategorias()
                : true)">
            <i class="la la-search c-white font-weight-bold search-ico" />
          </button>

          <div
            class="lds-ring"
            style="display: none;">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <!-- END: TABS -->
      <div class="row">
        <div
          v-if="loading"
          class="col-md-12 col-sm-12 col-12 col-10">
          <div class="loaderStores">
            Loading...
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-12">
          <div
            v-if="!loading && !existenResultados()"
            class="no-results-found mx-4 mx-auto text-center">
            <p class="c-black-2 second-title font-weight-bold">
              No se encontraron resultados
            </p>
            <p>
              Tu b&uacute;squeda para
              <span class="font-weight-bold">"{{ busquedaTiendas == 2 ?
                keywordsCategory: keywords }}"</span>
              no arroj&oacute; ningún resultado.
            </p>
          </div>
        </div>
      </div>

      <!-- START: RESULTADO TIENDAS -->
      <div
        v-if="busquedaTiendas === 1 || busquedaTiendas === 3
          && !loading"
        class="row">
        <div
          :class="busquedaTiendas === 1
            ? 'order-1 order-md-1 col-md-12 col-sm-12 col-12 mb-status'
            : 'order-1 order-md-1 col-md-12 col-sm-12 col-12'">
          <resultado-tiendas />
        </div>
      </div>
      <!-- END: RESULTADO TIENDAS -->

      <!-- START: RESULTADO CATEGORIAS -->
      <div
        v-if="busquedaTiendas === 2 && !loading"
        class="row">
        <aside
          v-if="keywordsCategory.length === 0"
          :class="'abc-filter-container order-2'
            + ' order-md-1 col-md-12 col-sm-1 col-2 d-md-none'">
          <ul class="abc-filter">
            <li
              v-for="(initial, index) in initialsCategory"
              :key="initial +'_' + index">
              <a
                href="javascript:void(0)"
                @click="scrollToCategoria(initial)">
                {{ initial }}
              </a>
            </li>
          </ul>
        </aside>
        <div class="order-1 order-md-2 col-md-12 col-sm-11 col-10">
          <resultado-categorias />
        </div>
      </div>
      <!-- END: RESULTADO CATEGORIAS -->
    </div>
    <modal-ruta />
    <!--Modal informtiva -->
    <div
      id="modalContingencia"
      class="modalContingencia modal right fade"
      tabindex="-2"
      role="dialog"
      aria-labelledby="modalContingencia">
      <div
        class="modal-dialog"
        role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex justify-content-center w-100 align-items-center">
              <h3
                class="modalContingencia-title">
                {{ modalRutaPost.title }}
              </h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            class="modal-body"
            v-html="modalRutaPost.description" />
        </div>
      </div>
      <!--Fin Modal informativa -->
    </div>
  </section>
</template>

<script>
import $ from 'jquery';
import CONSTS from '../constants';
import ModyoClient from '../repositories/Clients/modyoClient';
import ResultadoTiendas from './ResultadoTiendas.vue';
import ResultadoCategorias from './ResultadoCategorias.vue';
import ModalRuta from './ModalRuta.vue';

export default {
  name: 'ListadoTiendas',
  components: {
    ResultadoTiendas,
    ResultadoCategorias,
    'modal-ruta': ModalRuta,
  },
  data() {
    return {
      keywords: '',
      keywordsCategory: '',
      tiendas: [],
      categorias: [],
      loading: false,
      scrolled: false,
      initials: [],
      initialsCategory: [],
      busquedaTiendas: 1,
      nombreCategoria: '',
      limitItems: CONSTS.LIMIT_ITEMS,
      skipPage: CONSTS.SKIP_PAGE,
      totalItems: 0,
      currentPage: 0,
      currentUrl: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
      currentParams: new URLSearchParams(window.location.search),
      vistaRuta: false,
      sucTienda: '',
      modalRutaPostURL: `${window.liquid.siteUrl}/posts/arma-tu-ruta.json`,
      modalRutaPost: [],
      parameter: '',
      titleStores: '',
      subtitleStores: '',
      titleGastro: '',
      subtitleGastro: '',
      titleTrazaRuta: '',
      subtitleTrazaRuta: '',
      btnStores: '',
      btnGastro: '',
      placeholderStores: '',
      placeholderRestaurantes: '',
      placeholderCategories: '',
      titleCategories: '',
      btnCategories: '',
      tipoGastro: false,
      parametro: '',
    };
  },
  computed: {
    tituloBuscador() {
      const self = this;

      let titulo = '';
      if (!self.vistaRuta) {
        const titleGastro = self.existElement(self.titleGastro) ? self.titleGastro : CONSTS.TITULO_BUSCADOR_GASTRO;
        const titleStores = self.existElement(self.titleStores) ? self.titleStores : CONSTS.TITULO_BUSCADOR;
        const tituloBuscador = self.isTipoGastronomia() ? titleGastro : titleStores;
        const tituloCategorias = self.existElement(self.titleCategories)
          ? self.titleCategories : CONSTS.TITULO_BUSCADOR_CATEOGORIA;
        const tituloStoresByCategory = `Tiendas por categoría ${self.nombreCategoria}`;

        if (self.busquedaTiendas < 2) {
          titulo = tituloBuscador;
        } else if (self.busquedaTiendas === 2) {
          titulo = tituloCategorias;
        } else {
          titulo = tituloStoresByCategory;
        }
      } else {
        titulo = self.existElement(self.titleTrazaRuta) ? self.titleTrazaRuta : CONSTS.TITULO_TRAZA_RUTA;
      }
      return titulo;
    },
    subtituloBuscador() {
      const self = this;
      if (!this.vistaRuta) {
        const subtitleGastro = self.existElement(self.subtitleGastro)
          ? self.subtitleGastro : CONSTS.SUBTITULO_BUSCADOR_GASTRO;
        const subtitleStores = self.existElement(self.subtitleStores)
          ? self.subtitleStores : CONSTS.SUBTITULO_BUSCADOR;

        return self.isTipoGastronomia() ? subtitleGastro : subtitleStores;
      }
      return self.existElement(self.subtitleTrazaRuta) ? self.subtitleTrazaRuta : CONSTS.SUBTITULO_TRAZA_RUTA;
    },
  },
  mounted() {
    this.init();
    this.setListener();
  },
  methods: {
    init() {
      this.isTipoTrazaRuta();
      this.setTipoVista();
      this.setTextos();
      this.search();
      this.getRouteModal();
    },
    getRouteModal() {
      if (this.vistaRuta) {
        ModyoClient.get(this.modalRutaPostURL).then((response) => {
          this.modalRutaPost = response.data;
        }).catch(() => {
          // eslint-disable-next-line no-console
          console.debug('Error al cargar contenido de modal');
        });
      }
    },
    search() {
      if (this.busquedaTiendas === 3) {
        this.searchTiendasPorCategorias();
      } else if (this.busquedaTiendas === 2) {
        this.searchCategorias();
      } else {
        this.searchTiendas();
      }
    },
    searchTiendas(add = false) {
      const self = this;
      self.loading = true;

      if (!add) {
        self.tiendas = [];
      }

      ModyoClient.post(
        window.liquid.apiHost + CONSTS.CONFIG.searchStoresUrl,
        null,
        {
          data: {
            include: ['logo', 'poiMallZone', 'travelerDiscounts',
              'deals', 'poisPhunware', 'poiState'],
            name: self.keywords,
            poiTypeIdIn: self.isTipoGastronomia() ? CONSTS.TIPOS_DE_POI_GASTRO : CONSTS.TIPOS_DE_POI,
            limit: self.limitItems,
            skip: self.skipPage,
            poiStateIdIn: this.vistaRuta ? CONSTS.ESTADO_ABIERTO : CONSTS.ESTADO_POI,
            orderBy: 'name ASC',
          },
        },
      ).then((response) => {
        try {
          const tiendasEncontradas = response.data.data;
          if (add) {
            Array.prototype.push.apply(self.tiendas, tiendasEncontradas);
          } else {
            self.tiendas = tiendasEncontradas;
          }

          self.tiendas.forEach((tienda) => {
            // eslint-disable-next-line no-param-reassign
            tienda.name = tienda.name.toLowerCase();
          });
          self.tiendas.sort(self.compareNames);
          setTimeout(() => {
            self.setAlphabet();
          }, 500);
          self.totalItems = response.data.pagination.totalItems;
          self.loading = false;
          self.sucTienda = response.data.suc;
        } catch {
          // console.error('No se pudo cargar tiendas correctamente ', error);
          self.loading = false;
        }
      }).catch(() => {
        // console.debug('No se pudo consultar tiendas correctamente ', error);
        self.loading = false;
      });
    },
    searchCategorias() {
      const self = this;
      self.categorias = [];
      self.loading = true;

      let tiposDePoi = '';
      if (self.isTipoGastronomia()) {
        tiposDePoi = CONSTS.TIPOS_DE_POI_GASTRO.toString();
      } else {
        tiposDePoi = '';
      }
      if (tiposDePoi !== '') {
        self.parametro = `&poiTypeId=${tiposDePoi}`;
      }

      let urlCategories = window.liquid.apiHost + CONSTS.CONFIG.searchCategoriesUrl;

      if (self.keywordsCategory.length > 0) {
        urlCategories = `${urlCategories}&q=${self.keywordsCategory}`;
      }
      ModyoClient.get(
        `${urlCategories}${self.parametro}`,
      ).then((response) => {
        try {
          self.categorias = response.data.data;
          self.categorias.sort(self.compareNames);
          setTimeout(() => {
            self.setAlphabetCategory();
          }, 500);
          self.loading = false;
        } catch {
          // console.debug('No se pudo cargar categorías correctamente ', error);
          self.loading = false;
        }
      }).catch(() => {
        // console.debug('No se pudo consultar categorías correctamente', error);
        self.loading = false;
      });
    },
    searchTiendasPorCategorias() {
      const self = this;
      self.loading = true;

      ModyoClient.post(
        window.liquid.apiHost + CONSTS.CONFIG.searchStoresByCategoryUrl,
        null, {
          data: {
            categoryId: self.qParam('id'),
            include: ['logo', 'poiMallZone', 'travelerDiscounts',
              'deals', 'poisPhunware', 'poiState'],
          },
        },
      ).then((response) => {
        try {
          self.tiendas = [];
          response.data[0].forEach((tienda) => {
            self.tiendas.push(tienda);
          });
          self.tiendas.sort(self.compareNames);
          self.loading = false;
          if (self.tiendas.length < 1) {
            window.location.replace(window.liquid.notFoundPage);
          }
        } catch {
          // console.debug('No se pudo cargar tiendas correctamente ', error);
          self.loading = false;
        }
      }).catch((error) => {
        self.loading = false;
        if (error.response.status === 404) {
          window.location.replace(window.liquid.notFoundPage);
        }
      });
    },
    nextPageTiendas() {
      const self = this;
      if (((self.currentPage + 1) * self.limitItems) < self.totalItems) {
        self.currentPage += 1;
        self.skipPage = self.limitItems * (self.currentPage);
        self.searchTiendas(self.keywords.length === 0);
      }
    },
    resetPageTiendas() {
      const self = this;
      self.skipPage = CONSTS.SKIP_PAGE;
      self.searchTiendas();
    },
    scrollToTienda(initial) {
      const self = this;
      const initialAux = initial.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
      if (initialAux === '#') {
        self.scrollToElement($($('li[data-tienda-name]')[0]));
      } else {
        self.scrollToElement($($(`li[data-tienda-name^='${initialAux}' i]`)[0]));
      }
    },
    scrollToCategoria(initial) {
      const self = this;
      const initialAux = initial.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

      if (initialAux === '#') {
        self.scrollToElement(
          $($('li[data-categoria-name]')[0]),
        );
      } else {
        self.scrollToElement(
          $($(`li[data-categoria-name^='${initialAux}' i]`)[0]),
        );
      }
    },
    scrollToElement(domElement) {
      try {
        $('html, body').animate({
          scrollTop: $(domElement).offset().top - 80,
        }, 600);
      } catch {
        // console.debug('No se pudo realizar scroll', err);
      }
    },
    setAlphabet() {
      const self = this;
      self.initials = [];

      try {
        $('[data-tienda-name-h5]').each((a, b) => {
          let initial = $(b).html().trim().charAt(0)
            .toLowerCase();

          initial = Number.isNaN(parseInt(initial, 10)) ? initial : '#';
          initial = initial.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

          try {
            if (self.initials.indexOf(initial) === -1) self.initials.push(initial);
          } catch {
            // console.debug('Problema al intentar setear iniciales', err);
          }
        });
      } catch {
        // console.error('no se cargo alfabeto de tiendas', err);
      }
    },
    setAlphabetCategory() {
      const self = this;
      self.initialsCategory = [];

      try {
        $('[data-categoria-name-h5]').each((a, b) => {
          let initial = $(b).html().trim().charAt(0)
            .toLowerCase();
          initial = Number.isNaN(parseInt(initial, 10)) ? initial : '#';
          initial = initial.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

          try {
            if (self.initialsCategory.indexOf(initial) === -1) self.initialsCategory.push(initial);
          } catch {
            // console.debug('problema al intentar setar inicial', err);
          }
        });
      } catch {
        // console.error('no se cargo alfabeto de categorias', err);
      }
    },
    normalize(text) {
      if (typeof text === 'string') {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
      }
      return text;
    },
    compareNames(a, b) {
      const self = this;

      const nameA = self.normalize(a.name);
      const nameB = self.normalize(b.name);

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    },
    setTipoVista() {
      const self = this;
      this.busquedaTiendas = self.vistaTiendas();
    },
    setNombreCategoria(nombre) {
      this.nombreCategoria = `'${nombre}'`;
    },
    setTextos() {
      const self = this;
      try {
        self.confLayoutJson = JSON.parse($('#confLayoutJson-stores').text());
        self.titleStores = self.confLayoutJson.titleTiendas;
        self.titleCategories = self.confLayoutJson.titleCategorias;
        self.subtitleStores = self.confLayoutJson.subtitleTiendas;
        self.titleGastro = self.confLayoutJson.titleGastro;
        self.titleTrazaRuta = self.confLayoutJson.titleTrazaRuta;
        self.subtitleTrazaRuta = self.confLayoutJson.subtitleTrazaRuta;
        self.subtitleGastro = self.confLayoutJson.subtitleGastro;
        self.btnStores = self.confLayoutJson.btnTiendas;
        self.btnGastro = self.confLayoutJson.btnGastro;
        self.placeholderStores = self.confLayoutJson.placeholderTiendas;
        self.placeholderRestaurantes = self.confLayoutJson.placeholderRestaurantes;
        self.placeholderCategories = self.confLayoutJson.placeholderCategorias;
        self.btnCategories = self.confLayoutJson.btnCategorias;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('no se carga textos desde json', err);
        try {
          self.titleStores = window.liquid.tiendas.text.tituloBuscador;
          self.subtitleStores = window.liquid.tiendas.text.subtituloBuscador;
          self.titleGastro = window.liquid.tiendas.text.tituloBuscadorGastro;
          self.subtitleGastro = window.liquid.tiendas.text.subtituloBuscadorGastro;
          self.titleTrazaRuta = window.liquid.tiendas.text.tituloTrazaRuta;
          self.subtitleTrazaRuta = window.liquid.tiendas.text.subtituloTrazaRuta;
          self.btnStores = window.liquid.tiendas.text.btnTiendas;
          self.btnGastro = window.liquid.tiendas.text.btnGastro;
          self.placeholderStores = window.liquid.tiendas.text.phTiendas;
          self.placeholderRestaurantes = window.liquid.tiendas.text.phRestaurantes;
          self.titleCategories = window.liquid.tiendas.text.tituloBuscadorCateogoria;
          self.placeholderCategories = window.liquid.tiendas.text.phCategorias;
          self.btnCategories = window.liquid.tiendas.text.btnCategorias;
        } catch (err2) {
          // eslint-disable-next-line no-console
          console.warn('no se encontraron textos desde templates', err2);
        }
      }
    },
    existenResultados() {
      const self = this;
      let hayResultados = false;
      if ((self.busquedaTiendas === 1 && self.tiendas.length > 0)
        || (self.busquedaTiendas === 2 && self.categorias.length > 0)
        || self.busquedaTiendas === 3) {
        hayResultados = true;
      }
      return hayResultados;
    },
    existElement(element) {
      if (element !== undefined && element != null && element !== '') {
        return true;
      }
      return false;
    },
    setListener() {
      const self = this;
      window.addEventListener('scroll', () => {
        const lastKnownScrollPosition = window.scrollY;
        const isAtBottom = document.documentElement.scrollHeight
                            - document.documentElement.clientHeight
                            - document.getElementById('footer').offsetHeight <= lastKnownScrollPosition;
        if (!self.loading && isAtBottom
          && ((self.currentPage + 1) * self.limitItems < self.totalItems)) {
          self.nextPageTiendas();
        }
      });
    },
    resetSearch() {
      this.skipPage = 0;
      this.currentPage = 0;
      this.search(this.keywords);
    },
    isTipoGastronomia() {
      const self = this;
      let isGastro = false;

      try {
        self.confLayoutJson = JSON.parse($('#confLayoutJson-gastro').text());
        isGastro = self.confLayoutJson.isGastro;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('no se carga textos desde json', err);
      }

      return isGastro;
    },
    isTipoTrazaRuta() {
      if (window.location.href.indexOf('ruta') > -1) {
        this.vistaRuta = true;
      }
      if (this.vistaRuta && window.location.href.indexOf('q=') === -1) {
        document.location.href = `${window.liquid.siteUrl}/posts/not-found`;
      } else {
        this.parameter = window.location.href.split('q=').pop().replace('#/', '').trim();
      }
    },
    qParam(key) {
      const keyAux = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
      const match = window.location.search.match(new RegExp(`[?&]${keyAux}=([^&]+)(&|$)`));
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    lblTienda() {
      const btnStores = this.existElement(this.btnStores) ? this.btnStores : CONSTS.LBL_TIENDA;
      const btnGastro = this.existElement(this.btnGastro) ? this.btnGastro : CONSTS.LBL_RESTAURANTE;
      return this.isTipoGastronomia() ? btnGastro : btnStores;
    },
    lblCategorias() {
      return this.existElement(this.btnCategories) ? this.btnCategories : CONSTS.LBL_CATEGORIAS;
    },
    phInput() {
      let phStores = this.isTipoGastronomia() ? this.placeholderRestaurantes : this.placeholderStores;
      phStores = this.existElement(phStores) ? phStores : CONSTS.PH_TIENDAS;
      const phCategories = this.existElement(this.placeholderCategories)
        ? this.placeholderCategories : CONSTS.PH_CATEGORIAS;
      return this.busquedaTiendas === 1 ? phStores : phCategories;
    },
    vistaTiendas() {
      const self = this;
      if (self.qParam('v') !== 'categorias') {
        return 1;
      } if (Number.isInteger(parseInt(self.qParam('id'), 10))) {
        return 3;
      }
      return 2;
    },
    urlTiendas(viewValue, idCatValue) {
      const self = this;
      const newParams = new URLSearchParams();
      if (viewValue === 'categorias') {
        newParams.set('v', 'categorias');
        if (Number.isInteger(idCatValue, 10)) {
          newParams.set('id', idCatValue);
        }
      }
      if (self.currentParams.has('tipo')) {
        newParams.set('tipo', self.currentParams.get('tipo'));
      }
      const queryParams = self.existElement(newParams.toString()) ? `?${newParams.toString()}` : '';

      return `${self.currentUrl}${queryParams}`;
    },
    abrirLateral() {
      $('#storeMapModal').modal();
    },
  },
};
</script>
