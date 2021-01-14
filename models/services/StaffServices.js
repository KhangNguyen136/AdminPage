const { StaffModel } = require("../staffModel");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const { to } = require("await-to-js");
const getStaffList = async () => {
    const list = await StaffModel.find().lean();
    return list;
};

const getStaffById = async (id) => {
    const staff = await StaffModel.findOne({ _id: ObjectId(id) });
    return staff;
};

const updateStaff = async (id, data) => {
    const staff = await StaffModel.findOne({ _id: ObjectId(id) });
    if (!staff) {
        throw Error("No staff has ID: ", id);
    }
    staff.name = data.name;
    staff.phoneNumber = data.phoneNumber;
    staff.address = data.address;
    staff.birthday = data.birthday;
    staff.startDate = data.startDate;
    staff.salary = data.salary;
    staff.role = data.role;
    await staff.save();
};

const deleteStaff = async (id) => {
    await StaffModel.deleteOne({ _id: ObjectId(id) });
};

const addStaff = async (data) => {
    const staff = new StaffModel(data);
    await staff.save();
};
const changePassword = async (staffId, oldpassword, newpassword) => {
    const user = await StaffModel.findOne({
        _id: ObjectId(staffId),
    }).catch((err) => {
        throw new Error("finding user failed");
    });
    var [err, res] = await to(bcrypt.compare(oldpassword, user.password));
    if (!res) {
        throw new Error("Password wrong!");
    }
    var [err, hash] = await to(bcrypt.hash(newpassword, 10));
    if (err) {
        throw new Error("Bcrypt failure!");
    }
    user.password = hash;
    user.save();
};
module.exports = {
    addStaff,
    getStaffById,
    getStaffList,
    updateStaff,
    deleteStaff,
    updateStaff,
    changePassword,
};
