export const props = {
  strings: {
    type: Array,
    required: false,
    default: function() {
      return ['Hello World!']
    }
  },
  // stringsElement: {
  //   type: String,
  //   required: false,
  //   default: null
  // },
  typeSpeed: {
    type: Number,
    required: false,
    default: 100
  },
  startDelay: {
    type: Number,
    required: false,
    default: 0
  },
  backSpeed: {
    type: Number,
    required: false,
    default: 0
  },
  smartBackspace: {
    type: Boolean,
    required: false,
    default: true
  },
  shuffle: {
    type: Boolean,
    required: false,
    default: false
  },
  backDelay: {
    type: Number,
    required: false,
    default: 700
  },
  fadeOut: {
    type: Boolean,
    required: false,
    default: false
  },
  fadeOutClass: {
    type: String,
    required: false,
    default: 'typed-fade-out'
  },
  fadeOutDelay: {
    type: Number,
    required: false,
    default: 500
  },
  loop: {
    type: Boolean,
    required: false,
    default: false
  },
  loopCount: {
    type: Number,
    required: false,
    default: Infinity
  },
  showCursor: {
    type: Boolean,
    required: false,
    default: true
  },
  cursorChar: {
    type: String,
    required: false,
    default: '|'
  },
  autoInsertCss: {
    type: Boolean,
    required: false,
    default: false
  },
  attr: {
    type: String,
    required: false,
    default: null
  },
  bindInputFocusEvents: {
    type: Boolean,
    required: false,
    default: false
  },
  contentType: {
    type: String,
    required: false,
    default: 'html'
  }
}

export const getEventHandlers = (context, typedConfig) => {
  typedConfig.onComplete = self => {
    context.$emit('onComplete', self)
  }

  typedConfig.preStringTyped = (arrayPos, self) => {
    context.$emit('preStringTyped', arrayPos, self)
  }

  typedConfig.onStringTyped = (arrayPos, self) => {
    context.$emit('onStringTyped', arrayPos, self)
  }

  typedConfig.onLastStringBackspaced = self => {
    context.$emit('onLastStringBackspaced', self)
  }

  typedConfig.onTypingPaused = (arrayPos, self) => {
    context.$emit('onTypingPaused', arrayPos, self)
  }

  typedConfig.onTypingResumed = (arrayPos, self) => {
    context.$emit('onTypingResumed', arrayPos, self)
  }

  typedConfig.onReset = self => {
    context.$emit('onReset', self)
  }

  typedConfig.onStop = (arrayPos, self) => {
    context.$emit('onStop', arrayPos, self)
  }

  typedConfig.onStart = (arrayPos, self) => {
    context.$emit('onStart', arrayPos, self)
  }

  typedConfig.onDestroy = self => {
    context.$emit('onDestroy', self)
  }

  return typedConfig
}
