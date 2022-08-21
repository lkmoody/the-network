import { AppState } from '../AppState';
import { Account } from '../models/Account.js';
import { logger } from '../utils/Logger';
import { api } from './AxiosService';

class AccountService {
  async getAccount() {
    try {
      const response = await api.get('/account')
      AppState.account = response.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountData) {
    const response = await api.put('account', accountData);
    const newAccount = AppState.account;
    newAccount.name = accountData.name;
    newAccount.picture = accountData.picture;
    newAccount.coverImg = accountData.coverImg;
    newAccount.bio = accountData.bio;
    AppState.account = newAccount;
  }
}

export const accountService = new AccountService()
