import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='input-container'>
            {label && (
                <label>{label}</label>
            )}
            <input { ...otherProps } />
        </div> 
    )
}

export default FormInput

