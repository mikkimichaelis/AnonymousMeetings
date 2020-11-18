export interface LoadingServiceInterface {
    initialize();
    present(content?: string);
    dismiss();
}