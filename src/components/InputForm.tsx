import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress, FormHelperText, Typography } from "@mui/material";
import { ChangeEventHandler } from "react";
// import useForm from "@/app/hooks/useForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormTextInput } from "./FormTextInput";

export type FormValues = {
  title: string;
  completed: boolean;
};

type InputFormProps = {
  initialValue: FormValues;
  loading: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: (values: FormValues) => void;
};

const validation = {
  title: (value: string) => {
    if (value.length < 4) {
      return "Too Short";
    }
  },
  completed: (value: boolean) => {
    if (value === undefined) {
      return "Completed required";
    }
  },
};

const todoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short")
    .max(20, "Too Long")
    .required("Required"),
  completed: Yup.boolean().required("Required"),
});

export default function InputForm({
  initialValue,
  loading,
  onSubmit,
}: InputFormProps) {
  // const { values, errors, onChange, handleSubmit } = useForm(
  //   initialValue,
  //   onSubmit,
  //   validation
  // );

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={todoSchema}
    >
      {(props) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit();
          }}
          className="flex flex-col"
        >
          <div>
            <FormTextInput name="title" label="Title" />

            <FormControlLabel
              control={
                <Checkbox
                  checked={props.values.completed}
                  onChange={props.handleChange("completed")}
                />
              }
              label="Status"
            />
            <FormHelperText color="danger">
              {props.errors.completed}
            </FormHelperText>
          </div>

          <div>
            <Button variant="contained" color="primary" type="submit">
              {loading ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                <Typography>Submit</Typography>
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
