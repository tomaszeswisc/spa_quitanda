# Registro de segurança e alterações — spa_quitanda

> Este documento não guarda valores de senhas, tokens ou segredos. Antes de remover um arquivo rastreado, registre o commit de origem e defina como restaurar código e configurações não sigilosas.

## Inventário inicial — 15/10/2026

- Repositório: https://github.com/tomaszeswisc/spa_quitanda
- Arquivo `server.js`: blob SHA `20f7af476a47db4c41af71301165be5ea7619e10`
- Arquivo `.env`: não encontrado
- Elementos a revisar: configurações de MySQL inseridas diretamente no servidor
- **Código removido nesta etapa:** nenhum.
- **Credenciais substituídas nesta etapa:** nenhuma.
- **Histórico Git reescrito nesta etapa:** não.

## Problemas e ações futuras

- Substituir configuração de conexão com MySQL inserida diretamente no código por variáveis de ambiente; manter todas as rotas existentes.
- Substituir/rotacionar credenciais que tenham sido publicadas antes de considerar a exposição resolvida.
- Revisar eventuais credenciais também presentes em commits antigos; a limpeza de histórico é uma operação separada e exige backup e coordenação com cópias locais.
- Antes de alterar código, anotar o caminho, SHA/commit anterior, resumo do trecho afetado, motivo e procedimento de restauração neste arquivo.
- Nunca registrar valores reais de `DB_PASS`, `JWT_SECRET`, `EMAIL_PASS` ou segredos equivalentes neste documento.

## Diário de modificações

| Data | Arquivo | Operação | Alteração/remoção | Como recuperar |
|---|---|---|---|---|
| 2026-10-15 | `SECURITY_CHANGELOG.md` | Criação | Apenas documentação e inventário; nenhum código original removido | Histórico de commits do próprio arquivo |


| 2026-10-15 | `server.js` | Substituição | Senha de MySQL embutida no código foi substituída por `process.env.DB_PASS`; host, usuário e nome do banco agora aceitam variáveis de ambiente; `dotenv` carrega um `.env` local | [Versão original (antes da alteração)](https://github.com/tomaszeswisc/spa_quitanda/blob/20f7af476a47db4c41af71301165be5ea7619e10/server.js); valor antigo da senha não deve ser reutilizado |
| 2026-10-15 | `package.json` | Dependência adicionada | Adicionado `dotenv` para carregar `.env` local | [Versão original](https://github.com/tomaszeswisc/spa_quitanda/blob/a0e3651aea343bedc54ce300089ad8ce8fc5bee4/package.json) |
| 2026-10-15 | `.gitignore` e `.env.example` | Configuração | Ignorar credenciais locais e documentar variáveis de configuração | Conferir histórico de commits |

**Ação exigida no computador:** antes de executar, crie `.env` a partir de `.env.example`, preencha `DB_PASS` com uma **nova senha** do banco e execute `npm install`. Sem `DB_PASS`, a aplicação pode falhar ao conectar. O segredo antigo continua no histórico e precisa ser revogado e removido posteriormente com um processo de limpeza coordenado.

## Recuperação

Consulte o histórico de commits em https://github.com/tomaszeswisc/spa_quitanda/commits e examine a versão anterior de cada arquivo pelo seu commit ou blob SHA. **Não restaure senhas antigas expostas**, pois devem ser revogadas. Para recuperar uma função ou regra segura, compare o diff e restaure somente o código necessário.

## 2026-10-15 — conferência de sintaxe automatizada

- Novo arquivo planejado: `.github/workflows/check-syntax.yml`, execução de `node --check server.js` no GitHub Actions.
- Escopo: verificação estática de sintaxe; não conecta ao banco nem executa login.
- Remoções: nenhuma. Código-fonte, rotas, segredos e arquivos de configuração não modificados nesta etapa.
- Recuperação: remover apenas o workflow ou reverter seu commit. O código anterior continua intacto.
