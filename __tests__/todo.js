/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("Todo Test Cases", () => {
  beforeAll(() => {
    add({
      title: "Test case -initially -add item to list",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new todo in list", () => {
    let length = all.length;
    add({
      title: "Test not a null list",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(length + 1);
  });

  test("Mark todo as a completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Test for overdue", () => {
    expect(
      overdue().every((todo) => {
        return todo.dueDate === yesterday;
      })
    ).toBe(true);
  });

  test("Test for dueToday", () => {
    expect(
      dueToday().every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Test for dueLater", () => {
    expect(
      dueLater().every((todo) => {
        return todo.dueDate === tomorrow;
      })
    ).toBe(true);
  });
});
