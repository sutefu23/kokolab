import { OnChangeModel } from "./Form.types";

export type TextInputProps = {
    required: boolean,
    onChange: (args: OnChangeModel) => void,
    id: string,
    label: string,
    placeholder: string,
    value: string,
    type?: string,
    maxLength: number,
    inputClass?: string,
    field: string
};