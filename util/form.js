import {useState} from "react";
export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      var elementType = e.target.getAttribute && e.target.getAttribute("type") ? e.target.getAttribute("type").toLowerCase() : null;
      var value = e.target.value;
      if (["checkbox", "radio"].includes(elementType)) {
        value = e.target.checked;
      }
      setValues({...values, [e.target.name]: value});
    },
    (newState) => {
      setValues(initialValues);
    },
    (setState) => {
      setValues(setState);
    },
  ];
}
