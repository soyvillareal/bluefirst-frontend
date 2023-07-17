import { useEffect, useState } from 'react';

// El <T> es para que el hook sea genérico y pueda recibir cualquier tipo de dato
// El valor por defecto de delay es 500
// Ejemplo de uso: const debouncedSearch = useDebounce<string>('Hola', 500);
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncedLoading, setDebouncedLoading] = useState<boolean>(false);

  useEffect(() => {
    setDebouncedLoading(true);
    // Actualiza debouncedValue después de que el usuario deja de escribir
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncedLoading(false);
    }, delay);

    // Cancela la actualización debouncedValue si el usuario vuelve a escribir antes del tiempo de espera
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Devuelve el valor debounced, que solo se actualiza después del tiempo de espera
  return {
    debouncedValue,
    debouncedLoading,
  };
};

// Uso
// const [search, setSearch] = useState("");
// const debouncedSearch = useDebounce(search, 500);
