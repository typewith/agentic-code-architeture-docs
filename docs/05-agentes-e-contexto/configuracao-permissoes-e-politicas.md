# Configuração, Permissões e Políticas

`src/utils/permissions/permissionSetup.ts` deixa claro que a governança do produto foi desenhada como sistema próprio. Não se trata apenas de perguntar “sim ou não” antes de um comando sensível. O runtime precisa compor várias origens de configuração, entender modos operacionais distintos, interpretar regras específicas para ferramentas e bloquear combinações que seriam perigosas em cenários como auto mode ou delegação para subagentes.

Esse desenho é fundamental em plataformas agênticas de código porque o risco não está somente na execução de uma tool isolada. O risco está na composição de ferramentas, na repetição automática de tentativas, na execução em background e na capacidade do modelo de contornar controles fracos por meio de novas chamadas.

## Modos de permissão

Os modos como `default`, `plan`, `bypassPermissions` e `auto` não são cosméticos. Eles definem a relação entre autonomia do agente e intervenção humana. Em `default`, a ênfase está na aprovação explícita. Em `plan`, o sistema tenta transformar um conjunto de ações em algo aprovável como lote. Em `bypassPermissions`, a autonomia é máxima e o ambiente precisa ser tratado como altamente confiável. Em `auto`, o runtime tenta combinar classifier e regras para automatizar decisões sem abrir mão completamente de prudência.

O valor arquitetural disso está em reconhecer que governança não é binária. Há vários regimes possíveis de confiança, e um produto real precisa acomodá-los sem reescrever todo o motor.

## Regras compostas e múltiplas origens

Outro ponto forte é a composição de fontes de configuração. O sistema considera settings globais, settings de projeto, overrides locais, políticas gerenciadas, argumentos de CLI e estado de sessão. Isso mostra maturidade porque, em ambientes profissionais, não existe uma única autoridade de configuração. Há preferências do usuário, decisões do time, restrições corporativas e controles temporários de sessão.

Essa multiplicidade costuma virar caos se não houver precedência clara. A função de setup existe justamente para ordenar essas influências antes que o agente comece a agir.

## Políticas específicas para ferramentas perigosas

O código dedica atenção especial a Bash, PowerShell e Agent rules. Isso é um ótimo sinal. Em vez de tratar todas as tools como equivalentes, a arquitetura reconhece que algumas delas funcionam como meta-capacidades: uma regra permissiva demais de shell praticamente equivale a liberar execução arbitrária de código, e uma regra permissiva demais de subagentes enfraquece o controle sobre delegação.

Essa é uma lição importante. Em sistemas agênticos, certas capabilities merecem análise estrutural própria porque elas podem simular muitas outras. O projeto trata esse fato como parte das regras, não como detalhe de documentação.

## O que aprender

Permissão bem desenhada não é barreira burocrática; é parte da semântica do runtime. Ela define o que significa usar uma tool com segurança, em qual contexto e sob qual grau de confiança. Quando esse sistema é claro, o agente pode ser poderoso sem ser opaco. Quando ele é fraco, toda a arquitetura ao redor perde credibilidade.
