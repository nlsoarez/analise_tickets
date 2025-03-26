const employees = [
  { "Matricula": "F119481", "Nome": "LAYSSA MENDES DE LIMA", "Setor": "Empresarial", "DPA": "97%", "ETIT": "100%" },
  { "Matricula": "N6026848", "Nome": "BRUNO RIBEIRO ARAUJO", "Setor": "Empresarial", "DPA": "90%", "ETIT": "96%" },
  { "Matricula": "N5969641", "Nome": "CARLOS ALEXANDRE COSTA DE OLIVEIRA", "Setor": "Empresarial", "DPA": "93%", "ETIT": "93%" },
  { "Matricula": "N5705710", "Nome": "ULYSSES FERREIRA DOS SANTOS", "Setor": "Empresarial", "DPA": "114%", "ETIT": "100%" },
  { "Matricula": "F201734", "Nome": "BRENDA FERNANDA DA SILVA DAVID", "Setor": "Empresarial", "DPA": "102%", "ETIT": "91%" },
  { "Matricula": "N5922887", "Nome": "ROMULO BARBOSA NICOLAE", "Setor": "Empresarial", "DPA": "94%", "ETIT": "93%" },
  { "Matricula": "N5963374", "Nome": "THIAGO RODRIGUES LOPES", "Setor": "Empresarial", "DPA": "85%", "ETIT": "86%" },
  { "Matricula": "N5946041", "Nome": "FABIO ANGELO MAGELA DE ALMEIDA", "Setor": "Empresarial", "DPA": "-", "ETIT": "98%" },
  { "Matricula": "N6172922", "Nome": "DJALMIR SILVA DE SENA", "Setor": "Empresarial", "DPA": "83%", "ETIT": "90%" },
  { "Matricula": "N5739694", "Nome": "GUILHERME SCALON DA SILVA COELHO", "Setor": "Empresarial", "DPA": "82%", "ETIT": "87%" }
];

function definirMeta(tipo) {
    const metas = {
        "ETIT": 85,
        "DPA": 90
    };
    return metas[tipo];
}

function considerarDentroMeta(valor, tipo) {
    if (valor === "-" || valor === "Não informado") {
        return true; 
    }

    const valorNumerico = parseFloat(valor.replace("%", ""));
    return valorNumerico >= definirMeta(tipo);
}

function formatarValor(valor, tipo) {
    if (valor === "-" || valor === "Não informado") {
        return "-";
    }

    const valorNumerico = parseFloat(valor.replace("%", ""));
    const dentroDaMeta = valorNumerico >= definirMeta(tipo);
    return dentroDaMeta ? `<span style="color: green;">${valor}</span>` : `<span style="color: red;">${valor}</span>`;
}

function consultar() {
    const matriculaInput = document.getElementById("matricula").value.trim().toUpperCase();
    const resultadoDiv = document.getElementById("resultado");

    if (!matriculaInput) {
        resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, digite uma matrícula.</p>";
        return;
    }

    const empregado = employees.find(emp => emp.Matricula === matriculaInput);

    if (empregado) {
        const etitOk = considerarDentroMeta(empregado.ETIT, "ETIT");
        const dpaOk = considerarDentroMeta(empregado.DPA, "DPA");

        const certificacaoMsg = etitOk && dpaOk ? 
            `<p style="color: green; font-weight: bold;">Você está certificando ✅</p>` : 
            `<p style="color: red; font-weight: bold;">Você não está certificando ❌</p>`;

        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${empregado.Nome}</p>
            <p><strong>Setor:</strong> ${empregado.Setor}</p>
            <p><strong>ETIT:</strong> ${formatarValor(empregado.ETIT, "ETIT")}</p>
            <p><strong>DPA:</strong> ${formatarValor(empregado.DPA, "DPA")}</p>
            ${certificacaoMsg}
        `;
    } else {
        resultadoDiv.innerHTML = "<p style='color: red;'>Matrícula não encontrada.</p>";
    }
}
