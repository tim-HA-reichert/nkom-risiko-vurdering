interface RadioOptionProps {
    label: string;
    value: number;
    id: string;
    buttonGroupName: string;
    onChange: (value: number) => void;
    checked: boolean;
}

export default function RadioOption({
                                        label,
                                        value,
                                        checked,
                                        id,
                                        buttonGroupName,
                                        onChange,
                                    }: Readonly<RadioOptionProps>) {
    return (

        <label htmlFor={id} className='border-[0.5px] p-2 rounded-lg
         dark:border-amber-50 border-gray-400 flex-row items-center gap-2 hover: cursor-pointer
         leading-none flex hover:bg-gray-300 hover:text-black focus:outline-none'>
            <input
                type="radio"
                name={buttonGroupName}
                value={value}
                checked={checked}
                id={id}
                onChange={() => onChange(value)}
            />
            {label}
        </label>
    );
}
