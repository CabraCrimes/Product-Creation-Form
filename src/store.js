import { makeAutoObservable } from "mobx";

class Product {
  title = "";
  price = "";
  stockQuantity = "";
  description = "";

  constructor() {
    makeAutoObservable(this);
  }

  setTitle(title) {
    this.title = title;
  }

  setPrice(price) {
    this.price = price;
  }

  setStockQuantity(stockQuantity) {
    this.stockQuantity = stockQuantity;
  }

  setDescription(description) {
    this.description = description;
  }

  async submitForm() {
    try {
      const response = {
        body: JSON.stringify({
          title: this.title,
          price: this.price,
          stockQuantity: this.stockQuantity,
          description: this.description,
        }),
      };
      // const response = await fetch('https://api.example.com/products', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //         title: this.title,
      //         price: this.price,
      //         stockQuantity: this.stockQuantity,
      //         description: this.description
      //     })
      // })
      console.log(response);
      // if(!response.ok){
      //     console.error('Failed to create product');
      // }
      return "Product created successfully!";
    } catch (err) {
      console.error(err);
      return "Failed to create product.";
    }
  }
}

const product = new Product();

export default product;
