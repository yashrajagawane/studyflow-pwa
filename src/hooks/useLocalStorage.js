import { useEffect, useState } from 'react'
import { readStoredValue, writeStoredValue } from '../services/storageService'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue).value)
  const [storageError, setStorageError] = useState(() => readStoredValue(key, initialValue).error)

  useEffect(() => {
    const result = writeStoredValue(key, value)
    if (result.error) setStorageError(result.error)
    else setStorageError(null)
  }, [key, value])

  return { value, setValue, storageError }
}
