import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function SearchInput({ filter, setFilter }) {
  const [value, setValue] = useState("");

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  return (
    <>
      <Input
        placeholder="Buscar registros..."
        pl={2}
        mb={2}
        variant="flushed"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </>
  );
}

export default SearchInput;
