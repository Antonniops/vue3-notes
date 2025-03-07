<script setup lang="ts">
import { Card, Dialog, InputText } from 'primevue'
import Editor from 'primevue/editor'
import { type Note } from '../interfaces/note.model'
import { ref } from 'vue'
import { on } from 'events'

const props = defineProps<{
  note: Note
}>()

defineOptions({
  name: 'vNote',
})

const emit = defineEmits(['delete', 'changeTitle', 'changeContent'])
const deleted = ref(false)
const visible = ref(false)
const onEditTitle = ref(false)
const onEditText = ref(false)
const noteCopy = ref<Note>(props.note)

function deleteItem(id: number): void {
  deleted.value = true

  setTimeout(() => {
    emit('delete', id)
  }, 500)
}

function onHideDialog(): void {
  onEditText.value = false
  onEditTitle.value = false
}
</script>

<template>
  <Card style="width: 25rem; overflow: hidden" :class="{ bounce: deleted }" @click="visible = true">
    <template #title>
      <p class="flex justify-between items-center">
        {{ note.title }}
        <i
          class="pi pi-trash text-red-500 hover:text-red-200 cursor-pointer"
          @click.stop.prevent="deleteItem(note.id)"
        ></i>
      </p>
    </template>
    <template #content>
      <p class="m-0" :innerHTML="note.content"></p>
    </template>
  </Card>

  <Dialog
    v-model:visible="visible"
    maximizable
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="onHideDialog()"
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
        v-model="noteCopy.content"
        editorStyle="height: 320px"
        v-if="onEditText"
        @blur="onEditText = false"
      />
    </div>
  </Dialog>
</template>
