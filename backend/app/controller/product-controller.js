const pro_model = require('../modal/Productmodel');

module.exports =

{
    create: function (req, res) {
        pro_model.create(req.body).then
            (result => {
                res.send("record found" + result)
            }).catch(err => {
                res.send("record not found in create api" + err)
            })
    },
    // getAll:function(req,res){
    //     pro_model.find().then(results=>{
    //         res.send("record found!!!",results)
    //     }).catch(err=>{
    //         res.send("something went wrong!!!"+err)
    //     })
    // },
    getAll: function (req, res) {
        pro_model.find()
            .then(results => {
                res.json(results);
            })
            .catch(err => {
                res.send("something went wrong!!!" + err)
            })
    },


    // getsingle:function(req,res){
    //     pro_model.findById(req.param.studId).then(result=>{
    //         res.send(result)
    //     }).catch(err=>{
    //         res.send("something went wrong!!!"+err)
    //     })
    // },
    getsingle: function (req, res) {
        const productId = req.params.productId;

        pro_model.findById(productId)
            .then(result => {
                if (!result) {
                    return res.status(404).send("Product not found");
                }
                res.status(200).send(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Something went wrong: " + err);
            });
    },


//     update: function (req, res) {
//     pro_model.findByIdAndUpdate(req.params.productId, req.body, { new: true })
//         .then(result => {
//             if (!result) {
//                 return res.status(404).send("Product not found");
//             }
//             res.send(result);
//         })
//         .catch(err => {
//             res.status(500).send("Oops, something went wrong: " + err);
//         });
// }

update: function (req, res) {
    const productId = req.params.productId;
    const mongoose = require('mongoose');

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send("Invalid product ID");
    }

    console.log("Product ID:", productId);
    console.log("Request body:", req.body);

    pro_model.findByIdAndUpdate(productId, req.body, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send("Product not found");
            }
            res.send({ message: "Update successful", data: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something went wrong: " + err);
        });
}

,




    // deletestudent:function(req,res){
    //     pro_model.findOneAndDelete
    //     (req.params.studId).then(result=>{
    //         res.send("record found!!",result)
    //     }).catch(err=>{
    //         res.send("not found del std"+err)
    //     })
    // }


    delete: function (req, res) {
    const productId = req.params.proId;

    pro_model.findOneAndDelete({ _id: productId })
        .then(result => {
            if (!result) {
                return res.status(404).send("Product not found to delete");
            }
            res.status(200).send("Product deleted successfully");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error deleting product: " + err);
        });

}












}