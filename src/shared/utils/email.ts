export function gerarEmailAluno(nomeCompleto: string): string {
  if (!nomeCompleto || !nomeCompleto.trim()) {
    throw new Error('O nome não pode ser vazio');
  }

  // 1. Pega apenas a primeira palavra
  const primeiroNome = nomeCompleto.trim().split(' ')[0];

  // 2. Remove acentos e caracteres especiais (ex: "João" -> "Joao")
  const nomeNormalizado = primeiroNome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  // 3. Monta o e-mail institucional
  return `${nomeNormalizado}@aluno.br`;
}