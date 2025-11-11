import Select, { type StylesConfig } from 'react-select'

// interface OptionType {
//     value: number
//     label: string
//   }
interface SelectParams<T> {
  options?: T[]
  className: string
  value: any
  onChange: (_: any) => void
}

function CustomSelect<T>({ options, className, value, onChange }: SelectParams<T>) {
  const customStyles: StylesConfig<T, false> = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1C1C1C' : '#0F0F0F',
      color: '#F5F5F5',
      padding: 10,
      '&:hover': {
        backgroundColor: '#1C1C1C',
      },
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid lightgray',
      borderRadius: 4,
      background: '#0F0F0F',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
      color: '#F5F5F5',
    }),
    menu: (provided) => ({
      ...provided,
      background: '#0F0F0F',
    }),
  }

  return (
    <Select
      className={className}
      options={options}
      styles={customStyles}
      value={value}
      onChange={onChange}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
    />
  )
}

export default CustomSelect
