<script>
export default {
  name: 'TiendaPorCategoria',
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
