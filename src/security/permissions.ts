/// File is generated from https://studio.fabbuilder.com -

import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.owner,roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.owner, roles.admin,],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner,],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },

      companyImport: {
        id: 'companyImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      companyCreate: {
        id: 'companyCreate',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      companyEdit: {
        id: 'companyEdit',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      companyDestroy: {
        id: 'companyDestroy',
        allowedRoles: [roles.owner],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      companyRead: {
        id: 'companyRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      companyAutocomplete: {
        id: 'companyAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      yearImport: {
        id: 'yearImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      yearCreate: {
        id: 'yearCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      yearEdit: {
        id: 'yearEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      yearDestroy: {
        id: 'yearDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      yearRead: {
        id: 'yearRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      yearAutocomplete: {
        id: 'yearAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      balanceSheetImport: {
        id: 'balanceSheetImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      balanceSheetCreate: {
        id: 'balanceSheetCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      balanceSheetEdit: {
        id: 'balanceSheetEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      balanceSheetDestroy: {
        id: 'balanceSheetDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      balanceSheetRead: {
        id: 'balanceSheetRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      balanceSheetAutocomplete: {
        id: 'balanceSheetAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      groupImport: {
        id: 'groupImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      groupCreate: {
        id: 'groupCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      groupEdit: {
        id: 'groupEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      groupDestroy: {
        id: 'groupDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      groupRead: {
        id: 'groupRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      groupAutocomplete: {
        id: 'groupAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      subGroupImport: {
        id: 'subGroupImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subGroupCreate: {
        id: 'subGroupCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subGroupEdit: {
        id: 'subGroupEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subGroupDestroy: {
        id: 'subGroupDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subGroupRead: {
        id: 'subGroupRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subGroupAutocomplete: {
        id: 'subGroupAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      openingYearImport: {
        id: 'openingYearImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openingYearCreate: {
        id: 'openingYearCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      openingYearEdit: {
        id: 'openingYearEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      openingYearDestroy: {
        id: 'openingYearDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      openingYearRead: {
        id: 'openingYearRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openingYearAutocomplete: {
        id: 'openingYearAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      expenseAccountImport: {
        id: 'expenseAccountImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expenseAccountCreate: {
        id: 'expenseAccountCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expenseAccountEdit: {
        id: 'expenseAccountEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expenseAccountDestroy: {
        id: 'expenseAccountDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expenseAccountRead: {
        id: 'expenseAccountRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expenseAccountAutocomplete: {
        id: 'expenseAccountAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      itemImport: {
        id: 'itemImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      itemCreate: {
        id: 'itemCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemEdit: {
        id: 'itemEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemDestroy: {
        id: 'itemDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemRead: {
        id: 'itemRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      itemAutocomplete: {
        id: 'itemAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      itemQualityImport: {
        id: 'itemQualityImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      itemQualityCreate: {
        id: 'itemQualityCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemQualityEdit: {
        id: 'itemQualityEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemQualityDestroy: {
        id: 'itemQualityDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      itemQualityRead: {
        id: 'itemQualityRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      itemQualityAutocomplete: {
        id: 'itemQualityAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      sizeImport: {
        id: 'sizeImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      sizeCreate: {
        id: 'sizeCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      sizeEdit: {
        id: 'sizeEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      sizeDestroy: {
        id: 'sizeDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      sizeRead: {
        id: 'sizeRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      sizeAutocomplete: {
        id: 'sizeAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
       subPackingTypeImport: {
        id: 'subPackingTypeImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subPackingTypeCreate: {
        id: 'subPackingTypeCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPackingTypeEdit: {
        id: 'subPackingTypeEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPackingTypeDestroy: {
        id: 'subPackingTypeDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPackingTypeRead: {
        id: 'subPackingTypeRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subPackingTypeAutocomplete: {
        id: 'subPackingTypeAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      packingImport: {
        id: 'packingImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      packingCreate: {
        id: 'packingCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      packingEdit: {
        id: 'packingEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      packingDestroy: {
        id: 'packingDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      packingRead: {
        id: 'packingRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      packingAutocomplete: {
        id: 'packingAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      individualExpenseImport: {
        id: 'individualExpenseImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      individualExpenseCreate: {
        id: 'individualExpenseCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      individualExpenseEdit: {
        id: 'individualExpenseEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      individualExpenseDestroy: {
        id: 'individualExpenseDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      individualExpenseRead: {
        id: 'individualExpenseRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      individualExpenseAutocomplete: {
        id: 'individualExpenseAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      expensesForBillImport: {
        id: 'expensesForBillImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expensesForBillCreate: {
        id: 'expensesForBillCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForBillEdit: {
        id: 'expensesForBillEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForBillDestroy: {
        id: 'expensesForBillDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForBillRead: {
        id: 'expensesForBillRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expensesForBillAutocomplete: {
        id: 'expensesForBillAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      expensesForTransactionImport: {
        id: 'expensesForTransactionImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expensesForTransactionCreate: {
        id: 'expensesForTransactionCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForTransactionEdit: {
        id: 'expensesForTransactionEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForTransactionDestroy: {
        id: 'expensesForTransactionDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      expensesForTransactionRead: {
        id: 'expensesForTransactionRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expensesForTransactionAutocomplete: {
        id: 'expensesForTransactionAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      goodsTypeImport: {
        id: 'goodsTypeImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsTypeCreate: {
        id: 'goodsTypeCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsTypeEdit: {
        id: 'goodsTypeEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsTypeDestroy: {
        id: 'goodsTypeDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsTypeRead: {
        id: 'goodsTypeRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsTypeAutocomplete: {
        id: 'goodsTypeAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      goodsArrivalImport: {
        id: 'goodsArrivalImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsArrivalCreate: {
        id: 'goodsArrivalCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsArrivalEdit: {
        id: 'goodsArrivalEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsArrivalDestroy: {
        id: 'goodsArrivalDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsArrivalRead: {
        id: 'goodsArrivalRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsArrivalAutocomplete: {
        id: 'goodsArrivalAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      goodsSalesImport: {
        id: 'goodsSalesImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsSalesCreate: {
        id: 'goodsSalesCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsSalesEdit: {
        id: 'goodsSalesEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsSalesDestroy: {
        id: 'goodsSalesDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      goodsSalesRead: {
        id: 'goodsSalesRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      goodsSalesAutocomplete: {
        id: 'goodsSalesAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      subPartyGoodsArrivalImport: {
        id: 'subPartyGoodsArrivalImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subPartyGoodsArrivalCreate: {
        id: 'subPartyGoodsArrivalCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPartyGoodsArrivalEdit: {
        id: 'subPartyGoodsArrivalEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPartyGoodsArrivalDestroy: {
        id: 'subPartyGoodsArrivalDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subPartyGoodsArrivalRead: {
        id: 'subPartyGoodsArrivalRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subPartyGoodsArrivalAutocomplete: {
        id: 'subPartyGoodsArrivalAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      masterSelectionImport: {
        id: 'masterSelectionImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      masterSelectionCreate: {
        id: 'masterSelectionCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      masterSelectionEdit: {
        id: 'masterSelectionEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      masterSelectionDestroy: {
        id: 'masterSelectionDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      masterSelectionRead: {
        id: 'masterSelectionRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      masterSelectionAutocomplete: {
        id: 'masterSelectionAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      
      voucherEntryImport: {
        id: 'voucherEntryImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      voucherEntryCreate: {
        id: 'voucherEntryCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      voucherEntryEdit: {
        id: 'voucherEntryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      voucherEntryDestroy: {
        id: 'voucherEntryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      voucherEntryRead: {
        id: 'voucherEntryRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      voucherEntryAutocomplete: {
        id: 'voucherEntryAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      coldStorageImport: {
        id: 'coldStorageImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      coldStorageCreate: {
        id: 'coldStorageCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      coldStorageEdit: {
        id: 'coldStorageEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      coldStorageDestroy: {
        id: 'coldStorageDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      coldStorageRead: {
        id: 'coldStorageRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      coldStorageAutocomplete: {
        id: 'coldStorageAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
/// File is generated from https://studio.fabbuilder.com -
