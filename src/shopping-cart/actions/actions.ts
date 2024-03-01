//'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"




export const getCookieCart = (): { [id: string]: number } => {

    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }
    return {}
}

export const addProductCart = (id: string) => {
    const cookieCart = getCookieCart();
    // checa que exista ese id como key en el atributo 
    //{ [id] : num} de la función getCookieCart() 
    if (cookieCart[id]) {
        cookieCart[id] = cookieCart[id] + 1;
        console.log('add+1');


    } else {
        cookieCart[id] = 1;
    }


    setCookie('cart', JSON.stringify(cookieCart));

}


export const RemoveProductFromCart = (id: string) => {
    const cookieCart = getCookieCart();

    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) =>{
    const cookieCart = getCookieCart();

    if(!cookieCart[id]) return
    
     const quality = cookieCart[id];
     if(quality > 1){
         cookieCart[id] = quality -1 ;
     }else{
        delete cookieCart[id];
     }
    setCookie('cart', JSON.stringify(cookieCart))
}