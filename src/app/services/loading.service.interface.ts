export interface ILoadingService {
    initialize();
    present(content?: string);
    dismiss();
}