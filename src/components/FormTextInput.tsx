import { TextField } from "@mui/material";
import { useField } from "formik";

type FormTextInputProps = { name: string; label: string };

export const FormTextInput = ({ name, label }: FormTextInputProps) => {
  const [field, meta, helper] = useField(name);
  return (
    <TextField
      label={label}
      value={field.value}
      onChange={(e) => helper.setValue(e.target.value)}
      error={Boolean(meta.error)}
      helperText={meta.error}
      variant="outlined"
      fullWidth
      margin="normal"
    />
  );
};
