//para que js sepa que tipo es res
const { response, request } = require("express");

const getUsuarios = (req = request, res = response) => {
  const query = req.query;
  //generalmente se manda un objeto
  res.status(200).json({ msg: "get World - Controlador", query });
};

const putUsuarios = (req, res = response) => {
  const id = req.params.id;

  //generalmente se manda un objeto
  res.status(200).json({ msg: "put World - Controlador", id });
};

const postUsuarios = (req, res = response) => {
  //generalmente se manda un objeto
  const { nombre, edad } = req.body;

  res
    .status(200)
    .json({ msg: "post World - controlador", body: { nombre, edad } });
};

const deleteUsuarios = (req, res = response) => {
  //generalmente se manda un objeto
  res.status(403).json({ msg: "delete World - controlador" });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
};
