function FormStatus({ status }) {
    return status ? <p className="form-status">{status}</p> : null;
}

export default FormStatus;