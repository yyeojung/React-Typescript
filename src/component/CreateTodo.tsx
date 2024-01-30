
interface InputTextProps {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onSubmit(e: React.FormEvent<HTMLFormElement>): void;
    inputText: string;
}

const CreateTodo = ({
    onChange,
    onSubmit,
    inputText
}: InputTextProps) => {
  return (
    <div className='create_container'>
        <form onSubmit={(e) => onSubmit(e)}>
            <input
                type="text" 
                placeholder='할 일을 입력해 주세요.' 
                onChange={(e) => onChange(e)}
                value={inputText}
            />
            <button type="submit">등록하기</button>
        </form>
    </div>
  )
}

export default CreateTodo