export interface Product {
    id: number;
    name: string;
    description?: string;
    price?: GLfloat;
    isFavorite?: boolean;
    releaseDate?: Date;
    imageUrl?: string;
}

export class DefaultProduct implements Product {
    id: number = 0;
    name: string = 'Default Name';
    description?: string = 'Default Description';
    price: GLfloat = 0;
    isFavorite?: boolean = false;
    releaseDate?: Date = new Date();

    constructor(init?: Partial<DefaultProduct>) {
        Object.assign(this, init);
    }
}
