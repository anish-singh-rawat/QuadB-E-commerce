import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/slices/registerSlice";
import { toast } from "react-toastify";
import { registerSchema } from "../../validations";

const inputElement = [
  {
    name: "name",
    placeHolder: "Name",
    type: "text",
  },
  {
    name: "phone",
    placeHolder: "Phone Number",
    type: "text",
  },
  {
    name: "email",
    placeHolder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeHolder: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeHolder: "Confirm Password",
    type: "password",
  },
];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.register.status);
  console.log(loading)

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        console.log("values===", values);
        // setLoading(true);
        const payload = {
          username: values.name,
          mobile: values.phone,
          email: values.email,
          password: values.password,
          isAdmin: false,
        };
        try {
          dispatch(register(payload));
          // console.log("res ===", res.data);
          // if (res.status === 200) {
          //     toast.success('Registration Successfully!')
          //     navigate('/login');
          // }
        } catch (error) {
          if (error.response.data.phone) {
            toast.error(error.response.data.phone[0]);
          }
          if (error.response.data.email) {
            toast.error(error.response.data.email[0]);
          }
          console.log("Error:", error.response.data);
        } finally {
          // setLoading(false)
        }
      },
    });

  return (
    <div>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow-xl px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Create an account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register for new costumer
          </p>
          <form method="post" autoComplete="off" onSubmit={handleSubmit}>
            <div className="space-y-2">
              {inputElement.map((input, i) => (
                <div key={i}>
                  <label htmlFor="name" className="text-gray-600 mb-1 block">
                    {input.placeHolder}
                  </label>
                  <input
                    type="text"
                    name={input.name}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder={input.placeHolder}
                    value={values[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors[input.name] && touched[input.name] && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors[input.name]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  I have read and agree to the{" "}
                  <a href="#" className="text-primary">
                    terms & conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="mt-4">
            <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                {loading == "loading" ? (
                  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                ) : (
                  "create account"
                )}
              </button>
            </div>
          </form>

          {/* <div className="mt-6 flex justify-center relative">
                <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div className="mt-4 flex gap-4">
                <a href="#"
                    className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                <a href="#"
                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
            </div> */}

          <p className="mt-4 text-center text-gray-600">
            Already have account?{" "}
            <Link to={"/login"} className="text-primary">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
