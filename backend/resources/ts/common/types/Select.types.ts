import { OnChangeModel } from "./Form.types";

export type SelectProps = {
    required?: boolean,
    onChange: (args: OnChangeModel) => void,
    id: string,
    label: string,
    value: string,
    inputClass?: string,
    options: string[],
    field: string
};