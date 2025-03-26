const employees = [
  { "Matricula": "N6088107", "Nome": "Leandro Gonçalves de Carvalho", "Setor": "Empresarial", "DPA": "79%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5619600", "Nome": "Bruno Costa Bucard", "Setor": "Empresarial", "DPA": "86%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N0189105", "Nome": "Igor Marcelino de Marins", "Setor": "Empresarial", "DPA": "83%", "ETIT": "79%", "Assertividade": "-" },
  { "Matricula": "N5713690", "Nome": "Gabriela Tavares da Silva", "Setor": "Empresarial", "DPA": "80%", "ETIT": "56%", "Assertividade": "-" },
  { "Matricula": "N5802257", "Nome": "Magno Ferrarez de Morais", "Setor": "Empresarial", "DPA": "70%", "ETIT": "61%", "Assertividade": "-" },
  { "Matricula": "F201714", "Nome": "Fernanda Mesquita de Freitas", "Setor": "Empresarial", "DPA": "94%", "ETIT": "63%", "Assertividade": "-" },
  { "Matricula": "N0125317", "Nome": "Roberto Silva do Nascimento", "Setor": "Empresarial", "DPA": "118%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5819183", "Nome": "Rodrigo Pires Bernardino", "Setor": "Empresarial", "DPA": "86%", "ETIT": "85%", "Assertividade": "-" },
  { "Matricula": "N5926003", "Nome": "Suellen Hernandez da Silva", "Setor": "Empresarial", "DPA": "-", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5932064", "Nome": "Monica da Silva Rodrigues", "Setor": "Empresarial", "DPA": "110%", "ETIT": "96%", "Assertividade": "-" }
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
