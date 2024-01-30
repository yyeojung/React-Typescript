import { useState } from "react";
import {TList} from "./TodoList";
import {
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineCheck,
    AiOutlineClose,
  } from "react-icons/ai"

interface TodoItemProps {
    id: number,
    text: string;
    completed: boolean;
    onClickDelete(id: number): void;
    onClickUpdate(updatedTodoItem: TList): void;
}

const TodoItem = ({
    id,
    text, 
    completed,
    onClickDelete,
    onClickUpdate
} : TodoItemProps) => {
    //수정여부
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [updatedText, setUpdatedText] = useState<string>(text);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedText(e.target.value);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTodoItem = {
            id: id,
            text: updatedText,
            completed: completed
        };
        onClickUpdate(updatedTodoItem);
        setIsUpdating(false);
    }

    const handleComplete = () => {
        const updatedTodoItem = {
            id: id,
            text: text,
            completed: !completed
        };
        onClickUpdate(updatedTodoItem);
    };

    return (
        <>
        {!isUpdating ? (            
            <li className="container">
                <div className="item_container">
                    <button className="complete_btn" onClick={handleComplete}>
                        {completed ? "✔" : null}
                    </button>
                    <p
                        className="itemText"
                        style={completed ? {textDecoration: "line-through"} : undefined}
                    >{text}</p>
                </div>
                <div className="btn_container">
                    <button type="button" onClick={() => setIsUpdating(true)}>
                        <AiOutlineEdit size="17" />
                    </button>
                    <button type="button" onClick={() => onClickDelete(id)}>                        
                        <AiOutlineDelete size="17" />
                    </button>
                </div>
            </li>
        ) : (            
            <li className="container">
                <form onSubmit={handleFormSubmit}>
                    <div className="item_container">
                        <button className="complete_btn" onClick={handleComplete}>
                            {completed ? "✔" : null}
                        </button>
                        <input 
                            type="text"
                            value={updatedText}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="btn_container">
                        <button type="submit">
                            <AiOutlineCheck size="17"/>
                        </button>
                        <button type="button" onClick={() => setIsUpdating(false)}>
                            <AiOutlineClose size="17" />
                        </button>
                    </div>
                </form>
            </li>
        )}
        </>
    )
}

export default TodoItem