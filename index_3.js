const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Загрузка данных из файла
let users = [];
try {
  const data = fs.readFileSync('users.json', 'utf-8');
  users = JSON.parse(data);
} catch (error) {
  console.error('Ошибка при загрузке данных из файла:', error);
}

// Обработчик GET запроса на получение всех пользователей
app.get('/users', (req, res) => {
  res.json(users)
});

// Обработчик GET запроса на получение пользователя по id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

// Обработчик POST запроса на создание нового пользователя
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  saveDataToFile();

  res.status(201).json(users);
});

// Обработчик PUT запроса на обновление пользователя по id
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updateUser };
    saveDataToFile();
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

// Обработчик DELETE запроса на удаление пользователя по id
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    saveDataToFile();
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

// Сохранение данных в файл
function saveDataToFile() {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
}

// Запуск сервера
app.listen(port, () => {
  console.log(Сервер запущен на порту ${port});
});