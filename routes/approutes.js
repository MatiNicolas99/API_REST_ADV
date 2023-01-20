
const { Router } = require('express');
const router = Router();

const { 
    appGet, appGetFiltros
} = require('../controllers/appcontroller');



router.get("/", appGet);
router.get("/filtros", appGetFiltros);

module.exports = router;