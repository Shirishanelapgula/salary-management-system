interface Props {

    value: string;

    onChange(
        value: string
    ): void;

}


export default function EmployeeSearch(
    {
        value,
        onChange

    }: Props) {

    return (

        <input

            value={value}

            onChange={
                e =>
                    onChange(
                        e.target.value
                    )
            }

            placeholder="Search employee..."

            className="
      border
      rounded-lg
      px-4
      py-2
      w-full
      "

        />

    );

}