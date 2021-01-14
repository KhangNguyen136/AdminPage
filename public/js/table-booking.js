var confirmedBtnList = $(".confirm");
var deletedBtnList = $(".delete");
var confirmedFilterBtn = $("#confirmed-filter")[0];
var unconfirmedFilterBtn = $("#unconfirmed-filter")[0];
confirmedFilterBtn.addEventListener("click", filterConfirmed);
unconfirmedFilterBtn.addEventListener("click", filterUnconfirmed);
for (let i = 0; i < confirmedBtnList.length; i++) {
    confirmedBtnList[i].addEventListener("click", confirmClick);
}
for (let i = 0; i < deletedBtnList.length; i++) {
    deletedBtnList[i].addEventListener("click", deleteClick);
}
function filterConfirmed() {
    $("#confirmed-filter").addClass("active");
    $("#unconfirmed-filter").removeClass("active");
    fetch("/api/table-booking/confirmed", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((tableOrderList) => {
            $("tbody").text("");
            tableOrderList.forEach((order) => {
                var text = `<tr>
                                    <td class="name">${order.name}</td>
                                    <td class="phone-number">${order.phoneNumber}</td>
                                    <td class="table-type">${order.numOfGuests}</td>
                                    <td class="date">${order.date}</td>
                                    <td class="time">${order.time}</td>
                                    <td style="text-align: center">
                                        <button ofid="${order._id}" class="btn btn-primary delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>`;
                $("tbody").append(text);
            });
        })
        .then(() => {
            addRemoveEvent();
        });
}
function filterUnconfirmed() {
    $("#unconfirmed-filter").addClass("active");
    $("#confirmed-filter").removeClass("active");
    fetch("/api/table-booking/unconfirmed", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((tableOrderList) => {
            $("tbody").text("");
            tableOrderList.forEach((order) => {
                var text = `<tr>
                                    <td class="name">${order.name}</td>
                                    <td class="phone-number">${order.phoneNumber}</td>
                                    <td class="table-type">${order.numOfGuests}</td>
                                    <td class="date">${order.date}</td>
                                    <td class="time">${order.time}</td>
                                    <td style="text-align: center">
                                         <button ofid="${order._id}" class="btn btn-primary confirm">
                                            Confirm
                                        </button>
                                        <button ofid="${order._id}" class="btn btn-primary delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>`;
                $("tbody").append(text);
            });
        })
        .then(() => {
            addRemoveEvent();
            addConfirmEvent();
        });
}
function addConfirmEvent() {
    var confirmedBtnList = $(".confirm");
    for (let i = 0; i < confirmedBtnList.length; i++) {
        confirmedBtnList[i].addEventListener("click", confirmClick);
    }
}

function addRemoveEvent() {
    var deletedBtnList = $(".delete");
    for (let i = 0; i < deletedBtnList.length; i++) {
        deletedBtnList[i].addEventListener("click", deleteClick);
    }
}

function confirmClick(event) {
    const btn = event.target;
    const id = btn.getAttribute("ofid");
    fetch("/api/table-booking/" + id, {
        method: "PUT",
    });
    btn.parentElement.parentElement.remove();
}
function deleteClick(event) {
    const btn = event.target;
    const id = btn.getAttribute("ofid");
    fetch("/api/table-booking/" + id, {
        method: "DELETE",
    });
    btn.parentElement.parentElement.remove();
}
