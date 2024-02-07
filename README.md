# A Job Board full-stack project

**Tech Stack (MVC software design pattern):** MySQL; EJS, JavaScript, CSS; Express.js

**For running the project, execute these two commands:**

1. 🏗 Download all dependencies
   ```
   npm i
   ```
2. 🏁 Run project
   ```
   nodemon app
   ```

---

**🐜 Error connecting to the database: Access denied for user 'root'@'localhost' (using password: NO)**

Run the following commands in cmd (Windows)

```bash
netstat -aon | find "3306"
```

Terminate process

```
taskkill /F /PID (PID FROM PREVIOUS COMMAND)
```

---

**⚙ .env keys**

- DATABASE_HOST
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME
- JWT_SECRET
- JWT_EXPIRES
- COOKIE_EXPIRES
- DOMAIN
- EMAIL_EMAIL
- EMAIL_PASS
- SESSION_SECRET

---

**🛠 Tech Stack:**

- EJS, CSS, Bootstrap, Javascript, Express.js, MySQL, different libraries & frameworks, Figma

---

**🎨 [Figma Design](https://www.figma.com/file/qddYw8hDrG7ztUBGP9T6zf/Job-Board?type=design&node-id=0%3A1&mode=design&t=KXyYQBr2qFUjO2TC-1)**

---

**📝 Tasks:**

* [ChatGPT integration with TinyMCE](https://www.tiny.cloud/blog/chatgpt-integration/ "DB click")

---
