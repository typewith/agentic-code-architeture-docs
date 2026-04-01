# Riscos, Lacunas e Dívidas Técnicas

O principal risco do sistema hoje não parece ser ausência de capability, e sim densidade estrutural. Há muitos subsistemas corretos convivendo ao mesmo tempo: bridge, daemon, background sessions, teammates, MCP, plugins, skills, multiple auth strategies, web app, PTY server, dashboards e várias feature flags. O problema de uma arquitetura assim não é caber no repositório; é permanecer cognitivamente navegável.

## Sinais de dívida estrutural

Arquivos muito grandes e registries extensos são os sinais mais visíveis. Eles indicam que parte da coordenação ainda está centralizada demais. Quando o boot, o comando, a seleção de modo e a composição de features crescem no mesmo ponto, o custo de mudar o sistema com segurança sobe rapidamente.

Outro risco é a proliferação de variantes de execução. Quanto mais fast paths, flags e ambientes suportados, maior a chance de comportamento divergente e menor a chance de qualquer engenheiro manter uma visão completa de todas as combinações. Isso não significa que as variantes estejam erradas, mas significa que a pressão por testes e documentação cresce de forma não linear.

## Lacunas típicas desse tipo de sistema

Mesmo quando o runtime central é bom, há lacunas que tendem a aparecer com o tempo:

- dificuldade de explicar a topologia completa a novos engenheiros;
- aumento do custo de troubleshooting entre superfícies diferentes;
- necessidade crescente de contratos internos mais estáveis para plugins, MCP e bridge;
- risco de AppState virar repositório universal de tudo o que acontece na sessão.

Essas lacunas não anulam a qualidade atual do código. Elas apenas mostram para onde a arquitetura naturalmente puxa quando continua crescendo.

## Lição arquitetural mais importante

O repositório ensina que agentes de código maduros deixam de ser problema de prompt muito cedo. Eles viram problema de coordenação de sistemas. A dívida técnica mais séria não é “tool X está mal implementada”; é perder clareza de fronteira entre boot, loop, UI, governança, extensibilidade e operação.

Quem pretende construir algo semelhante deveria usar essa observação como alerta. O momento de proteger modularidade é antes de a plataforma parecer “grande demais para mexer”, não depois.
