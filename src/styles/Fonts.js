const type = {
  light: 'Nunito-Light',
  regular: 'Nunito-Regular',
  semiBold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
};

const size = {
  h1: 38,
  h2: 35,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  paragraph: 16,
  hint: 14,
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.bold,
    fontSize: size.h3,
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
    fontFamily: type.regular,
    fontSize: size.h6,
  },
  paragraph: {
    fontFamily: type.regular,
    fontSize: size.paragraph,
  },
  input: {
    fontFamily: type.light,
    fontSize: size.medium,
  },
  small: {
    fontFamily: type.light,
    fontSize: size.hint,
  },
};

export default {
  type,
  size,
  style,
};
