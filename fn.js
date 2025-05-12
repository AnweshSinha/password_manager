function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
      );
  }

const deletePassword = (website)=>{
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s password`)
    showPasswords()

}

// Logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML =  `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr> `
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.website} 
                    <i class="fas fa-copy" style="cursor:pointer; margin-left:8px;" onclick="copyText('${element.website}')" title="Copy"></i>
                </td>
                <td>${element.username} 
                    <img class="copy-icon" onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button">
                </td>
                <td>
                    <span class="password" data-password="${element.password}">${maskPassword(element.password)}</span>
                    <i class="fas fa-eye" style="margin-left:8px; cursor:pointer;" onclick="togglePassword(this)" title="Show/Hide"></i>
                    <img class="copy-icon" onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button">
                </td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

window.onload = function () {
console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked....")
    console.log(username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})};

function togglePassword(elem) {
    const span = elem.parentElement.querySelector('.password');
    const actualPassword = span.getAttribute("data-password");

    if (span.textContent === actualPassword) {
        span.textContent = maskPassword(actualPassword);
        elem.classList.remove("fa-eye-slash");
        elem.classList.add("fa-eye");
    } else {
        span.textContent = actualPassword;
        elem.classList.remove("fa-eye");
        elem.classList.add("fa-eye-slash");
    }
}