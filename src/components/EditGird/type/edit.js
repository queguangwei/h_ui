import GirdTable from '../Gird-table.vue';

export default {
  mixins: [GirdTable],
  props: {
    typeName:{
      default: 'editGird',
    }
  },
  data () {
    return {
    };
  },
  methods: {
    validate() {
      this.broadcast('GirdCell', 'validate')
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
};
