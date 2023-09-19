import {
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../../configs/action-keys";
import {
  editTodoListAPI,
  getTodoListAPI,
} from "../../../configs/api-end-points";
import { httpRequest } from "../../../helpers/http.helper";

const requestData = async (dispatch) => {
  try {
    const data = await httpRequest(getTodoListAPI);
    dispatch({
      type: requestTodoDataKey,
      payload: data.items,
    });
  } catch (e) {
    console.log("Exception : ", e);
    dispatch({
      type: requestTodoDataKey,
      payload: [],
    });
  }
};

const addNewTodo = async (dispatch, body) => {
  try {
    const data = await httpRequest(getTodoListAPI, "POST", body);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (e) {
    console.log("Exception : ", e);
  }
};

const editTodo = async (dispatch, id, body) => {
  try {
    const data = await httpRequest(`${editTodoListAPI}/${id}`, "PUT", body);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (e) {
    console.log("Exception : ", e);
  }
};

const deleteTodo = async (dispatch, id) => {
  try {
    const data = await httpRequest(`${editTodoListAPI}/${id}`, "DELETE");
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (e) {
    console.log("Exception : ", e);
  }
};

const todoActions = (dispatch) => {
  return {
    requestData: () => requestData(dispatch),
    addNewTodo: (body) => addNewTodo(dispatch, body),
    editTodo: (id, body) => editTodo(dispatch, id, body),
    deleteTodo: (id) => deleteTodo(dispatch, id),
  };
};

export { todoActions };
