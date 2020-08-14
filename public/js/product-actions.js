const selected = document.getElementById("selected")
const defaultImage = document.getElementById("default-image")

function changeImageFocus(event) {
    selected.setAttribute("src", event.target.id)
    console.log(event.target.id)
}
