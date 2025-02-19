
async function Login() {
    let username = "²⁴BCA⁷⁷⁶³";
    let password = "Sv@170506!";

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const loginPage = await fetch("http://172.18.10.10:1000/login?");
    const loginHTML = await loginPage.text();

    const magicMatch = loginHTML.match(/name="magic" value="(.*?)"/);
    const redirMatch = loginHTML.match(/name="4Tredir" value="(.*?)"/);

    if (!magicMatch || !redirMatch) {
        console.error("Magic or 4Tredir not found!");
        return;
    }

    const magic = magicMatch[1];
    const fourTredir = redirMatch[1];

    console.log("Extracted Magic:", magic);
    console.log("Extracted 4Tredir:", fourTredir);
    console.log("Converted Username:", username);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "http://172.18.10.10:1000/login?";

    form.innerHTML = `
        <input type="hidden" name="username" value="${username}">
        <input type="hidden" name="password" value="${password}">
        <input type="hidden" name="magic" value="${magic}">
        <input type="hidden" name="4Tredir" value="${fourTredir}">
    `;

    document.body.appendChild(form);
    form.submit();
}

async function KeepAlive() {
    const keepAliveURL = "http://172.18.10.10:1000/keepalive?0a06040506080a00";
    try {
        await fetch(keepAliveURL, { method: "GET", mode: "no-cors", credentials: "include" });
        console.log("KeepAlive sent.");
    } catch (error) {
        console.error("KeepAlive failed:", error);
    }
}

function Logout() {
    const logoutURL = "http://172.18.10.10:1000/logout?";
    fetch(logoutURL, { method: "GET", mode: "no-cors", credentials: "include" })
        .then(() => alert("Logged out successfully!"))
        .catch(() => alert("Logout failed!"));
}