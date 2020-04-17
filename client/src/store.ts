import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface State {
  todos: Array<Todo>;
}

export function createStore() {
  return new Vuex.Store<State>({
    state: {
      todos: [],
    },
    mutations: {
      setTodos(state, todos) {
        state.todos = todos;
      },
    },
    actions: {
      loadTodos({ commit }) {
        return fetch("/api/todos", {
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => commit("setTodos", data._embedded.todos));
      },
      addTodo({ dispatch }, { text }) {
        return fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({ text }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then(() => dispatch("loadTodos"));
      },
    },
    modules: {},
  });
}
