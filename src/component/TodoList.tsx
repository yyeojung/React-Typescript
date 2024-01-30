import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";

export interface TList {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [inputText, setInputText] = useState("");
    const [todoList, setTodoList] = useState<TList[]>([]);

    //입력값 변경내용 확인
    const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }

    //입력확인
    const textInputHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const newTodo: TList = {
            id: Date.now(), //현재시간을 아이디로 사용
            text: inputText,
            completed: false
        };
        setTodoList([...todoList, newTodo]);
        setInputText(""); //임력 값 지우기
    }

    //값 삭제
    const textDeleteHandler = (id: number) => {
        setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
    }

    //값 수정하기
    const textUpdateHandler = (edit: TList): void => {
        const editTodoList = todoList.map((item) => {
            // id값이 같은 거은 새롭게 입력한 값으로 return 하고
            if(item.id === edit.id) {
                return edit;
                //그 외에는 기존 값을 return
            } else {
                return item;
            }
        });
        setTodoList(editTodoList);
    }
    return (
        <div className="list_container">
            <h2>todoList💡</h2>
            {todoList.map((item) => (
                <TodoItem
                    id={item.id}
                    key={item.id}
                    text={item.text}
                    completed={item.completed}
                    onClickDelete={textDeleteHandler}
                    onClickUpdate={textUpdateHandler}
                />
            ))}
            <CreateTodo
                onChange={textTypingHandler}
                onSubmit={textInputHandler}
                inputText={inputText}
            />
        </div>
    )
}

export default TodoList