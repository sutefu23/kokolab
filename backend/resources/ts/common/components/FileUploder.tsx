import React, { useState, ChangeEvent } from "react";

export type FileUploaderProps = {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    id: string,
    label: string,
    inputClass?: string,
    className?:string,
    error?: string
};

function FileUploader(props: FileUploaderProps): JSX.Element {

    
    function onFileChanged(event: ChangeEvent<HTMLInputElement>): void {
        props.onFileChange(event)
    }

    return (
        <div className={props.className}>
            <label htmlFor={props.id.toString()}>{props.label}</label>
            <input
                type='file'
                onChange={onFileChanged}
                className={`form-control ${props.inputClass??""}`}
                id={`id_${props.label}`} />
            {props.error ?
                <div className="invalid-feedback">
                    {props.error}
                </div> : null
            }
        </div>
    );
}

export default FileUploader;