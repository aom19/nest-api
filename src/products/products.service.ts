import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
   private products : Product[] = [];

    insertProduct(
        title: string,
        desc: string,
        price: number
    ):string {
        const prodId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() : Product[] {
        return [...this.products];
    }

    getSingleProduct(productId: string) : Product {
        const product = this.findProduct(productId)[0];
        if(!product) {
            throw new NotFoundException('Could not find product');
        }
        return {...product};

    }
    
    updateProduct(
        productId: string,
        title: string,
        desc: string,
        price: number
    ) {
       const [product, index] = this.findProduct(productId)
         const updatedProduct = {...product};
       if(title) {
        updatedProduct.title = title;
       }
         if(desc) {
            updatedProduct.description = desc;
         }
            if(price) {
                updatedProduct.price = price;
            }
            this.products[index] = updatedProduct;
    }
    
    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

     
    


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException('Could not find product');
        }
        return  [product,productIndex];
    }

}