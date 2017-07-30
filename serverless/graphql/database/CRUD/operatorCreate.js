'use strict';
const create = require('./create');
const CouponTable = require('../config').OperatorTable;
const _ = require('lodash');
const api = require('../../api');
const getOperator = require('./operatorGet');

const createOperator = (args) => {
  return getOperator(args.cellphone)
  //Check for duplication
      .then(duplicate => {
        if (duplicate && duplicate.cellphone) {
          // operator exist
          return Promise.reject(new Error("operator with same cellphone already exist"));
        }
        
        args.id = args.cellphone;
        return create(CouponTable, args);
      })
};

module.exports = createOperator;