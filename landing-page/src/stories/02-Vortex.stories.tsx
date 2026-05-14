import type { Meta, StoryObj } from "@storybook/react";
import { VortexIcon } from "@/components/ui/brand-icons";
import { IconFrame } from "./IconFrame";

const meta: Meta<typeof VortexIcon> = {
  title: "Disrupta / Brand Icons / 02 · Buraco Negro do Capital",
  component: VortexIcon,
  parameters: {
    backgrounds: { default: "dark" },
    layout: "centered",
    docs: {
      description: {
        component: `
**Vórtex — Ralo de Recursos**

8 quadrados concêntricos em rotações progressivas criam ilusão de espiral infinita.
O centro é um vazio absoluto que pulsa e expande. Linhas tracejadas diagonais
simulam o "pull" gravitacional que drena capital silenciosamente.

> *O capital não é investido — ele é sugado por um centro gravitacional invisível.*

| Token | Valor |
|---|---|
| Fundo   | \`#000000\` |
| Núcleo  | \`#FF5500\` |
| Anéis   | \`rgba(255,255,255,X)\` com opacity progressiva |
        `,
      },
    },
  },
  decorators: [(Story) => <IconFrame><Story /></IconFrame>],
};

export default meta;
type Story = StoryObj<typeof VortexIcon>;

export const Default: Story = {
  name: "Vórtex",
};
