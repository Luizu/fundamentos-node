import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    if (!transactions) {
      throw Error('There is no transaction on this account');
    }

    return transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const sumIncome = income.reduce(
      (sum, { value }: { value: number }) => sum + value,
      0,
    );
    const sumOutcome = outcome.reduce(
      (sum, { value }: { value: number }) => sum + value,
      0,
    );

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
