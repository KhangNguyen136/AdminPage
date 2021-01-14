const { StaffModel } = require("../models/staffModel");
const { ObjectId } = require("mongodb");
const StaffService = require("../models/services/StaffServices");
const { to } = require("await-to-js");
exports.index = async (req, res, next) => {
    const user = await StaffModel.findOne({ _id: ObjectId(req.user._id) });
    res.render("pages/staff/staffInfor", { user: user, page: "info" });
};
exports.getUpdateInfor = (req, res, next) => {
    res.render("pages/staff/editInfor", {
        user: req.user,
        page: "info",
    });
};
exports.postUpdateInfor = async (req, res, next) => {
    const user = await StaffModel.findOne({ _id: ObjectId(req.user._id) });
    user.name = req.body.name;
    user.address = req.body.address;
    user.phoneNumber = req.body.phoneNumber;
    user.birthday = req.body.birthday;
    await user.save().catch((err) => res.json(err));
    res.json({ log: "success" });
};
exports.updatePassword = async (req, res, next) => {
    if (!req.user) {
        return res.json({ err: "login needed" });
    }
    var [err] = await to(
        StaffService.changePassword(
            req.user._id,
            req.body.oldpassword,
            req.body.newpassword
        )
    );
    if (err) {
        console.log(err);
        return res.json(err);
    }
    return res.json({ log: "success" });
};
