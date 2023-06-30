import React from "react";
import { useForm } from "react-hook-form";
import styles from "./RHForm.module.css";
const RHForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  console.log(watch());
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <p className={styles.mainTitle}>React Hook Form</p>
        <input
          {...register("firstName", { required: "This is required" })}
          placeholder="First Name"
          className={styles.bothInputs}
        />
        <p>{errors.firstName?.message}</p>
        <input
          {...register("lastName", { required: "This is required" })}
          placeholder="Last Name"
          className={styles.bothInputs}
        />
        <p>{errors.lastName?.message}</p>
        <input type="submit" className={styles.submitBtn} />
      </form>
    </div>
  );
};

export default RHForm;
