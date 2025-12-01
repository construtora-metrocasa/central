// Função para ler cookie
function getCookie(nome) {
    const match = document.cookie.match(new RegExp('(^| )' + nome + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

// Função para registrar o acesso no Google Sheets
async function registrarAcesso(usuario) {
    const apiUrl = "https://script.google.com/macros/s/AKfycbw8L0ZxkZxQ6E7BuqNPJDlr_xZTBVP12I8duKiU-Us1bS5slw7UJp_obNTrv2KuAuo/exec";

    const dispositivo = navigator.userAgent;
    const horario = new Date().toISOString();
    const link = window.location.href;

    let ip = "";
    try {
        const r = await fetch("https://api.ipify.org?format=json");
        ip = (await r.json()).ip;
    } catch(e){}

    fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario,
            link,
            horario,
            dispositivo,
            ip
        })
    });
}

// Função para exibir modal e salvar usuário
function solicitarNomeERegistrar() {
    const usuario = prompt("Digite seu nome para acessar:") || "Desconhecido";
    document.cookie = `usuario=${encodeURIComponent(usuario)}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
    registrarAcesso(usuario);
    return usuario;
}
