import { personaTypes } from "@prisma/client";

export const convertPersona = (persona: personaTypes | null | undefined) => {
  return { set: persona !== undefined ? persona : null };
};
