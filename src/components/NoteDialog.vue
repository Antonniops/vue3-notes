<script setup lang="ts">
import type { Note } from '@/interfaces/note.model'
import { Dialog, InputText } from 'primevue'
import Editor from 'primevue/editor'
import { ref } from 'vue'

const props = defineProps<{
  note: Note
}>()

defineOptions({
  name: 'vNoteDialog',
})

const visible = defineModel<boolean>('visible')

const noteCopy = ref<Note>(props.note)
const onEditTitle = ref(false)
const onEditText = ref(false)

function onHideDialog(): void {
  console.log('KJSADGHKLHJDSGKLJ')
  onEditText.value = false
  onEditTitle.value = false
}
</script>

<template>
  <Dialog
    maximizable
    modal
    v-model:visible="visible"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="onHideDialog"
  >
    <template #header>
      <div v-if="!onEditTitle" @click="onEditTitle = true">
        <h3 class="flex justify-between items-center font-semibold text-2xl">
          {{ note.title }}
        </h3>
      </div>
      <InputText
        v-model="noteCopy.title"
        class="w-full"
        v-if="onEditTitle"
        @blur="onEditTitle = false"
      />
    </template>

    <div v-if="!onEditText" @click="onEditText = true">
      <p v-html="note.content"></p>
    </div>
    <div class="card">
      <Editor
        v-if="onEditText"
        v-model="noteCopy.content"
        editorStyle="height: 320px"
        @blur="onEditText = false"
      />
    </div>
  </Dialog>
</template>
