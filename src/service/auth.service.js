import { BaseService } from "./base.service";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

export class AuthService extends BaseService {
  async loadUser() {
    try {
      const { data } = await this.httpClient.get("/user");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async loadOrders() {
    try {
      const { data } = await this.httpClient.get("/order");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail() {
    try {
      const { data } = await this.httpClient.get("/user/email");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllImage() {
    try {
      const { data } = await this.httpClient.get("/image");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProdcuts(page, limit) {
    try {
      console.log("page === ", page);
      console.log("limit === ", limit);
      const { data } = await this.httpClient.get(
        `/product?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProdcut() {
    try {
      const { data } = await this.httpClient.get(`/product`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const { data } = await this.httpClient.get(`/product/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(id, quantity) {
    try {
      const { data } = await this.httpClient.post(
        `/cart?product=${id}&quantity=${quantity}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCart() {
    try {
      const { data } = await this.httpClient.get(`/cart`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async checkExists(userName, password) {
    try {
      const { data } = await this.httpClient.get(
        `/user/login?userName=${userName}&password=${password}`
      );
      console.log("data gui ve === ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //api la pathParam
  async checkEmail(email) {
    try {
      const { data } = await this.httpClient.get(`/user/email?email=${email}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //check username
  async checkUserName(userName) {
    try {
      const { data } = await this.httpClient.get(
        `/user/username?userName=${userName}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //create user
  async createUser(user, role) {
    try {
      const url = "http://localhost:8088/user";
      const response = await fetch(`${url}?role=${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //save Order
  async saveOrder(order) {
    try {
      const url = "http://localhost:8088/order";
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }


  //save product
  async createProduct(formData) {
    try {
      const url = "http://localhost:8088/product";
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //updateProduct 
  async updateProduct(updateProduct,id) {
    try {
      const url = `http://localhost:8088/product/${id}`;
      const response = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveOrderProduct(orderProduct, productId, orderId) {
    try {
      const url = "http://localhost:8088/orderproduct";
      const response = await fetch(
        `${url}?productId=${productId}&orderId=${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderProduct),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //getCategory
  async getAllCategories() {
    try {
      const { data } = await this.httpClient.get(`/category`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //getColor
  async getAllColors() {
    try {
      const { data } = await this.httpClient.get(`/color`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //getBrand
  async getAllBrands() {
    try {
      const { data } = await this.httpClient.get(`/brand`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //getBrand
  async getAllSizes() {
    try {
      const { data } = await this.httpClient.get(`/size`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //searchProductByName
  async searchProductByName(productName) {
    try {
      const { data } = await this.httpClient.get(`/product/search?keyword=${productName}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

   //getOrderByMonth
   async getOrderByMonth(month) {
    try {
      const { data } = await this.httpClient.get(`/order/orderbymonth?month=${month}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

     //getOrderByAllMonth
     async getOrderByAllMonth() {
      try {
        const { data } = await this.httpClient.get(`/order/orderbyallmonth`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    //getProductSell
    async sortProductByQuantitySell() {
      try {
        const { data } = await this.httpClient.get(`/product/sortingbyquantitysell`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    //getProductDesc findAllProductsOrderByPriceAsc
    async findAllProductsOrderByPriceDesc(){
      try {
        const { data } = await this.httpClient.get(`/product/sortingbypricedesc`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    async findAllProductsOrderByPriceAsc(){
      try {
        const { data } = await this.httpClient.get(`/product/sortingbyprice`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

       //getProductDesc
       async getAllDetails(){
        try {
          const { data } = await this.httpClient.get(`/importdetail`);
          return data;
        } catch (error) {
          console.log(error);
        }
      }


        //save Import
  async saveImportReceipt(importReceipt) {
    try {
      const url = "http://localhost:8088/importreceipt";
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(importReceipt),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Lỗi:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

       //save ImportDetail
       async saveImportReceiptDetail(importReceiptDetail) {
        try {
          const url = "http://localhost:8088/importdetail";
          const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(importReceiptDetail),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
          } else {
            console.error("Lỗi:", response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      }

  setToken(accessToken) {
    this.httpClient.setCustomConfigs({
      authentication: {
        token: accessToken,
      },
    });
  }
}

export const authService = new AuthService();
