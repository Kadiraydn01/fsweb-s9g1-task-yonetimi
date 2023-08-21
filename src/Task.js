import React from "react";
import { toast } from "react-toastify";

const Task = ({ taskObj, onComplete }) => {
  const notify1 = () => toast("Göreviniz Tamamlananlara Eklendi !");

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>

      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>

      {onComplete && (
        <button
          onClick={() => {
            onComplete(taskObj.id);
            notify1();
          }}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
};

export default Task;
