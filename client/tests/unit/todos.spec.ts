import { shallowMount, Wrapper } from "@vue/test-utils";
import Todos from "@/views/Todos.vue";
import { State } from "@/store";

describe("Todos.vue", () => {
  let todos: Wrapper<Todos>;
  let store: { state: State; dispatch: () => void };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("loads todos", () => {
    store = { state: { todos: [] }, dispatch: jest.fn() };
    shallowMount(Todos, {
      mocks: {
        $store: store,
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith("loadTodos");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe("when there are todos", () => {
    beforeEach(() => {
      store = {
        state: {
          todos: [
            {
              text: "test todo 1",
              completed: false,
              id: 1,
            },

            {
              text: "test todo 2",
              completed: true,
              id: 2,
            },
          ],
        },
        dispatch: jest.fn(),
      };
      todos = shallowMount(Todos, {
        mocks: {
          $store: store,
        },
      });
    });

    it("should display todos", () => {
      expect(todos.findAll(".todo")).toHaveLength(2);
      expect(todos.findAll(".todo").at(0).text()).toEqual(
        "test todo 1 - not yet done"
      );
      expect(todos.findAll(".todo").at(1).text()).toEqual(
        "test todo 2 - completed"
      );
    });
  });

  describe("when creating a todo", () => {
    beforeEach(() => {
      todos.find("input[type=text]").setValue("new test todo");
      todos.find("button").trigger("click");
    });

    it("dispatches the addTodo action", () => {
      expect(store.dispatch).toHaveBeenCalledWith("addTodo", {
        text: "new test todo",
      });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("clears the todo input field", () => {
      expect(todos.find("input[type=text]").text()).toEqual("");
    });
  });
});
