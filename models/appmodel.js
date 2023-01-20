const pool = require("../config/appconfig");
const format = require("pg-format");

const inventarioHATEOAS = async (inventario) => {
    
    const results = inventario.map((m) => {
        
    return {
    name: m.nombre,
    href: `/joyas/inventario/${m.id}`,
    }
    }).slice(0, 4)
    const totalJoyas = inventario.length;
    let stockTotal = inventario.map(m => m.precio).reduce((prev, curr) =>prev + curr, 0);
    const HATEOAS = {
    totalJoyas,
    stockTotal,
    results
    };

    return HATEOAS
    };


const obtenerInventario = async ({
  limits = 6,
  order_by = "id_ASC",
  page = 1,
}) => {
  
  if (page <= 0) {
    throw new Error("El número de pagina debe ser superior o igual a 1");
  };
    const [campo, direccion] = order_by.split("_");
    let offset = (page - 1) * limits;

    const consulta = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      limits,
      offset
    );

    const { rows: inventario } = await pool.query(consulta);
    console.log(inventario)
    return inventario;
};


const obtenerInventarioPorFiltros = async ({precio_min, precio_max, categoria, metal}) => {
    let filtros = [];
    const values = [];
    
    const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;

    filtros.push(`${campo} ${comparador} $${length + 1}`)
    console.log(filtros)
};
    if (precio_max) agregarFiltro('precio', '<=', precio_max);
    if (precio_min) agregarFiltro('precio', '>=', precio_min);
    if (categoria) agregarFiltro('categoria', '=', categoria);
    if (metal) agregarFiltro('metal', '=', metal);

    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0) {
    filtros = filtros.join(" AND ")
    consulta += ` WHERE ${filtros}`
    }
    const { rows: inventario } = await pool.query(consulta, values)
    return inventario
    }

module.exports = {
    obtenerInventario,
    inventarioHATEOAS,
    obtenerInventarioPorFiltros

};
