const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_api_db');

const Product = conn.define('product', {
   id: {
     primaryKey: true,
     type: UUID,
     defaultValue: UUIDV4
   },
   name: {
     type: STRING,
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

const Company = conn.define('company', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  } ,
  name: {
    type: STRING,
    allowNull: false,
    notEmpty: true,
    unique: true
  }
});

const Offering = conn.define('offering', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  } ,
  price: {
    type: DECIMAL
  }
});

//
//Company.belongsTo(Offering, {foreignKey: 'companyId'});
Product.belongsTo(Offering, {foreignKey: 'productId'});


const mapPromise = (items, model)=> {
  return Promise.all(items.map(item => model.create(item)));
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const products = [
    { name: 'bar' , suggestedPrice: 5 },
    { name: 'bazz' , suggestedPrice: 9 },
    { name: 'foo' , suggestedPrice: 3 },
    { name: 'quq' , suggestedPrice: 3 },
  ];
  const [ bar, bazz, foo, quq ] = await mapPromise(products, Product);

  const companies = [
    { name: "ACME US" },
    { name: "ACME GLOBAL" },
    { name: "ACME TRI-STATE" },
  ];
  const [ acme_us, acme_global, acme_tri_state ] = await mapPromise(companies, Company);

  const offerings = [
    { price: 2.9, productId: foo.id },
    { price: 2.8, productId: foo.id },
    { price: 4.5, productId: bar.id },
    { price: 11, productId:  bazz.id },
  ]
  const [ offer1, offer2, offer3, offer4 ] = await mapPromise(offerings, Offering);
};

module.exports ={
  syncAndSeed,
  models: {
    Product,
    Company,
    Offering
  }
};


