export type TextInputProps = {
    required: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    id: string,
    label: string,
    placeholder: string,
    value: string,
    type?: string,
    maxLength: number,
    inputClass?: string,
    field: string
};