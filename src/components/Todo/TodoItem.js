import "./TodoItem.css";
import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";

const TodoItem = (props) => {
  return (
    <div className="todoContainer">
      <div className="inputContainer">
        <Checkbox
          sx={{ mt: 1, color:'blueviolet'}}
          type="checkbox"
          id="status"
          checked={props.isChecked}
          onChange={props.onUpdate}
        />
        <label htmlFor="status"></label>
      </div>
      <p className={props.class}>{props.description}</p>
      <IconButton
        sx={{ color: "IndianRed" }}
        aria-label="delete"
        size="large"
        onClick={props.onDelete}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default TodoItem;
