import type { Meta, StoryObj } from "@storybook/react";
import { ImpossibleCubeIcon } from "@/components/ui/brand-icons";
import { IconFrame } from "./IconFrame";

const meta: Meta<typeof ImpossibleCubeIcon> = {
  title: "Disrupta / Brand Icons / 01 · Falsa Certeza",
  component: ImpossibleCubeIcon,
  parameters: {
    backgrounds: { default: "dark" },
    layout: "centered",
    docs: {
      description: {
        component: `
**Cubo Impossível — Distorção de Realidade**

Cubo isométrico (Necker) onde o vértice central é simultaneamente o ponto mais próximo
**e** mais distante do observador. A geometria oscila entre duas leituras igualmente válidas:
laranja \`reading A\` e branco \`reading B\`.

> *O modelo parece lógico, mas a realidade muda conforme o foco.*

| Token | Valor |
|---|---|
| Fundo | \`#000000\` |
| Alerta | \`#FF5500\` |
| Forma  | \`rgba(255,255,255,0.85)\` |
| Dim    | \`rgba(255,255,255,0.18)\` |
        `,
      },
    },
  },
  decorators: [(Story) => <IconFrame><Story /></IconFrame>],
};

export default meta;
type Story = StoryObj<typeof ImpossibleCubeIcon>;

export const Default: Story = {
  name: "Cubo Impossível",
};
