const API_BASE = "/api"
const db = require("../db");

module.exports = function(app){
    app.get(`${API_BASE}/users`, (req, res)=>{
        const query = db.getUsers();
        res.json(query);
    });
    app.get(`${API_BASE}/user/age`, (req, res)=>{
        const { l, h } = req.query;
        const query = db.getUserByAgeRange(l, h);
        res.json(query);
    });
    /**
     * Especialmente con aquellas que pasen parametros
     * Cuidado con el orden de resolución de rutas
     * por el URL como esta:
     */
    app.get(`${API_BASE}/user/:id`, (req, res)=>{
        const query = db.getUserById(req.params.id);
        res.json(query);
    });
    /**
     * Este tipo de casos deben tender a estar de últimos
     * En las declaraciones de rutas.
     */  
};