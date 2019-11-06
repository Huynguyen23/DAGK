export const setting = (width, height) => ({
  type: 'SETTING',
  width, height
})

export const toggleXIsNext = () => ({
  type: 'TOGGLE_X_IS_NEXT',
})

export const changeStep = (step) => ({
  type: 'CHANGE_STEP',
  step
})

export const clickSquare = (history) => ({
  type: 'CLICK_SQUARE',
  history
})
export const setMode = (value) => ({
  type: 'MODE',
  value
})
export const setHistory = () => ({
  type: 'SET_HISTORY'
  
})
export const sortMoves = (isDescending) => ({
  type: 'SORT_MOVES',
  isDescending
})

export const getMessage = () => ({
  type: 'GET_MESSAGE_USER'
})

export const updateHistory = (data) => ({
  type: 'UPDATE_HISTORY',
  data
})