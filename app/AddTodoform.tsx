import { Textarea } from "@/components/ui/textarea";
import InputBox from "./InputBox"
import { useTaskStore } from "./store/useTaskStore";

type FormData = {
  title: string
  desc: string
}

const AddTodoForm=()=>{

    

    const {title,desc ,setTitle,setDesc}=useTaskStore();
    return(
        <div className="text-black dark:text-white">
            <InputBox  labeltext="Title" inputtext="Enter your title" value={title} onInputChange={setTitle}/>
            <InputBox labeltext="Description" textareatext="Enter the description" valuedesc={desc} ondescChange={setDesc}/>
        </div>
    )
}

export default AddTodoForm;




// const AddTodoForm = () => {
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const { title, desc, setTitle, setDesc } = useTaskStore();
//   return (
//     <div>
//       <InputBox {...register("title")} inputtext="Enter your title" />
//       <InputBox {...register("desc")} inputtext="Enter description" />
//     </div>
//   );
// };

// export default AddTodoForm;
