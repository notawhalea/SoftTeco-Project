import React from "react";
import { useForm } from "react-hook-form";
const RHForm = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register("firstname")} placeholder="First Name" />
        <input {...register("lastname")} placeholder="Last Name" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default RHForm;
