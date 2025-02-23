import { CiSearch } from "react-icons/ci";
import { useRef, useState } from "react";


interface SearchBtn{
    activateSearchFn: (value: string)=>void;
}


export default function SearchBar({activateSearchFn} : SearchBtn) {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>();

    function handleBtnSearch(){
        if (isInputVisible) {
            activateSearchFn(search);
            setIsInputVisible(false)
        }
        else{
            setIsInputVisible(true);
            if (inputRef.current){
                inputRef.current.focus();
            }
        }
    }
    
    function handleBlurInputField(){
        if (!search){
            setIsInputVisible(false);
        }
    }

    function handleSumbit(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === "Enter"){
            handleBtnSearch();
        }
    }

    return(
        <div className={`flex rounded-lg px-3 py-1 items-center ${isInputVisible ? " bg-white" : ""}`}>
        <input 
           ref={inputRef}
           type="text"
           onBlur={handleBlurInputField}
           onKeyDown={handleSumbit}
           placeholder="Search for books..."
           className={`px-3 py-1 border-0 outline-0 flex-grow  ${isInputVisible ? "w-48 opacity-100" : "w-0 opacity-0"}`} 
           onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{ setSearch(e.target.value); }}
        />
        <CiSearch size={30} className="nav-icon cursor-pointer" onClick={handleBtnSearch} />
    </div>
    )
}