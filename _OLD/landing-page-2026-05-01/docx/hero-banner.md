# Banner Hero — Textos

> **Como funciona:** Edite o arquivo `hero-content.ts` nesta mesma pasta.
> O componente `Hero.tsx` importa diretamente desse arquivo — qualquer alteração reflete automaticamente no LP após o build/HMR.

---

## Intervalo de rotação

```
8000ms  →  8 segundos por headline
```

> Para alterar: edite `HERO_ROTATION_INTERVAL` em `hero-content.ts`.

---

## Headlines (rotativo)

| # | Texto |
|---|-------|
| 1 | Evite o buraco negro do achismo: valide seu negócio com dados reais.|
| 2 | O "eu acho" ameaça seu capital. Troque a intuição pelo rigor da Disrupta.|
| 3 | Empresa ou ilusão? Escape do achismo antes de consumir seu investimento.|

---

## Subtítulo

```
Saia do "achismo" estratégico em menos de 5 minutos. Mapeie riscos invisíveis
e obtenha um veredito documental sobre sua viabilidade.
```

---

## CTA Principal

```
Calcular o valor da minha ideia
```

---

## Status Indicator (Stark Mode)

| Campo | Valor |
|-------|-------|
| Label | Objetivo Disrupta |
| Value | VALIDAÇÃO DOCUMENTAL DE MODELOS DE NEGÓCIO |

---

## Fluxo de Edição

```
1. Edite o valor desejado em `docx/hero-content.ts`
2. Salve o arquivo
3. O HMR (Hot Module Replacement) do Next.js atualiza o LP automaticamente
4. Para produção: rode `npm run build`
```

---

## Componente de referência

`src/components/sections/Hero.tsx`
