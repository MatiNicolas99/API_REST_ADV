
const { obtenerInventario, inventarioHATEOAS, obtenerInventarioPorFiltros } = require("../models/appmodel");



const appGet = async (req, res) => {
    try {
        const queryString = req.query;
        console.log(queryString)
        const inventario = await obtenerInventario(queryString);
        const HATEOAS = await inventarioHATEOAS(inventario)
        res.json( HATEOAS );
      } catch (err) {
        console.error(err);
        res.send(err.message);
      }
};
const appGetFiltros = async(req, res) => {
    try {
        const queryStrings = req.query;
        console.log(queryStrings)
        const inventario = await obtenerInventarioPorFiltros(queryStrings);
        res.json(inventario);    
    } catch (error) {
        console.error(err);
        res.send(err.message);
    }
    
  };

module.exports = {
    appGet,
    appGetFiltros,
}

