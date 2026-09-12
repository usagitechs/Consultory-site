Una dictionary por sección: `export default { es: {...}, en: {...}, pt: {...} } satisfies Dict<Keys>`.
Claves planas, mismas en los tres idiomas. El componente hace `const t = dict[lang]`.
El test `src/__tests__/i18n.test.ts` verifica que ningún idioma tenga claves de menos ni de más.
