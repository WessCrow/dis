import type { Meta, StoryObj } from "@storybook/react";
import { HollowSpotlightIcon } from "@/components/ui/brand-icons";
import { IconFrame } from "./IconFrame";

const meta: Meta<typeof HollowSpotlightIcon> = {
  title: "Disrupta / Brand Icons / 04 · Teatro Corporativo",
  component: HollowSpotlightIcon,
  parameters: {
    backgrounds: { default: "dark" },
    layout: "centered",
    docs: {
      description: {
        component: `
**Holofote Vazio — Inovação por Vaidade**

Holofote oscila sobre um pedestal que sustenta uma moldura vazia marcada "EMPTY".
O contraste entre o cone de luz (o pitch, o storytelling) e a ausência de produto
dentro da moldura sintetiza a vaidade como único motor.

> *Uma fachada reluzente escondendo uma estrutura oca.*

| Token | Valor |
|---|---|
| Fundo         | \`#000000\` |
| Moldura vazia | \`#FF5500\` |
| Cone de luz   | \`rgba(255,255,255,0.04–0.85)\` |
        `,
      },
    },
  },
  decorators: [(Story) => <IconFrame><Story /></IconFrame>],
};

export default meta;
type Story = StoryObj<typeof HollowSpotlightIcon>;

export const Default: Story = {
  name: "Holofote Vazio",
};
