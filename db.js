const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, DECIMAL} = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_api_db');

const Product = conn.define('product', {
   id: {
     primaryKey: true,
     type: Sequelize.UUID,
     defaultValue: Sequelize.UUIDV4
   },
   name: {
     type: Sequelize.STRING,
     allowNull: false,
     notEmpty: true,
     unique: true
   },
   suggestedPrice: {
     type: DECIMAL,
     allowNull: false,
     notEmpty: true
   }
});

// const Company = conn.define('company', {
//   id: {
//     primaryKey: true,
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4
//   } ,
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     notEmpty: true,
//     unique: true
//   }
// });

const mapPromise = (items, model)=> {
  return Promise.all(items.map(item => model.create(item)));
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const products = [
    {name: 'bar' , suggestedPrice: 5 },
    {name: 'bazz' , suggestedPrice: 9 },
    {name: 'foo' , suggestedPrice: 3 },
    {name: 'quq' , suggestedPrice: 3 }
  ];
  const [bar, bazz, foo, quq] = await mapPromise(products, Product);
};

module.exports ={
  syncAndSeed,
  models: {
    Product
  }
};


