import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
       const timeID = setTimeout(() => setDebouncedValue(value), delay)

       return () => clearTimeout(timeID)
    }, [value])
    return debouncedValue;
}

export default useDebounce;