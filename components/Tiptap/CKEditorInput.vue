<template>
    <ckeditor
      v-if="editor"
      :editor="editor"
      :config="config"
      :model-value="modelValue"
      @update:model-value="onInput"
      class="custom-editor"
    />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';
  
  // Props + Emits
  const props = defineProps({
    modelValue: String
  });
  const emit = defineEmits(['update:modelValue']);
  
  const onInput = (value) => {
    emit('update:modelValue', value);
  };
  
  const cloud = useCKEditorCloud({
    version: '45.0.0',
    premium: true
  });
  
  const editor = computed(() => {
    if (!cloud.data.value) return null;
    return cloud.data.value.CKEditor.ClassicEditor;
  });
  
  const config = computed(() => {
    if (!cloud.data.value) return null;
  
    const {
      Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
      Link, List, BlockQuote, Table, TableToolbar,
      Image, ImageToolbar, ImageUpload, ImageInsert, ImageStyle
    } = cloud.data.value.CKEditor;
  
    const { FormatPainter } = cloud.data.value.CKEditorPremiumFeatures;
  
    return {
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDc5NTgzOTksImp0aSI6IjczNzFlYTQ5LWMyYmYtNGVhZC04YmZlLWQxODMwOWNmNzNiMCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjRiMjI0YjExIn0.ZhMnshz-XWngFBGCQUuRg1sMNYvDr8pvfaKoWRaLfqU5Yu1UgboslUf9yPwEIzYJbi77IcDuQ-qs7m5lbJ8nqQ',
      plugins: [
        Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
        Link, List, BlockQuote, Table, TableToolbar,
        Image, ImageToolbar, ImageUpload, ImageInsert, ImageStyle,
        FormatPainter
      ],
      toolbar: [
        'undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough',
        '|', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote',
        'formatPainter', '|', 'insertTable', 'imageInsert'
      ],
      link: {
        decorators: {
          isExternal: {
            mode: 'manual',
            label: 'Open in new tab',
            attributes: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        }
      },
      image: {
        toolbar: [
          'imageTextAlternative', 'imageStyle:inline',
          'imageStyle:block', 'imageStyle:side'
        ]
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
      }
    };
  });
  </script>
  
  <style>
  .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,
  .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners {
    height: 150px !important;
    width: 630px !important;
  }
  
  .custom-editor {
    width: 100%;
    min-height: 200px;
  }
  
  .ck-content a {
    color: #0066cc !important;
    text-decoration: underline !important;
    background-color: #e0f0ff;
    padding: 0 2px;
    border-radius: 2px;
  }
  </style>
  