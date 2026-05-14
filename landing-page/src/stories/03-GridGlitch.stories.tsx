import type { Meta, StoryObj } from "@storybook/react";
import { GridGlitchIcon } from "@/components/ui/brand-icons";
import { IconFrame } from "./IconFrame";

const meta: Meta<typeof GridGlitchIcon> = {
  title: "Disrupta / Brand Icons / 03 · Falha Sistêmica",
  component: GridGlitchIcon,
  parameters: {
    backgrounds: { default: "dark" },
    layout: "centered",
    docs: {
      description: {
        component: `
**Grid Glitch — Cegueira Operacional**

Grid 5×5 perfeito com UM único nó corrompido que migra silenciosamente por
uma sequência de 8 posições adjacentes. O defeito nunca está no mesmo lugar
— representa churn, fraude ou falha de margem agindo sem ser detectado.

> *O sistema roda enquanto as engrenagens já moeram internamente.*

| Token | Valor |
|---|---|
| Fundo     | \`#000000\` |
| Nó glitch | \`#FF5500\` |
| Grid      | \`rgba(255,255,255,0.18)\` |
        `,
      },
    },
  },
  decorators: [(Story) => <IconFrame><Story /></IconFrame>],
};

export default meta;
type Story = StoryObj<typeof GridGlitchIcon>;

export const Default: Story = {
  name: "Grid Glitch",
};
