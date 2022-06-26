class Loans {
  collection;
  constructor(db: any) {
    this.collection = db.collection('loans');
  }
  async addLoan(loan: Loan) {
    const newLoan = await this.collection.insertOne(loan);
    return newLoan;
  }
}
module.exports = Loans;