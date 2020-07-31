// basic account data

class Account {
  // account name and transaction storage
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  // calculates and returns balance from transaction history
  get balance() {
    let balance = 0;
    for (const t of this.transactions) {
      balance += t.value;
    }
    return balance.toFixed(2);
  }
  // pushes new transaction to history
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// transaction class

class Transaction {
  // inputs transaction amount to account
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  // includes date/time stamp to transaction
  commit() {
    this.time = new Date();
    if (!this.isAllowed()) return false;
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {
  // subclass of Transaction. Returns negative amount to transaction history
  get value() {
    return -this.amount;
  }
  // validator. Returns false if withdrawal is more than account balance
  isAllowed () {
    return this.account.balance - this.amount >= 0;
  }

}

class Deposit extends Transaction {
  // subclass of Transaction. Returns positive amount to transaction history
  get value() {
    return this.amount;
  }
  // validator. Always true, storage necessary to avoid return of falsy to Transaction commit
  isAllowed () {
    return true;
  }


}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('joao-jotao');

console.log('Starting balance: ', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
console.log('Commit: ', t3.commit());
console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
console.log('\nCommit: ', t2.commit());
console.log('Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
console.log('\nCommit: ', t1.commit());
console.log('Balance:', myAccount.balance);

console.log('\nShould not be allowed:')

t4 = new Withdrawal(59.77, myAccount);
console.log('\nCommit: ', t4.commit());

console.log('\nShould be allowed:')

t4 = new Withdrawal(59.76, myAccount);
console.log('\nCommit: ', t4.commit());

console.log('\nBalance:', myAccount.balance);
console.log('\nTransaction history: ', myAccount.transactions);
