const type = {
  light: 'Nunito-Light',
  regular: 'Nunito-Regular',
  bold: 'Nunito-SemiBold',
};

const size = {
  h1: 38,
  h2: 35,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 10,
  title: 40,
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.bold,
    fontSize: size.h3,
    fontStyle: 'normal',
  },
  h4: {
    fontFamily: type.bold,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.bold,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.bold,
    fontSize: size.h6,
  },
  normal: {
    fontStyle: 'normal',
    fontFamily: type.regular,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.light,
    fontSize: size.medium,
  },
  input: {
    fontFamily: type.light,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
