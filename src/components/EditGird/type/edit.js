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
      console.log('validate...')
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
};
