const isDescending = (state = true, action) => {
  switch (action.type) {
    case 'SORT_MOVES':
      return action.isDescending
      case 'SET_HISTORY':
        return true
    default:
      return state
  }
}

export default isDescending
