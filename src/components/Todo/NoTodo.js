import "./NoTodo.css";
import image from "../../assets/no-data.png";
const NoTodo = () => {
  return (
    <div>
      <hr className="line" />
      <div className="imagediv">
        <img src={image} className="image" />
      </div>
      <h3 className="heading">No Data</h3>
    </div>
  );
};

export default NoTodo;
