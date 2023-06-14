import { useState, useCallback, useEffect } from 'react'

const useClickToCopy = (text: any, notifyTimeout = 2000) => {

  const [copyStatus, setCopyStatus] = useState<any>(null)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus(true),
      () => setCopyStatus(false)
    )
  }, [text])

  useEffect(() => {
    if (copyStatus === false) {
      return
    }

    const timeoutId = setTimeout(
      () => setCopyStatus(null),
      notifyTimeout
    )

    return () => clearTimeout(timeoutId)
  }, [copyStatus, notifyTimeout])

  return [copyStatus, copy]
}

export default useClickToCopy