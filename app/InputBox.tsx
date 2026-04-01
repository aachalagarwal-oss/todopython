
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type texttypes = {
  labeltext?: string;
  inputtext?: string;
  value?: string;
  onInputChange?: (value: string) => void;
  type?: string;
};


const InputBox=({
  labeltext,
  inputtext,
  value,
  onInputChange,
  type
}: texttypes)=>{
     return (

    <div className="">
      <Label className="">{labeltext}</Label>
      <Input
        type={type}
        placeholder={inputtext}
        value={value}
        onChange={(e) => onInputChange?.(e.target.value)}
      ></Input>
    </div>
  );
}

export default InputBox;