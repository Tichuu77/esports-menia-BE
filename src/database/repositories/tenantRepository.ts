import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import Tenant from '../models/tenant';
import Settings from '../models/settings';
import Error404 from '../../errors/Error404';
import Company from '../models/company';
import Year from '../models/year';
import BalanceSheet from '../models/balanceSheet';
import Group from '../models/group';
import SubGroup from '../models/subGroup';
import OpeningYear from '../models/openingYear';
import ExpenseAccount from '../models/expenseAccount';
import Item from '../models/item';
import ItemQuality from '../models/itemQuality';
import Size from '../models/size';
import Packing from '../models/packing';
import IndividualExpense from '../models/individualExpense';
import ExpensesForBill from '../models/expensesForBill';
import ExpensesForTransaction from '../models/expensesForTransaction';
import GoodsType from '../models/goodsType';
import GoodsArrival from '../models/goodsArrival';
import GoodsSales from '../models/goodsSales';
import SubPartyGoodsArrival from '../models/subPartyGoodsArrival';
import MasterSelection from '../models/masterSelection';
import VoucherEntry from '../models/voucherEntry';
import ColdStorage from '../models/coldStorage';
import Error400 from '../../errors/Error400';
import { v4 as uuid } from 'uuid';
import { isUserInTenant } from '../utils/userTenantUtils';
import SettingsRepository from './settingsRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

const forbiddenTenantUrls = ['www'];

class TenantRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    // URL is required,
    // in case of multi tenant without subdomain
    // set a random uuid
    data.url = data.url || uuid();

    const existsUrl = Boolean(
      await this.count({ url: data.url }, options),
    );

    if (
      forbiddenTenantUrls.includes(data.url) ||
      existsUrl
    ) {
      throw new Error400(
        options.language,
        'tenant.url.exists',
      );
    }

    const [record] = await Tenant(options.database).create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      {
        ...options,
        currentTenant: record,
      },
    );

    return this.findById(record.id, {
      ...options,
    });
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    if (!isUserInTenant(currentUser, id)) {
      throw new Error404();
    }

    const record = await this.findById(id, options);

    // When not multi-with-subdomain, the
    // from passes the URL as undefined.
    // This way it's ensured that the URL will
    // remain the old one
    data.url = data.url || record.url;

    const existsUrl = Boolean(
      await this.count(
        { url: data.url, _id: { $ne: id } },
        options,
      ),
    );

    if (
      forbiddenTenantUrls.includes(data.url) ||
      existsUrl
    ) {
      throw new Error400(
        options.language,
        'tenant.url.exists',
      );
    }

    // Does not allow user to update the plan
    // only by updating the tenant
    delete data.plan;
    delete data.planStripeCustomerId;
    delete data.planUserId;
    delete data.planStatus;

    await Tenant(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  /**
   * Updates the Tenant Plan user.
   */
  static async updatePlanUser(
    id,
    planStripeCustomerId,
    planUserId,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data = {
      planStripeCustomerId,
      planUserId,
      updatedBy: currentUser.id,
    };

    await Tenant(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  static async updatePlanStatus(
    planStripeCustomerId,
    plan,
    planStatus,
    options: IRepositoryOptions,
  ) {
    const data = {
      plan,
      planStatus,
      updatedBy: null,
    };

    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tenant(options.database).findOne({
          planStripeCustomerId,
        }),
        options,
      );

    await Tenant(options.database).updateOne(
      { _id: record.id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record.id,
      data,
      options,
    );

    return await this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    if (!isUserInTenant(currentUser, id)) {
      throw new Error404();
    }

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tenant(options.database).findById(id),
        options,
      );

    await Tenant(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await Company(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Year(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await BalanceSheet(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Group(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await SubGroup(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await OpeningYear(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await ExpenseAccount(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Item(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await ItemQuality(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Size(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Packing(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await IndividualExpense(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await ExpensesForBill(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await ExpensesForTransaction(
      options.database,
    ).deleteMany({ tenant: id }, options);
    await GoodsType(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await GoodsArrival(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await GoodsSales(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await SubPartyGoodsArrival(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await MasterSelection(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await VoucherEntry(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await ColdStorage(options.database).deleteMany(
      { tenant: id },
      options,
    );
    await Settings(options.database).deleteMany(
      { tenant: id },
      options,
    );

    await User(options.database).updateMany(
      {},
      {
        $pull: {
          tenants: { tenant: id },
        },
      },
      options,
    );
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).countDocuments(filter),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tenant(options.database).findById(id),
        options,
      );

    if (!record) {
      return record;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.settings = await SettingsRepository.find({
      currentTenant: record,
      ...options,
    });

    return output;
  }

  static async findByUrl(url, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tenant(options.database).findOne({ url }),
        options,
      );

    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.settings = await SettingsRepository.find({
      currentTenant: record,
      ...options,
    });

    return output;
  }

  static async findDefault(options: IRepositoryOptions) {
    return Tenant(options.database).findOne();
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      _id: {
        $in: currentUser.tenants
          .filter((userTenant) =>
            ['invited', 'active'].includes(
              userTenant.status,
            ),
          )
          .map((userTenant) => userTenant.tenant.id),
      },
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.name) {
        criteriaAnd.push({
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'name_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const rows = await Tenant(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await Tenant(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let criteriaAnd: Array<any> = [
      {
        _id: {
          $in: currentUser.tenants.map(
            (userTenant) => userTenant.tenant.id,
          ),
        },
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            name: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Tenant(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Tenant(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static _isUserInTenant(user, tenantId) {
    if (!user || !user.tenants) {
      return false;
    }

    return user.tenants.some(
      (tenantUser) =>
        String(tenantUser.tenant.id) === String(tenantId),
    );
  }
}

export default TenantRepository;
