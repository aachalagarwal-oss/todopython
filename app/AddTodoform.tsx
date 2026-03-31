import InputBox from "./InputBox"
import { useTaskStore } from "./store/useTaskStore";

const AddTodoForm=()=>{

    const {title,desc ,setTitle,setDesc}=useTaskStore();
    return(
        <div>
            <InputBox  labeltext="Title" inputtext="Enter your title" value={title} onInputChange={setTitle}/>
            <InputBox labeltext="Description" inputtext="Enter the description" value={desc} onInputChange={setDesc}/>
        </div>
    )
}

export default AddTodoForm;