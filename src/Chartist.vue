<script>
export default {
  mounted () {
      this.draw()
    },
    props: {
      ratio: { type: String },
      data: { type: Object },
      options: { type: Object },
      type: { type: String, required: true, validator (val) { return val === 'Pie' || val === 'Line' || val === 'Bar' } },
      eventHandlers: { type: Array },
      responsiveOptions: { type: Array }
    },
    data () {
      return {
        chart: null,
        error: { onError: false, message: '' },
        noData: false,
        message: '',
        classNoData: options.classNoData,
        options: ''
      }
    },
    methods: {
      clear () {
        this.noData = false // remove class no data
        this.message = '' // remove message no data
        if (this.error.onError) {
          this.error = { onError: false, message: '' }
        } // clear error
      },
      draw () {
        if (this.haveNoData()) {
          return this.setNoData()
        }
        this.clear()
        this.chart = new this.$chartist[this.type](this.$refs.chart,)
        this.setEventHandlers()
      },
      haveNoData () {
        return !this.data ||
          !this.data.series ||
          this.data.series.length < 1 ||
          (
            (this.type !== 'Pie' && !this.options.distributeSeries) &&
            (this.data.labels.length < 1 || this.data.series.every(serie => {
              if (Array.isArray(serie)) {
                return !serie.length
              }
              return !serie.data.length
            }))
          )
      },
      redraw (newValue, oldValue) {
        if (this.error.onError) {
          return this.draw()
        } else if (this.haveNoData()) {
          return this.setNoData()
        }
        this.clear()
        this.chart.update(this.data, this.options)
      },
      resetEventHandlers (eventHandlers, oldEventHanlers) {
        if (!this.chart) {
          return
        }
        for (let item of oldEventHanlers) {
          this.chart.off(item.event, item.fn)
        }
        for (let item of eventHandlers) {
          this.chart.on(item.event, item.fn)
        }
      },
      setEventHandlers () {
        if (this.eventHandlers) {
          for (let item of this.eventHandlers) {
            this.chart.on(item.event, item.fn)
          }
        }
      },
      setNoData () {
        this.error = { onError: true, message: options.messageNoData }
        this.noData = true
        this.message = this.error.message
      }
    },
    // watch: {
    //   'ratio': 'redraw',
    //   'options': 'redraw',
    //   'data': { handler: 'redraw', deep: true },
    //   'type': 'draw',
    //   'eventHandlers': 'resetEventHandlers'
    // }
}
</script>
