const EditExpenseInputBox = ({ label, type, value, onChange, maxLength, max, options }) => {
  return (
    <div className="form-row mb-3">
      <label className="form-label" htmlFor={label}>{label}</label>
      {type === 'select' && Array.isArray(options)
        ? (
          <select className="form-control" id={label} value={value} onChange={onChange}>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          )
        : (
          <input
            className="form-control"
            type={type}
            id={label}
            value={value}
            onChange={onChange}
            maxLength={maxLength || ''}
            max={max || ''}
          />
          )
      }
    </div>
  )
}

export default EditExpenseInputBox
