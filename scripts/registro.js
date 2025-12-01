async function registrarAcesso(usuario) {
    const apiUrl = "https://script.google.com/macros/s/AKfycbw8L0ZxkZxQ6E7BuqNPJDlr_xZTBVP12I8duKiU-Us1bS5slw7UJp_obNTrv2KuAuo/exec";

    const dispositivo = navigator.userAgent;
    const horario = new Date().toISOString();
    const link = window.location.href;

    let ip = "";
    try {
        const r = await fetch("https://api.ipify.org?format=json");
        ip = (await r.json()).ip;
    } catch {}

    fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ link, horario, dispositivo, usuario, ip })
    });
}

// Modal simples
function solicitarNomeERegistrar() {
    let nome = prompt("Digite seu nome para acessar:");
    if (!nome) nome = "Desconhecido";

    registrarAcesso(nome);
    return nome;
}
