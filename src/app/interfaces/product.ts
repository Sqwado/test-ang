export interface Product {
    id: number;
    name: string;
    description?: string;
    price?: GLfloat;
    isFavorite?: boolean;
    releaseDate?: Date;
    imageUrl?: string;
    class?: string;
    evolution?: number;
}

export class DefaultProduct implements Product {
    id: number = 0;
    name: string = 'Default Name';
    description?: string = 'Default Description';
    price: GLfloat = 0;
    isFavorite?: boolean = false;
    releaseDate?: Date = new Date();
    imageUrl?: string = 'https://picsum.photos/1000/600';

    constructor(init?: Partial<DefaultProduct>) {
        Object.assign(this, init);
    }
}
