interface Props
extends React.SelectHTMLAttributes<HTMLSelectElement>{}

export default function Select({
    className="",
    children,
    ...props
}:Props){

    return(

        <select

            {...props}

            className={`border rounded-lg px-3 py-2 ${className}`}

        >

            {children}

        </select>

    )

}