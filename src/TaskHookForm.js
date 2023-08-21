import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
const TaskHookForm = ({ kisiler, submitFn }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });

  const [customErrors, setCustomErrors] = useState({});

  const {
    register,
    formState: { errors },
  } = useForm();

  function handleCheckboxChange(e) {
    const { value } = e.target;

    let yeniPeople = [...formData.people];
    const index = formData.people.indexOf(value);
    if (index > -1) {
      yeniPeople.splice(index, 1);
    } else {
      yeniPeople.push(value);
    }

    setFormData({
      ...formData,
      people: yeniPeople,
    });

    setCustomErrors({
      ...customErrors,
      people: "",
    });
  }

  function handleOthersChange(e) {
    const { name, value } = e.target;
    register(name, value);

    setCustomErrors({
      ...customErrors,
      [name]: "",
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    setFormData({
      title: "",
      description: "",
      people: [],
      customErrors: {},
    });
  }

  return (
    <form className="taskForm" onSubmit={handleFormSubmit}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          onChange={(e) => setFormData({ title: e.target.value })}
          defaultValue=""
        />
        {customErrors.title && (
          <p className="input-error">{customErrors.title}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          onChange={(e) => setFormData({ description: e.target.value })}
          defaultValue=""
        ></textarea>
        {customErrors.description && (
          <p className="input-error">{customErrors.description}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                onChange={handleCheckboxChange}
                checked={formData.people.includes(p)}
              />
              {p}
            </label>
          ))}
        </div>
        {customErrors.people && (
          <p className="input-error">{customErrors.people}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
