import { useState } from 'react'

// <img> that falls back to a warm gradient block if the URL fails to load.
export default function SmartImage({ src, alt = '', className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-beige to-sand ${className}`}
      />
    )
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
