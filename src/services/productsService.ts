import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/products" || "";


export function getProducts() {
    return axios.get(api);
}

export function getProductById(id: number) {
    return axios.get(`${api}/${id}`);
}


export function addProduct(productToAdd: Product) {
    return axios.post(api, productToAdd);
}


export function updateProduct(newProduct: Product) {
    return axios.put(`${api}/${newProduct.id}`, newProduct);
}


export function deleteProduct(id: number) {
    return axios.delete(`${api}/${id}`);
}
