const { BillModel } = require("../models/billModel");
const { ObjectID } = require("mongodb");
const { DiscountModel } = require("../models/discountModel");

exports.index = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    const bills = await BillModel.find();
    res.render("pages/staff/drinkOrder", { bills: bills });
};
exports.detail = async (req, res, next) => {
    // if (!req.user) {
    //     res.status(401);
    //     return res.json({ error: "access denied" });
    // }
    // if (req.user.role != "manager") {
    //     res.status(401);
    //     return res.json({ error: "access denied" });
    // }
    const bill = await BillModel.findOne({
        _id: ObjectID(req.params.id),
    });
    const discountValue = await DiscountModel.findOne({
        code: bill.discountCode,
    });
    if (discountValue) {
        bill.discountValue = discountValue.value;
    }
    res.render("pages/staff/drinkOrderDetail", { bill: bill });
};
exports.updateState = async (req, res, next) => {
    const bill = await BillModel.findOne({
        _id: ObjectID(req.params.id),
    });
    bill.status = req.body.newState;
    await bill.save();
    console.log(bill);
    res.end("done");
};
