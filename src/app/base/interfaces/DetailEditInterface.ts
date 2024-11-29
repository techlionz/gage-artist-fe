export declare interface DetailEditInterface {
    /**
     * The edit form load method
     */
    loadEditForm(data: any):void;
    /**
     * The edit form submit action method
     */
    onSubmitEdit():void;

    /**
     * The refresh action needed after edit.
     */
    onRefreshList(): void;
}