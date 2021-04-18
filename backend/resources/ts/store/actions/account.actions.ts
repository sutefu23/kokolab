export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function login(email: string): ILogInActionType {
    return { type: LOG_IN, email: email };
}

export function logout(): ILogOutActionType {
    return { type: LOG_OUT};
}

export interface ILogInActionType { type: string, email: string };
export interface ILogOutActionType { type: string };
