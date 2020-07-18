var mongoose = require('mongoose');
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Carole:azerty@cluster0-jvacm.azure.mongodb.net/bikeshop3?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

   var productSchema = mongoose.Schema({
    name: String,
    urlImage: String,
    price: Number,
    qteProduit: Number,
    stock: Number
   });

   var commandeSchema = mongoose.Schema({
    IDClient: String,
    dateCde: Date,
    qteProduit: Number,
    products: [productSchema],
    fdP: Number,
    adresseExpedition: String,
    CPExpedition: String,
    villeExpedition: String    
   });
   var ProductModel = mongoose.model('products', productSchema);
   var commandeModel = mongoose.model('commande', commandeSchema);

   module.exports = {ProductModel,commandeModel};