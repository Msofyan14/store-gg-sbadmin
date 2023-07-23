const Transactions = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const transactions = await Transactions.find().populate("player");
      res.render("admin/transactions/view_transactions", {
        transactions,
        alert,
        name: req.session.user.name,
        title: "Halaman transactions",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transactions");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transactions.findByIdAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Success Update Status");
      req.flash("alertStatus", "success");
      res.redirect("/transactions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transactions");
    }
  },
};
