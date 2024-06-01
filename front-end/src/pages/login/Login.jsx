import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { login } from "../../redux/slices/loginSlice";
import { loginSchema } from "../../../schema/ValidationsSchema";

const Login = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        const payload = {
          email: values.email,
          password : values.password
        }
       const data = await dispatch(login(payload));
       console.log(data,'testing')
      },
    });

  return (
    <div>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow-lg px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
          <div>
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  type="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />

                {errors.email && touched.email ? (
                  <div className="text-red-500 text-[12px] italic">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-600 mb-2 block"
                >
                  Password
                </label>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-[12px] italic">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="mt-4">
              <button
              type="submit"
                onClick={handleSubmit}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have account?{" "}
            <Link to={'/register'} className="text-primary">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login