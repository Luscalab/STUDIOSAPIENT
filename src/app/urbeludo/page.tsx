import type { Metadata } from 'next';
import { UrbeLudoClient } from "./urbeludo-client";

export const metadata: Metadata = {
  title: 'UrbeLudo | Desenvolvimento Neuropsicomotor e Neurodiversidade',
  description: 'Conheça o UrbeLudo: um ecossistema digital focado em reabilitação motora e suporte psicomotor para TEA, TDAH e neurodiversidade. Tecnologia e rigor clínico.',
};

export default function UrbeLudoPage() {
  return <UrbeLudoClient />;
}
