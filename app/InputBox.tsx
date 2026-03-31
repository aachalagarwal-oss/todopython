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
      <label className="">{labeltext}</label>
      <input
        type={type}
        placeholder={inputtext}
        value={value}
        onChange={(e) => onInputChange?.(e.target.value)}
      ></input>
    </div>
  );
}

export default InputBox;