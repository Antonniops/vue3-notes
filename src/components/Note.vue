<script setup lang="ts">
import NoteDialog from './NoteDialog.vue'
import { Card } from 'primevue'
import { type Note } from '../interfaces/note.model'
import { ref } from 'vue'

defineProps<{
  note: Note
}>()

defineOptions({
  name: 'vNote',
})

const emit = defineEmits(['delete', 'changeTitle', 'changeContent'])
const deleted = ref(false)
const visible = ref(false)

function deleteItem(id: number): void {
  deleted.value = true

  setTimeout(() => {
    emit('delete', id)
  }, 500)
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

  <NoteDialog v-model:visible="visible" :note />
</template>
