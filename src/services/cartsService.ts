import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/carts" || "";

export async function addProductToCart(productId: number) {
    let productsArr: number[] = [];
    let cartId: number = 0;
    let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
    ).userId;

    try {
    let res = await axios.get(`${api}?userId=${userId}`);
    productsArr = res.data[0].products;
    cartId = res.data[0].id;
    productsArr.push(productId);
    return axios.patch(`${api}/${cartId}`, { products: productsArr });
    } catch (error) {
    console.log(error);
    }
}

export function createCart(userId: number) {
    return axios.post(api, { userId, products: [], active: true });
}


export async function getProductsInCart() {
    try {

    let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
    ).userId;


    let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
    );
    let productsIds: number[] = cartRes.data[0].products;


    const promiseArr = await Promise.all(
        productsIds.map((id) =>
        axios.get(`${process.env.REACT_APP_API}/products/${id}`)
        )
    );


    let products: Product[] = promiseArr.map((res) => res.data);
    console.log(products);

    return products;
    } catch (error) {
    console.log(error);
    throw error;
    }
}
