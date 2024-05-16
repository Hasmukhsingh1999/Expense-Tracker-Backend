import Transaction from "../models/transaction-model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //TODO=>ADD category statistics query
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const transaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await transaction.save();
        return transaction;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deleteTransaction;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default transactionResolver;
