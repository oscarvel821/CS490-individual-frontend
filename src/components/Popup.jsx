import React from "react";
import {AiOutlineClose} from 'react-icons/ai'

const Popup = (props) => {
    return (props.trigger) ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000033] flex justify-center items-center">
            <div className="relative w-full max-w-[920px] border border-gray-100 bg-[#FAF9F6] shadow-md p-8 rounded">
                <div className='absolute top-2 right-2 hover:cursor-pointer' onClick={props.closePopup}>
                    <AiOutlineClose size={25}/>
                </div>
                {props.content}
            </div>
        </div>
    ) : <></>
}

export default Popup;