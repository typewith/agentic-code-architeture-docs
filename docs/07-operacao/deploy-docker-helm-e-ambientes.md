# Deploy, Docker, Helm e Ambientes

O `Dockerfile` do repositório é um exemplo claro de empacotamento orientado a produção. Ele usa build multi-stage, instala dependências só no estágio de build, gera um bundle otimizado e copia apenas o artefato final para a imagem de runtime. Esse padrão é importante porque reduz tamanho, simplifica a superfície de execução e evita carregar o ambiente inteiro de desenvolvimento para produção.

Outro detalhe significativo é a instalação explícita de `git` e `ripgrep` na imagem de runtime. Isso lembra que um agente de código não vive apenas do binário principal; ele depende de utilitários do ambiente para realizar trabalho real. Em produtos desse tipo, a imagem operacional precisa refletir as capacidades esperadas do runtime.

## Helm como explicitação de topologia

O chart em `helm/claude-code/` mostra uma topologia de deploy mais séria: `deployment.yaml`, `service.yaml`, `ingress.yaml`, `hpa.yaml`, `pdb.yaml`, `pvc.yaml`, `secret.yaml` e `configmap.yaml`. Isso significa que o sistema foi pensado para escalar horizontalmente, expor tráfego por ingress, manter disponibilidade mínima durante interrupções e separar configuração de segredo.

Esse conjunto de templates ensina que, assim que o agente vira serviço, ele precisa ser tratado como aplicação stateful o bastante para merecer política de capacidade, armazenamento e resiliência, mesmo que o runtime central em si pareça “apenas um processo Bun”.

## Ambientes diferentes, preocupações diferentes

`vercel.json` mostra um recorte mais leve para a aplicação web em Next.js, com roteamento específico, secrets injetados e headers de segurança. O contraste entre Vercel e Helm é instrutivo. Um ambiente é mais orientado a front-end/serverless, o outro a backend/infra controlada. O repositório tenta acomodar ambos sem fingir que são iguais.

Essa flexibilidade é útil, mas cobra cuidado. Quanto mais ambientes suportados, maior a pressão por contratos claros de configuração e por observabilidade uniforme.
