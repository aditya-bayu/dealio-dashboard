<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="add-new-post">
        <div ref="editor" class="add-new-post__editor mb-1"></div>
      </d-form>
    </d-card-body>
  </d-card>
</template>

<script>
import Quill from 'quill';

export default {
  name: 'editor',
  data() {
    return {
      quill: "",
    }
  },
  mounted() {
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ];

    // Init the Quill RTE
    this.quill = new Quill(this.$refs.editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: 'Words can be like x-rays if you use them properly...',
      theme: 'snow',
    });
  },
  methods: {
    addQuill() {
      var delta = this.quill.getContents();
      return delta;
    }
  }
};
</script>

