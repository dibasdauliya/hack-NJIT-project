export default function Container({ children, className = '' }) {
  return (
    <div className={`max-w-4xl mx-auto py-4 px-6 ${className}`}>{children}</div>
  )
}
