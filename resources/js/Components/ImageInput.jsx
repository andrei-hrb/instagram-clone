import { forwardRef, useEffect, useRef } from 'react'
import './ImageInput.css'

export default forwardRef(function ImageInput(
    {
        type = 'file',
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
    },
    ref
) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <div className="flex">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                accept="image/png, image/jpeg"
                className={
                    `block w-full text-gray-900 border-none cursor-pointer focus:outline-none ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
})
