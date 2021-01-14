var updateStateBtn = document.getElementById("update-state");
updateStateBtn.addEventListener("click", updateState);
function updateState() {
    var newState = $("#state").val();
    fetch("", {
        method: "PUT",
        body: JSON.stringify({ newState: newState }),
        headers: {
            "content-type": "application/json",
        },
    }).then(() => {
        window.location.href = "/drink-order";
    });
}
