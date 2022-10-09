interface WebviewProps {
  content: string;
  htmlStyles?: string;
  backgroundColor?: string;
  color?: string;
  caretColor?: string;
  initialCSSText?: string;
  useContainer?: boolean;
}

export const renderWebview = (props: WebviewProps) => {
  const {
    content,
    htmlStyles = '',
    backgroundColor = '#FFF',
    color = ' ',
    caretColor = '',
    initialCSSText = '',
    useContainer = true,
  } = props;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <title>self care tip| Bettion</title>
  <style>
    h1 {
      margin: 0;
      color: black;
      border-bottom: 1px solid blue;
    }
  </style>
  <style>
        ${initialCSSText}
        * {outline: 0px solid transparent;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;box-sizing: border-box;}
        html, body { margin: 0; padding: 0;font-family: Arial, Helvetica, sans-serif; font-size:1em; height: 100%}
        body { overflow-y: hidden; -webkit-overflow-scrolling: touch;background-color: ${backgroundColor};caret-color: ${caretColor};}
        .content {font-family: Arial, Helvetica, sans-serif;color: ${color}; width: 100%;${!useContainer ? 'height:100%;' : ''}-webkit-overflow-scrolling: touch;padding-left: 0;padding-right: 0;}
        .pell { height: 100%;} .pell-content { outline: 0; overflow-y: auto;padding: 10px;height: 100%;}
    </style>
  <style>${htmlStyles}</style>
</head>
<body>
  <div class="content"><div id="editor" class="pell"/>${content}</div>
</body>
</html>
  `;
};
