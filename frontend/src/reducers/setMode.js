const setMode = (state = false, action) => {
  switch (action.type) {
    case 'MODE':
      return action.value
    default:
      return state
  }
}

export default setMode
