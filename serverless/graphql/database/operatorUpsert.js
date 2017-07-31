const operatorGet = require('./CRUD/operatorGet');
const operatorCreate = require('./CRUD/operatorCreate');

const operatorUpsert = ({cellphone})=>{
  return operatorGet(cellphone)
      .then(operator => {
        if (operator && operator.cellphone){
          return operator;
        }
        else {
          return operatorCreate({cellphone});
        }
      })
};

module.exports = operatorUpsert;
