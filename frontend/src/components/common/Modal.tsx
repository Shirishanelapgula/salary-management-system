import type { ReactNode } from "react";

interface Props{

    open:boolean;

    title:string;

    children:ReactNode;

    onClose():void;

}

export default function Modal({

    open,

    title,

    children,

    onClose

}:Props){

    if(!open) return null;

    return(

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-[550px]">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                    >
                        ✕

                    </button>

                </div>

                {children}

            </div>

        </div>

    )

}