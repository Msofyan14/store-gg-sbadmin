const Transactions = require("../transactions/model");
const Voucher = require("../voucher/model");
const Player = require("../player/model");
const Category = require("../category/model");

module.exports = {
  index: async (req, res) => {
    try {
      const transactions = await Transactions.countDocuments();
      const voucher = await Voucher.countDocuments();
      const player = await Player.countDocuments();
      const category = await Category.countDocuments();

      res.render("admin/dashboard/view_dashboard", {
        name: req.session.user.name,
        title: "Halaman Dashboard",
        count: {
          transactions,
          player,
          voucher,
          category,
        },
      });
    } catch (error) {
      console.log(err);
    }
  },
};
