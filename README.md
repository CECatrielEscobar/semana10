ENDPOINTS

HOME = https://localhost:8081/

CART HOME = https://localhost:8081/cart/home (renderiza una vista, la cual tiene un boton para crear un carrito)

TRAER CARARITOS = https://localhost:8081/cart/getcart/:cid (SI PONES ID BUSCA EL CARRITO Y SI NO PONES NADA, TRAE TODOS LOS CARRITOS)

ENDPOINT PARA BUSCAR CARRITO Y AGREGAR UN PRODUCTO

 https://localhost:8081/cart/:cid?/products/:pid?



ENDPOINT PRODUCTOS

http://localhost:8081/product/products // RENDERIZA UNA VISTA


http://localhost:8081/product/addproductsform // RENDERIZA LA VISTA DE UN FORMULARIO, Y AHI MISMO CONECTA EL ENDPOINT POST = http://localhost:8081/product/addproducts
