import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextArea(
  { name, id, value, className, autoComplete, required, isFocused, handleChange, cols, rows },
  ref
) {
  const input = ref ? ref : useRef()

  useEffect(() => {
    if (isFocused) {
      input.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col items-start">
      <textarea
        name={name}
        id={id}
        value={value}
        className={`border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm ` + className}
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        cols={cols}
        rows={rows}
      />
    </div>
  )
})
