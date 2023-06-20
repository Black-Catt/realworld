import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  ErrorsList,
  Input,
} from '../../../common/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazySignUpQuery } from '../api/repository';
import { toast } from 'react-hot-toast';
import { setUser } from '../service/slice';
import { useAppDispatch } from '../../../store/store';

interface SignUpPageProps {}

interface SignUpFormValue {
  username: string;
  email: string;
  password: string;
}

const validationScheme = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValue>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationScheme),
  });

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: SignUpFormValue) => {
    try {
      const { data } = await triggerSignUpQuery(values, false);
      if (!data) {
        throw new Error('No data in query');
      }
      dispatch(setUser(data.user));
      navigate('/');
    } catch (error) {
      toast.error("This didn't work. Please, try again later");
    }
  };

  return (
    <Container>
      <h1 className="text-4xl text-center mb-4">Sign up</h1>
      <p className="text-center text-realworld-green mb-4">
        <Link to="/sign-in">Have an account?</Link>
      </p>
      <form
        className="max-w-xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ErrorsList errors={errors} />
        <Input placeholder="Username" {...register('username')} />
        <Input placeholder="Email" type="email" {...register('email')} />
        <Input
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        <div className="flex justify-end">
          <Button
            btnStyle="GREEN"
            size="LG"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignUpPage;
