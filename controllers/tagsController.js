const {Tag: TagModel, Tag } = require("../models/RfidTag");

const tagsController = {
    create: async(req, res)=>{
        try {
            const tag = {
                uid: req.body.uid,
                ativo: req.body.ativo
            };
            const response = await TagModel.create(tag);
            res.status(201).json({response, msg:"Tag cadastrada!"});
        } catch (error) {
            console.log(error);
        }
    },

    readAll: async(req, res)=>{
        let results = await TagModel.find({});
        res.send(results).status(200);
    },
    
    delete: async(req, res)=>{
       try {
            const id = req.params.id;
            let results = await TagModel.deleteOne({uid: id});   
            res.send(results).status(200); 
        } catch (error) {
            console.log(error);
        }
    },

    readOne: async(req, res)=>{
       try {
           const id = req.params.id;
           let results = await TagModel.findOne({uid: id}); 
           if (results) {
                res.send(results).status(200); 
           } else {
                res.send({"msg":"Unnauthorized"}).status(401); 
           }
       } catch (error) {
           console.log(error);
       }
    },
    
    update: async (req, res) => {
        try{
            const id = req.params.id;
            let tag = await TagModel.findOne({uid: id});

            if (tag) {
                if (tag.ativo === "sim") {
                    tag.ativo = "nao";
                    await TagModel.updateOne({uid: id}, tag)
                    return res.send({"msg":"Tag desativada com sucesso!"}).status(200);
                } else if (tag.ativo === "nao") {
                    tag.ativo = "sim";
                    await TagModel.updateOne({uid: id}, tag)
                    return res.send({"msg":"Tag ativada com sucesso!"}).status(200);
                }
            } else {
                return res.send({"msg":"Tag não encontrada"}).status(404);
            }
        } catch (error) {
           console.log(error);
        }
    },

};
 
module.exports = tagsController;