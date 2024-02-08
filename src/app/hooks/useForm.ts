import { useState } from "react";

export default function useForm(
  initialValues: Record<string, any>,
  onSubmit: (values: any) => void,
  validation: Record<string, (name: any) => string | undefined>
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (name: string, value: any) => {
    const err = validation?.[name](value);
    if (err) {
      setErrors((prevErrs) => ({ ...prevErrs, [name]: err }));
    } else {
      setErrors((prevErrs) => ({ ...prevErrs, [name]: undefined }));
    }
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    let e: Record<string, string | undefined> = {};
    for (const key in validation) {
      const err = validation[key](values[key]);
      if (err) {
        e[key] = err;
        setErrors((prevErrs) => ({ ...prevErrs, [key]: err }));
      } else {
        e[key] = undefined;
        setErrors((prevErrs) => ({ ...prevErrs, [key]: undefined }));
      }
    }

    const numOfErrs = Object.values(e).filter((err) => {
      return err !== undefined;
    }).length;
    if (numOfErrs >= 1) {
      return;
    }
    return onSubmit(values);
  };

  return { values, handleChange, handleSubmit, errors };
}
