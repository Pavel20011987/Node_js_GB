const http = require('http');

// Счетчик просмотров
let viewsCounter = 0;

// Функция для генерации HTML страницы с гиперссылкой
function generatePage(url) {
  viewsCounter++;
  return 
    <html>
    <head>
      <title>Node.js HTTP Server</title>
    </head>
    <body>
      <h1>Welcome to Node.js HTTP Server!</h1>
      <p>Views: ${viewsCounter}</p>
      <a href="${url}">Go to ${url}</a>
    </body>
    </html>
  ;
}

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const page = generatePage('/about');
    res.end(page);
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const page = generatePage('/');
    res.end(page);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head><title>404 - Not Found</title></head><body><h1>404 - Not Found</h1></body></html>');
  }
});

// Запускаем сервер
server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});