<template>
    <codemirror ref="myCm"
              v-model="code"
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/lucario.css'
// language js
import 'codemirror/mode/htmlembedded/htmlembedded.js'

export default {
  props: ['codee'],
  components: {
    codemirror
  },
  data() {
    return {
      code: this.codee,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/html',
        theme: 'lucario',
        lineNumbers: true,
        line: true,
        lineWrapping: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      this.$emit('update',newCode);
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  },
  created() {
    
  }
}
</script>
