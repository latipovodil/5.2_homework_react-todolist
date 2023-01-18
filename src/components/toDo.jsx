import React from "react";
import todo from "./toDo.module.scss";
export const ToDo = () => {
  const [add, setAdd] = React.useState([]);
  const [animation, setAnimation] = React.useState(false);
  const scroolList = React.useRef(false);
  const editForm = React.useRef(false);
  const [editId, setEditId] = React.useState(0);
  const [Delete, setDelete] = React.useState([false,0]);
  const form = (e) => {
    e.preventDefault();
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 300);
    scroolList.current.scrollTop = scroolList.current.scrollHeight;
    setAdd([
      ...add,
      {
        name: e.target[0].value,
        surname: e.target[1].value,
        age: e.target[2].value,
        id: Math.round(Math.random() * 1000),
      },
    ]);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };
  const deleteFunc = (id) => {
    let newAdd = [];
    setDelete([true,id]);
    setTimeout(() => {
      for (const i of add) {
        if (i.id === id) {
          continue;
        } else {
          newAdd.push(i);
        }
      }
      setAdd(newAdd);
      setDelete([false,0]);
    }, 500);
  };
  const editFunc = (id) => {
    setEditId(id);
    for (const i of add) {
      if (i.id === id) {
        editForm.current[0].value = i.name;
        editForm.current[1].value = i.surname;
        editForm.current[2].value = i.age;
      }
    }
  };
  const formEdit = (e) => {
    e.preventDefault();
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 300);

    for (const i of add) {
      if (i.id === editId) {
        i.name = editForm.current[0].value;
        i.surname = editForm.current[1].value;
        i.age = editForm.current[2].value;
      }
    }

    setEditId(0);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };
  return (
    <div className={todo.todo_box}>
      <div ref={scroolList} className={todo.list}>
        {add.length ? "" : <p>Don't users</p>}
        {add?.map((el) => (
          <div
            className={
              (
              Delete,Delete[1] === el.id ? todo.user_delete : editId === el.id ? todo.user_edit : todo.user)
            }
            id={el.id}
          >
            <button
              onClick={() => (editId ? "" : deleteFunc(el.id))}
              className={todo.delete}
            ></button>
            <button
              onClick={() => editFunc(el.id)}
              className={todo.edit}
            ></button>
            <h2 id={el.id} className={todo.username}>
              {el.name}
            </h2>
            <h3 id={el.id} className={todo.usersurname}>
              {el.surname}
            </h3>
            <p id={el.id} className={todo.userage}>
              {el.age}
            </p>
          </div>
        ))}
      </div>
      <form
        ref={editForm}
        onSubmit={editId ? formEdit : form}
        className={todo.form}
      >
        <input
          required
          placeholder="Name"
          className={todo.inputs}
          type="text"
        />
        <input
          required
          placeholder="Surname"
          className={todo.inputs}
          type="text"
        />
        <input required placeholder="Age" className={todo.inputs} type="text" />
        <button className={todo.submit}>{editId ? "Edit okey" : "Send"}</button>
      </form>
      <div className={animation ? todo.animation_box : ""}>
        <div className={animation ? todo.animation1 : ""}></div>
        <div className={animation ? todo.animation2 : ""}></div>
        <div className={animation ? todo.animation3 : ""}></div>
      </div>
    </div>
  );
};
