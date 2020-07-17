var express = require('express');
var router = express.Router();
var data= require('./bdd');
const { PaymentRequired } = require('http-errors');

/* GET home page. Affichage vélo depuis la BDD */
router.get('/', async function(req, res, next) {
  var productCatalog = await data.ProductModel.find()
  res.render('index', { productCatalog});
});

var articleCde = [];
router.get('/cart', function(req, res, next) {
  articleCde.push({name: req.query.name, urlImage: req.query.urlImage, price: req.query.price, qteProduit: 1 })
  res.render('cart', { articleCde});
});

 /* Suppression d'un article du panier */
router.get('/delete-cart', function(req, res, next){
  
  articleCde.splice(req.query.position,1)

  res.render('cart',{articleCde: articleCde})
})
/* Màj du panier */
router.post('/update-cart', function(req, res, next){
  
  var position = req.body.position;
  var newQuantity = req.body.qteProduit;

  articleCde[position].qteProduit = newQuantity;

  res.render('cart',{articleCde:articleCde})
})

/* Formulaire ajout nouveaux produits*/
router.get('/newProduct', function(req, res, next){
  
    res.render('newProduct',{ title: "Nouveaux Produits" }) 
});

router.post('/newProduct', async function(req, res, next){

  var newProduct = new data.ProductModel ({
    name: req.body.name,
    urlImage: req.body.urlImage,
    price: req.body.price,
    stock: 3
  });
  var product = await newProduct.save();

  res.render('newProduct',{ title: "Nouveaux Produits" , name: req.body.name, urlImage:req.body.urlImage, price: req.body.price, stock: 3 })
})
// Nouvelle commande

router.get('/commande', async function(req, res, next) {
var newCommande = new data.ProductModel ({
    qteProduit: req.query.qteProduit,
    products: [{name: req.query.name, urlImage: req.query.urlImage, price: req.query.price}]
  });

var Commande = await newCommande.save();

  
  res.render('cart', {qteProduit: req.query.qteProduit, products:[{name: req.query.name, urlImage: req.query.urlImage, price: req.query.price}]});
});
//var totalCmd = await data.commandeModel.find();
module.exports = router;
