/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Application',
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
    notVerified:'you email not verified',
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    failedToSave:{
      message: 'Failed to save data',
    }
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  entities: {
    company: {
      errors: {
        unique: {},
      },
    },
    year: {
      errors: {
        unique: {},
      },
    },
    balanceSheet: {
      errors: {
        unique: {},
      },
    },
    group: {
      errors: {
        unique: {},
      },
    },
    subGroup: {
      errors: {
        unique: {},
        identifierExists: 'Identifier already exists',
      },
    },
     subPackingType: {
      errors: {
        unique: {},
      },
    },
    openingYear: {
      errors: {
        unique: {},
      },
    },
    expenseAccount: {
      errors: {
        unique: {},
      },
    },
    item: {
      errors: {
        unique: {},
      },
    },
    itemQuality: {
      errors: {
        unique: {},
      },
    },
    size: {
      errors: {
        unique: {},
      },
    },
    packing: {
      errors: {
        unique: {},
      },
    },
    individualExpense: {
      errors: {
        unique: {},
      },
    },
    expensesForBill: {
      errors: {
        unique: {},
      },
    },
    expensesForTransaction: {
      errors: {
        unique: {},
      },
    },
    goodsType: {
      errors: {
        unique: {},
      },
    },
    goodsArrival: {
      errors: {
        unique: {},
      },
    },
    goodsSales: {
      errors: {
        unique: {},
        quntityLessThan:'Quantity should be less than quntity left',
        qualityQuantityLessThan:'Quality quantity should be less than quality left',
        subPackingTypeQuantityLessThan:'Sub packing type quantity should be less than sub packing type left',
        invalidQuality: 'Invalid quality',
        invalidSubPackingType: 'Invalid sub packing type',
        buyerLimitExceed: 'Buyer limit exceeded',
        goodsSalesNotFound:"Goods sales not found ",
        goodsArrivalNotFound:"Goods arrival not found ",
        lotNumberMismatch: 'Lot number mismatch',
      },
    },
    subPartyGoodsArrival: {
      errors: {
        unique: {},
      },
    },
    masterSelection: {
      errors: {
        unique: {},
      },
    },
    voucherEntry: {
      errors: {
        unique: {},
      },
    },
    coldStorage: {
      errors: {
        unique: {},
      },
    },
  },
};

export default en;
