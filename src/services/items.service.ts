export class ItemsService{
    private items: {title: string}[] = [];

    addItem(item: {title: string}){
        this.items.push(item);
    }

    getItems(){
        // return a new array, no duplicates
        return this.items.slice();
    }
}