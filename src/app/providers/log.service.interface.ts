export interface LogServiceInterface {
    trace(msg: string, flush?: boolean, ...args: any[]);
    log(msg: string, flush?: boolean, ...args: any[]);
    alert(msg: string, flush?: boolean, ...args: any[]);
    error(msg: string, flush?: boolean, ...args: any[]);
    fatal(msg: string, flush?: boolean, ...args: any[]);
    flush();
}