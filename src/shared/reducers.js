export const LOAD_PAGE_REQUEST = "LOAD_PAGE_REQUEST"
export const LOAD_PAGE_SUCCESS = "LOAD_PAGE_SUCCESS"
export const LOAD_PAGE_ERROR   = "LOAD_PAGE_ERROR"

export function loadPage(url) { 
  return { type: LOAD_PAGE_REQUEST, url }
}

export function loadPageSuccess(response) {
  return { type: LOAD_PAGE_SUCCESS, response }
}

export function loadPageError(error) {
  return { type: LOAD_PAGE_ERROR, error}
}

export function fetchPage(url) {
  return function(dispatch) {
    dispatch(loadPage(url));
    return fetch(`/json/${url}.json`)
      .then(response => response.json())
      .then(json => dispatch(loadPageSuccess(json)))
      .catch(error => dispatch(loadPageError(error)))
  }
}

export default function (state = {}, action) {
  switch(action.type) {
    case LOAD_PAGE_REQUEST:
      return {
        ...state,
        pending: true
      }
    case LOAD_PAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        meta: action.response.meta,
        html: action.response.html
      }
    case LOAD_PAGE_ERROR:
      return {
        ...state,  
        pending: false
      }
    default:
      return state
  }
}

