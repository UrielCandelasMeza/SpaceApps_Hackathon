import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import styled from "styled-components";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const [subiendo, setSubiendo] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log("Archivo subido:", values.file);

      // Ocultamos el form y dejamos el canvas girando
      setSubiendo(true);

      // Simulamos tiempo de respuesta del servidor
      setTimeout(() => {
        console.log("Respuesta recibida del servidor");
        setSubmitting(false);
        // Aquí puedes mostrar resultado o cambiar de vista
      }, 4000);
    },
  });

  return (
    <div className={`flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      {/* FORM: solo si NO se está subiendo */}
      {!subiendo && (
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Sube los datos que quieras</p>
          <h3 className={styles.sectionHeadText}>Analizar</h3>

          <form
            onSubmit={formik.handleSubmit}
            className="mt-12 flex flex-col gap-8 content-center"
          >
            <StyledWrapper>
              <label htmlFor="file" className="custum-file-upload">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    />
                  </svg>
                </div>
                <div className="text">
                  <span>
                    {formik.values.file
                      ? formik.values.file.name
                      : "Click to upload file"}
                  </span>
                </div>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={(event) =>
                    formik.setFieldValue("file", event.currentTarget.files[0])
                  }
                />
              </label>
            </StyledWrapper>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              {formik.isSubmitting ? "Subiendo..." : "Subir"}
            </button>
          </form>
        </motion.div>
      )}

      {/* PLANETA siempre visible */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas autoRotate={subiendo} autoRotateSpeed={subiendo ? 5 : 2} />
        {subiendo && (
          <p className="text-center mt-4 text-white">Procesando archivo...</p>
        )}
      </motion.div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #e8e8e8;
    background-color: #212121;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #e8e8e8;
  }

  .custum-file-upload input {
    display: none;
  }
`;

export default SectionWrapper(Contact, "contact");
