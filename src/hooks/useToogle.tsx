import { useState } from "react";

const useToggle = (s:boolean) => {
    const [ts, setTs] = useState(s);
    type tf = () => void
    const tFunc:tf = () => {setTs(prev => !prev)}
    const res:[boolean, ()=>void]=[ts, tFunc]
    return res;
}

export default useToggle;