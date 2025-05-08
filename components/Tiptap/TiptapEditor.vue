<template>
    <div class="editor-container">
        <!-- Toolbar with Element-UI buttons -->
        <div class="editor-toolbar">
            <el-button size="small" :type="editor?.isActive('bold') ? 'primary' : ''"
                @click="editor.chain().focus().toggleBold().run()">
                Bold
            </el-button>
            <el-button size="small" :type="editor?.isActive('italic') ? 'primary' : ''"
                @click="editor.chain().focus().toggleItalic().run()">
                Italic
            </el-button>

            <el-button size="small" :type="editor?.isActive('link') ? 'primary' : ''" @click="insertLink">
                Insert Link
            </el-button>
        </div>
        <!-- Tiptap Editor Content -->
        <editor-content :editor="editor" class="editor-content" />
    </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
    editor.value = new Editor({
        content: props.modelValue,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
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

const insertLink = () => {
    const url = prompt('Enter the URL:')
    if (url !== null) {
        if (url === '') {
            editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
    }
}
</script>


<style>
.ProseMirror {
    height: 150px !important;
}

.editor-container {
    border: 1px solid #dcdfe6;
    /* Element-UI border style */
    border-radius: 4px;
    overflow: hidden;
}

.editor-toolbar {
    padding: 8px;
    background: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
    width: 620px;
}

.editor-content {
    color: white;
}
</style>