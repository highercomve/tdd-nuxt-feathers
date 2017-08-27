export default function filterTodoBy (todoList, filter) {
  if (!filter) {
    return todoList
  }
  if (!!filter && typeof filter !== 'function') {
      throw new Error('filter must be a function')
  }
  return todoList.filter(filter)
}