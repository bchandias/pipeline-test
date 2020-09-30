<template id="modal-ruta-template">
  <!-- Modal -->
  <div
    id="storeMapModal"
    class="routeModal store-modal modal right fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="storeMapModal">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div
          class="modal-header">
          <button
            type="button"
            class="close"
            style="font-size: 2.5rem;"
            data-dismiss="modal"
            aria-label="Close"
            @click="close()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <iframe
            id="jibaRoute"
            :src="`${rutaMapa}/pak-1-hugo-boss/S 681`" />
        </div>
      </div>
    </div>
  </div>
<!-- Modal -->
</template>
<script>
import $ from 'jquery';

export default {
  name: 'ModalRuta',
  data() {
    return {
      sucTienda: '',
      rutaMapa: window.liquid.trazadoRuta.urlMapa,
    };
  },
  mounted() {
  },

  methods: {
    close() {
      $('body').css('overflow', 'auto');
    },
  },
};
</script>
