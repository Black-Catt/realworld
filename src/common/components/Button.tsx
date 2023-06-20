import clsx from 'clsx';
import { ComponentProps, FC, PropsWithChildren } from 'react';

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  GREEN = 'GREEN',
  DANGER = 'DANGER',
}

enum ButtonSizeEnum {
  BASE = 'BASE',
  LG = 'LG',
}

enum ButtonVariantEnum {
  BASE = 'BASE',
  OUTLINE = 'OUTLINE',
}

interface ButtonProps {
  btnStyle?: keyof typeof ButtonStyleEnum;
  size?: keyof typeof ButtonSizeEnum;
  variant?: keyof typeof ButtonVariantEnum;
  type?: ComponentProps<'button'>['type'];
  disabled?: ComponentProps<'button'>['disabled'];
  onClick?: ComponentProps<'button'>['onClick'];
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  btnStyle = ButtonStyleEnum.DARK,
  size = ButtonSizeEnum.BASE,
  variant = ButtonVariantEnum.BASE,
  children,
  ...buttonProps
}) => {
  const btnClasses = clsx(
    'text-center align-middle cursor-pointer select-none border active:bg-gray-650 disabled:opacity-70',
    {
      'border-stone-400 text-stone-400 hover:bg-gray-500 hover:text-white focus:bg-gray-400 focus:text-white':
        btnStyle === ButtonStyleEnum.DARK,

      'border-gray-400 text-gray-400 hover:bg-gray-400':
        btnStyle === ButtonStyleEnum.LIGHT,

      'border-realworld-green active:bg-realworld-darkGreen':
        btnStyle === ButtonStyleEnum.GREEN,

      'bg-realworld-green text-white hover:bg-realworld-darkGreen hover:border-realworld-darkGreen ':
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.BASE,

      'bg-white   hover:bg-realworld-green  hover:text-white  hover:border-realworld-green disabled:bg-darkGreen disabled:text-gray text-black border-black':
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.OUTLINE,

      'border-realworld-red text-realworld-red hover:bg-realworld-red hover:text-white focus:bg-realworld-red disabled:bg-realworld-red  disabled:cursor-not-allowed':
        btnStyle === ButtonStyleEnum.DANGER,
      'py-1 px-2 text-sm rounded-buttonSm': size === ButtonSizeEnum.BASE,
      'py-3 px-6 text-xl rounded': size === ButtonSizeEnum.LG,
    }
  );

  return (
    <button className={btnClasses} {...buttonProps}>
      {children}
    </button>
  );
};
