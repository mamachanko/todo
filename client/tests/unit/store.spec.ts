import { createStore } from "@/store";
import fetchMock from "jest-fetch-mock";

describe("store", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should have no todos by default", function () {
    const store = createStore();
    expect(store.state).toEqual({ todos: [] });
  });

  describe("when setting todos", () => {
    it("sets todos", () => {
      const store = createStore();

      store.commit("setTodos", [
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
      ]);

      expect(store.state).toEqual({
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
      });
    });
  });
  describe("when loading todos", () => {
    it("sets todos", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          _embedded: {
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
        })
      );

      const store = createStore();

      await store.dispatch("loadTodos");

      expect(store.state).toEqual({
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
      });
      expect(fetch).toHaveBeenCalledWith("/api/todos", {
        headers: {
          Accept: "application/json",
        },
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("when adding a todos", () => {
    it("adds todo and (re)loads todos", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));
      fetchMock.mockResponseOnce(
        JSON.stringify({
          _embedded: {
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
              {
                text: "test todo 3",
                completed: true,
                id: 3,
              },
            ],
          },
        })
      );

      const store = createStore();

      await store.dispatch("addTodo", { text: "test todo 3" });

      expect(store.state).toEqual({
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
          {
            text: "test todo 3",
            completed: true,
            id: 3,
          },
        ],
      });
      expect(fetch).toHaveBeenCalledWith("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text: "test todo 3" }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
