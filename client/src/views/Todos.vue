<template>
  <div class="todos">
    <ul>
      <div v-for="todo in todos" :key="todo.id" class="todo" v-bind:class="{ completed: todo.done }">
        <p>{{ todo.text }}</p>
        <p v-if="todo.done">☑️</p>
        <p v-else>⬜️</p>
      </div>
    </ul>
    <div class="todo-form">
      <div class="form-control">
        <label for="todo">Todo</label>
        <input type="text" id="todo" placeholder="I to do ..." v-model="todo" />
      </div>
      <button @click="addTodo">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "@/store";

@Component
export default class Todos extends Vue {
  todo = "";
  interval: number | undefined = undefined;

  get todos(): ReadonlyArray<Todo> {
    return this.$store.state.todos;
  }

  created() {
    this.interval = setInterval(() => {
      this.$store.dispatch("loadTodos");
    }, 2000);
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  addTodo() {
    this.$store.dispatch("addTodo", this.todo);
    this.todo = "";
  }
}
</script>

<style scoped>
.todo {
  border: solid 1px darkgray;
  margin: 8px;
  background-color: lightyellow;
}
.todo.completed {
  background-color: lightgreen;
}
</style>
