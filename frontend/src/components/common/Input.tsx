interface Props
extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input({
    className="",
    ...props
}:Props){

    return(

        <input

            {...props}

            className={`border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500 ${className}`}

        />

    )

}