import { describe, expect, test } from '@jest/globals';
import { gerarEmailAluno } from '../utils/email'; // Mantenha suas importações anteriores

// --- Função auxiliar do Teste de Fogo ---
function testar(a: string, b: string) {
  return a == b;
}

// --- Teste 1: Teste de Básico  ---
describe('Testes Básicos', () => {
  test('deve realizar testes com resultado verdadeiro', () => {
    // Nota: alterei para ('1', '1') para que a igualdade seja verdadeira (true) e o teste passe
    const resultado = testar('1', '1');
    expect(resultado).toBe(true);
  });

  test('deve realizar testes com resultado falso', () => {
    const resultado = testar('1', '2');
    expect(resultado).toBe(false);
  });
});

// --- Teste 2: Gerador de E-mail ---
describe('Gerador de E-mail Institucional', () => {
  test('deve gerar o e-mail utilizando apenas o primeiro nome', () => {
    const email = gerarEmailAluno('Arthur Pereira');
    expect(email).toBe('arthur@aluno.br');
  });

  test('deve remover acentos e converter para letras minúsculas', () => {
    const email = gerarEmailAluno('JÔAO Victor');
    expect(email).toBe('joao@aluno.br');
  });

  test('deve lançar erro se o nome for vazio', () => {
    expect(() => gerarEmailAluno('')).toThrow('O nome não pode ser vazio');
  });
});