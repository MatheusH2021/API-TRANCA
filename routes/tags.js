const router = require("express").Router()
const tagsController = require("../controllers/tagsController");

router.route("/tags").post((req, res)=> tagsController.create(req,res));
router.route("/tags/all").get((req, res)=> tagsController.readAll(req,res));
router.route("/tags/delete/:id").delete((req, res)=> tagsController.delete(req,res));
router.route("/tags/:id").get((req, res)=> tagsController.readOne(req,res));
router.route("/tags/edit/:id").put((req, res)=> tagsController.update(req,res));

module.exports = router;