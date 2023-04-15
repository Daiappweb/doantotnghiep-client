import { BaseService } from './base.service';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

export class AuthService extends BaseService {
  
  async loadUser() {
    try{
      const { data } = await this.httpClient.get('/user');
      return data;
    }catch(error){
      console.log(error);
    }
    
  }
  
  async findEmail(){
    try{
      const { data } = await this.httpClient.get('/user/email');
      return data;
    }catch(error){
      console.log(error);
    }
  }

  async getAllImage(){
    try{
      const { data } = await this.httpClient.get('/image');
      return data;
    }catch(error){
      console.log(error);
    }
  }

  async getAllProdcuts(page,limit){
    try{
      const {data} = await this.httpClient.get(`/product?page=${page}&limit=${limit}`);
      return data;
    }catch(error){
      console.log(error);
    }
  }

  async getProductById(id){
    try{
      const {data} = await this.httpClient.get(`/product/${id}`);
      return data;
    }catch(error){
      console.log(error);
    }
  }

  async addToCart(id,quantity){
    try{
      const {data} = await this.httpClient.post(`/cart?product=${id}&quantity=${quantity}`);
      return data;
    }catch(error){
      console.log(error);
    }
  }

  async getCart(){
    try{
      const {data} = await this.httpClient.get(`/cart`);
      return data;
    }catch(error){
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
