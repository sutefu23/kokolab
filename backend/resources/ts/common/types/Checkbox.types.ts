import { OnChangeModel } from "./Form.types";

export type CheckboxProps = {
    required?: boolean,
    onChange: (args: OnChangeModel) => void,
    id: string,
    label: string,
    value: boolean,
    inputClass?: string,
    field: string
};

export type OnChangeCheckboxModel = {
    value: boolean,
    error: string,
    touched: boolean
};