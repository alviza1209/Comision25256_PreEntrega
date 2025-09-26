import chalk from 'chalk'
const args = process.argv.slice(2);
// Ignoramos los dos primeros elementos con slice
if (args[0] === "GET" && args[1] === "products") {   
    async function busquedaDatosFakeStore() {
        try {
            const respuesta = await fetch('https://fakestoreapi.com/products') 
            if (!respuesta.ok) {
                throw new Error(`HTTP error! Status: ${respuesta.status}`)
            }            
            const datos = await respuesta.json()
            //const productos = datos.map(producto => producto)
            const productos = datos.map(({ id, title, price }) => ({ id, title, price }))
            console.log('Lista Completa de Productos: ')
            /*productos.forEach(p => {
                console.log(`${p.id} | ${p.title} | ${p.price} | ${p.category}`)
                }) */
            //console.log(productos)
            console.table(productos)
            }
        catch(error)  {
                console.error("Ocurrió un error:", error)
            }
        finally {
                console.log(chalk.bgGray("Tarea Lista de Productos finalizada."))
            } }
    busquedaDatosFakeStore() 
}
else if (args[0] === 'GET' && args[1].startsWith("products/")) {
    // con startsWith valido la 
    async function busquedaProductosID() {
        try {
            // extraigo con startsWith el indice o ID que quiero buscar
            const id = args[1].split("/")[1]
            const respuesta = await fetch('https://fakestoreapi.com/products') 
            if (!respuesta.ok) {
                throw new Error(`HTTP error! Status: ${respuesta.status}`)
            }            
            const datos = await respuesta.json()
            const productoPorIDEncontrado = datos.find(producto => producto.id == id)
            if (productoPorIDEncontrado) {
                console.log(chalk.bold.blue("El Producto Encontrado con el ID ") 
                + chalk.bold.yellow(`${id}`) + chalk.bold.blue(", es: "), productoPorIDEncontrado)
                return productoPorIDEncontrado
            } else {
                console.log(`El Producto con el ID ${id} NO fué encontrado`)
            }
            }
        catch(error)  {
                console.error("Ocurrió un error:", error)
            }
        finally {
                console.log(chalk.bgGray("Tarea Búsqueda por ID finalizada."))
            } }
    busquedaProductosID()
}
else if (args[0] === 'POST' && args[1] === "products") {
    async function crearNuevoProducto() {
        const productoNuevo = {
            title: args[2] || "Producto sin Especificar",
            price: args[3] || 0,
            description: args[4] || "Pendiente por descripcion",
            image: args[5] || "http://example.com",
            category: args[6] || "Categoría por asignar"
        };
        try {
            const respuesta = await fetch('https://fakestoreapi.com/products', { 
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoNuevo)
            })
            if (!respuesta.ok) {
                throw new Error(`HTTP error! Status: ${respuesta.status}`)
            }
            const datos = await respuesta.json()
            console.log(chalk.bold.blue("Nuevo Producto con el ID ") + chalk.bold.yellow(`${datos.id}`) 
            + chalk.bold.blue(" fué creado con éxito: "), datos)
        }
        catch(error)  {
                    console.error("Ocurrió un error al crear el producto: ", error)
            }
        finally {
                    console.log(chalk.bgGray("Tarea creando el Producto finalizada."))
            } 
        } 
    crearNuevoProducto()      
} 
else if (args[0] === 'DELETE' && args[1].startsWith("products/")) {
    async function borrarProductosPorID() {
        try {
            const id = args[1].split("/")[1]
            const getRespuesta = await fetch(`https://fakestoreapi.com/products/${id}`)
            if (!getRespuesta.ok) {
                throw new Error(`Producto con el ID: ${id} NO encontrado`)
            }
            const product = await getRespuesta.json();
            console.log("Producto encontrado:", product);

            const deleteRespuesta = await fetch(`https://fakestoreapi.com/products/${id}`, { 
                method: 'DELETE'
            })
            if (!deleteRespuesta.ok) {
                throw new Error("Error al eliminar el Producto")
            }            
            const datoEliminado = await deleteRespuesta.json()
            console.log(chalk.red("El Producto con el ID ") + chalk.yellowBright(`${id}`) 
            + chalk.red(", fué ELIMINADO correctamente: "), chalk.bgBlue(datoEliminado.title))
            }
        catch(error)  {
                console.error("Ocurrió un error:", error)
            }
        finally {
                console.log(chalk.bgGray("Tarea Eliminar Producto finalizada."))
            } }
    borrarProductosPorID()
} 
else {
    console.log(chalk.bgGray('Comando no reconocido. Usa "GET products", "POST products" o "DELETE products/".'))
}


