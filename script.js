function randomizeFormat(input) {
    return input.split('').map(char => {
        let rand = Math.random();

        if (/[0-9]/.test(char)) { 
            return rand < 0.5 ? toSuperscript(char) : char;
        }

        if (/[A-Z]/.test(char)) { 
            return rand < 0.5 ? char.toLowerCase() : char;
        }

        return char;
    }).join('');
}

function toSuperscript(num) {
    const superscripts = { 
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' 
    };
    return superscripts[num] || num;
}

async function Login() {
    let username = "24BCA7763";
    let password = "Sv@170506!";

    let randomizedUsername = randomizeFormat(username);

    if (!randomizedUsername || !password) {
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
    console.log("Converted Username:", randomizedUsername);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "http://172.18.10.10:1000/login?";

    form.innerHTML = `
        <input type="hidden" name="username" value="${randomizedUsername}">
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
};