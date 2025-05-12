<template>
  <div class="editor-container">
    <div class="editor-toolbar">
      <el-button size="small" :type="editor?.isActive('link') ? 'primary' : ''" @click="showLinkDialog" title="Link">
        Link
      </el-button>
    </div>

    <editor-content :editor="editor" class="editor-content" />

    <el-dialog v-model="linkDialogVisible" width="30%" style="background:#0f1323">
      <el-form label-position="top">
        <el-form-item label="Text">
          <el-input v-model="linkText" placeholder="Link text"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="linkUrl" placeholder="https://example.com"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="linkDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertLink">Insert</el-button>
        <el-button v-if="editor?.isActive('link')" type="danger" @click="removeLink">Remove</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import LinkTag from '@tiptap/extension-link'
import UnderlineTag from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)
const headingLevel = ref('paragraph')
const linkDialogVisible = ref(false)
const linkText = ref('')
const linkUrl = ref('')

const maxLength = 100

const characterCount = computed(() => {
  return editor.value?.getText()?.length || 0
})



onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      UnderlineTag,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkTag.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watchEffect(() => {
  if (editor.value) {
    editor.value.on('update', () => {
      if (characterCount.value > maxLength) {
        const currentText = editor.value.getText().slice(0, maxLength)
        editor.value.commands.setContent(currentText)
        ElMessage.warning(`Maximum ${maxLength} characters allowed`)
      }
    })
  }
})


const showLinkDialog = () => {
  // Get existing link if active
  if (editor.value.isActive('link')) {
    const attrs = editor.value.getAttributes('link')
    linkUrl.value = attrs.href
    linkText.value = editor.value.getText()
  } else {
    // Get selected text if any
    linkText.value = editor.value.state.selection.empty
      ? ''
      : editor.value.state.doc.textBetween(
        editor.value.state.selection.from,
        editor.value.state.selection.to,
        ' '
      )
    linkUrl.value = ''
  }
  linkDialogVisible.value = true
}

// const insertLink = () => {
//   if (!linkUrl.value) {
//     linkDialogVisible.value = false
//     return
//   }

//   // First, focus the editor
//   editor.value.chain().focus()

//   // If there's selected text, convert it to a link
//   if (!editor.value.state.selection.empty) {
//     editor.value
//       .chain()
//       .setLink({ href: linkUrl.value })
//       .run()
//   } else {
//     // If no text is selected, insert the link text or URL
//     const textToInsert = linkText.value || linkUrl.value
//     const from = editor.value.state.selection.from

//     editor.value
//       .chain()
//       .insertContent({
//         type: 'text',
//         text: textToInsert,
//         marks: [
//           {
//             type: 'link',
//             attrs: {
//               href: linkUrl.value,
//             },
//           },
//         ],
//       })
//       .insertContent(' ')
//       .run()

//     // Move cursor to after the inserted link
//     const to = from + textToInsert.length
//     editor.value.commands.setTextSelection(to)
//   }

//   // Clear the dialog fields and close
//   linkText.value = ''
//   linkUrl.value = ''
//   linkDialogVisible.value = false
// }

const insertLink = () => {
  if (!linkUrl.value) {
    linkDialogVisible.value = false
    return
  }

  const textToInsert = linkText.value || linkUrl.value

  editor.value
    .chain()
    .focus()
    .insertContent({
      type: 'text',
      text: textToInsert,
      marks: [
        {
          type: 'link',
          attrs: {
            href: linkUrl.value,
          },
        },
      ],
    })
    .run()


  linkText.value = ''
  linkUrl.value = ''
  linkDialogVisible.value = false
}


const removeLink = () => {
  editor.value.chain().focus().unsetLink().run()
  linkText.value = ''
  linkUrl.value = ''
  linkDialogVisible.value = false
}
</script>

<style>
.ProseMirror {
  min-height: 150px;
  padding: 10px;
  background: white;
  color: black;
  border-radius: 0 0 4px 4px;
}

.ProseMirror:focus {
  outline: none;
}

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  padding: 8px;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  width: 630px;
}

.editor-content {
  background: white;
}

/* Style for headings and other elements in the editor */
.ProseMirror h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

.ProseMirror h2 {
  font-size: 1.5em;
  margin: 0.75em 0;
}

.ProseMirror h3 {
  font-size: 1.17em;
  margin: 0.83em 0;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 2em;
}

.ProseMirror a {
  color: #409EFF;
  text-decoration: underline;
  cursor: pointer;
}
</style>