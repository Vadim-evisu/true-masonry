import ImageLoaded from 'imagesloaded'

let props = {
  tag: {
    type: [String],
    default: 'div'
  },
  cols: {
    type: [Object, Number, String],
    default: 2
  },
  gap: {
    type: [Object, Number, String],
    default: 0
  },
  css: {
    type: [Boolean],
    default: true
  },
  hasImgs: {
    type: Boolean,
    default: false
  }
}

let setBreakpoints = (mixed, windowWidth) => {
  let valueAsNum = parseInt(mixed)
  let minVal = -1,
    zero = 0
  if (valueAsNum > -minVal) {
    return mixed
  } else if ('object' !== typeof mixed) {
    return zero
  }


  let matchedBreakpoint = Infinity
  let initValue = mixed.init || zero
  
  for (let key in mixed) {
    let breakpoint = parseInt(key)
    let breakpointValRaw = mixed[breakpoint]
    let breakpointVal = parseInt(breakpointValRaw)
    
    if (isNaN(breakpoint) || isNaN(breakpointVal)) {
      continue
    }

    let isNewBreakpoint = 
      windowWidth <= breakpoint && breakpoint < matchedBreakpoint

    if (isNewBreakpoint) {
      matchedBreakpoint = breakpoint
      initValue = breakpointValRaw
    }

  }
  return initValue
}

let component = {
  props,
  data() {
    return {
      displayColumns: 2,
      displayGutter: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._buildGrid()
    })

    // Bind resize handler to page
    if (window) {
      window.addEventListener('resize', this._reCalculate)
    }
  },
  updated() {
    this.$nextTick(() => {
      this._buildGrid()
      if (this.hasImgs) {
        this._waitForImages()
      }
    })
  },
  beforeDestroy() {
    if (window) {
      window.removeEventListener('resize', this._reCalculate)
    }
  },
  methods: {
    getChildItemsInColumnsArray() {
      let childItems = this.$slots.default || []
      // Loop through child elements
      // skip Vue elements without tags, which includes
      // whitespace elements and also plain text

      return childItems.filter(cell => cell.tag)
    },
    _resizeMasonryItem(item) {
      let rowGap = this.displayGutter,
          rowHeight = 0
      let col = item.elm
      let colHeight = col.scrollHeight
      let child = item.children[0].elm
      let childHeight = child.scrollHeight
      let setHeight = colHeight >= childHeight ? colHeight : childHeight
      let rowSpan = 
        Math.ceil((setHeight+rowGap)/(rowHeight+rowGap))
      item.elm.style.gridRowEnd = `span ${rowSpan}`
    },
    _resizeAllMasonryItems() {
      
      let allItems = this.getChildItemsInColumnsArray()
      for (let i = 0; i < allItems.length; i++) {
        this._resizeMasonryItem(allItems[i])
      }
    },
    _reCalculate() {
      let previousWindowWidth = this.windowWidth
      let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth
      this.windowWidth = (window ? width : null) || Infinity
      if (previousWindowWidth === this.windowWidth) {
        return
      }
      this._buildGrid()
    },
    _buildGrid() {
      this._reCalculateColumnCount(this.windowWidth)
      this._reCalculateGutterSize(this.windowWidth)
      this._resizeAllMasonryItems()

    },
    _waitForImages() {
      let imgLoad = ImageLoaded(this.$el)
      let onAlways = instance => {
        this._resizeAllMasonryItems()
      }
      imgLoad.on('always', onAlways)
    },
    _reCalculateColumnCount(windowWidth) {
      let zero = 0,
        one = 1
      let newCols = setBreakpoints(this.cols, windowWidth)
      newCols = Math.max(one, Number(newCols) || zero)
      this.displayColumns = newCols
    },
    _reCalculateGutterSize(windowWidth) {
      this.displayGutter = setBreakpoints(this.gap, windowWidth)
    },
  },
  render(h) {
    let one = 1,
      ten = 10,
      hundred = 100
    let isGutterSizeUnitless = 
      parseInt(this.displayGutter) === this.displayGutter * one
    let gutterSizeWithUnit = isGutterSizeUnitless ? (`${this.displayGutter}px`) : this.displayGutter
    let columnWidth = 
      ((hundred / this.displayColumns * ten) - this.displayGutter) / ten
    let containerStyle = {
      display: ['grid', '-ms-grid'],
      gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth}%, 1fr))`,
      gridAutoRows: 0,
      gridGap: gutterSizeWithUnit,
    }
    return h(
      this.tag,
      this.css ? { style: containerStyle } : null,
      this.$slots.default
    )
  }
}

const defaultOptions = {
  name: 'TrueMasonry'
}


const TrueMasonry = {
  install(Vue, options) {
    let userOptions = {...defaultOptions, ...options}
    // define a global property
    Vue.VERSION = 'v2.0.3'

    Vue.component(userOptions.name, component)
  }
}

export default TrueMasonry

if ('undefined' !== typeof window && window.Vue) {
  window.Vue.use(TrueMasonry)
}
