<script setup lang="ts">
import { Button, Card } from 'primevue'
import { Note } from '../interfaces/note.model'
import { ref } from 'vue'
import { time } from 'console'

const emit = defineEmits(['delete'])
const deleted = ref(false)

defineProps<{
  note: Note
}>()

defineOptions({
  name: 'vNote',
})

function deleteItem(id: number): void {
  deleted.value = true

  setTimeout(() => {
    emit('delete', id)
  }, 500)
}
</script>

<template>
  <Card style="width: 25rem; overflow: hidden" :class="{ bounce: deleted }">
    <template #title>
      <p class="flex justify-between items-center">
        {{ note.title }}
        <i
          class="pi pi-trash text-red-500 hover:text-red-200 cursor-pointer"
          @click="deleteItem(note.id)"
        ></i></p
    ></template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        {{ note.content }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>
