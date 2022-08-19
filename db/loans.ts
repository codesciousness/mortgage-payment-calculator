class Loans {
  collection;
  constructor(db: any) {
    this.collection = db.collection('loans');
  }
  async findLoan(email: string) {
    const existingLoan = await this.collection.findOne({ email });
    return existingLoan;
  }
  async addLoan(loan: Loan) {
    const newLoan = await this.collection.insertOne({ ...loan, created: new Date().toUTCString(), lastUpdated: Date.now() });
    return newLoan;
  }
  async updateLoan(loanId: string, loan: Loan) {
    const updatedLoan = await this.collection.updateOne({ loanId }, { $set: { ...loan, lastUpdated: Date.now() }});
    return updatedLoan;
  }
}
module.exports = Loans;