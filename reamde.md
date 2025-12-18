When you want to update Render backend again:

(from Back_End root)
git subtree split --prefix=Express/ExpressStarter -b pizza-backend-branch
git push pizza pizza-backend-branch:main --force
git branch -D pizza-backend-branch

⚠️ Always push Render from subtree, never directly from monorepo root.



Perfect 👍
Below is a **clean, professional, copy-paste ready `README.md`** that documents **exactly what you did**, why you did it, and **how to repeat it in future**.
You can paste this **as-is** into your repo.

---

# 🚀 Express Backend Deployment & Repo Management Guide

This repository contains my **Express.js backend project**.
This README is written for **future reference**, so I can easily update, deploy, and manage the project without confusion.

---

## 📂 Project Structure (Original)

```text
Back_End/
 └── Express/
     └── ExpressStarter/
         ├── package.json
         ├── src/
         │   └── index.js
         └── ...
```

* **Main repo:** `Back_End`
* **Actual backend app:** `Express/ExpressStarter`
* Platform used for deployment: **Render**

---

## ❌ Problem Faced (Important)

Render **does not allow selecting a subfolder** during deployment.

Because:

* `package.json` was **not at the repo root**
* Render searched for:

  ```
  /opt/render/project/src/package.json
  ```
* Build failed with `ENOENT: no such file or directory`

---

## ✅ Final Solution (Best & Clean)

Instead of changing folder structure, I:

✔ Created a **new repository** only for the backend
✔ Used **git subtree** to push the subfolder
✔ Kept the original repo unchanged
✔ Successfully deployed on **Render**

---

## 📦 New Deployment Repository

* **Repo name:** `Pizza_Backend`
* **Contains only:** `Express/ExpressStarter` code
* **Used by Render for deployment**

---

## 🔁 Git Setup (Two Remotes)

In my local machine:

```bash
git remote -v
```

```text
origin  https://github.com/MdFazleRasool/Back_End.git
pizza   https://github.com/MdFazleRasool/Pizza_Backend.git
```

* `origin` → main monorepo (Back_End)
* `pizza`  → deployment repo (Pizza_Backend)

---

## 🌿 Branches Used

```bash
git branch
```

```text
main
pizza-backend-branch
```

* `main` → normal development
* `pizza-backend-branch` → subtree split branch

---

## 🔧 How the Subfolder Was Pushed (Reference)

From **repo root (`Back_End`)**:

```bash
git subtree split --prefix=Express/ExpressStarter -b pizza-backend-branch
git push pizza pizza-backend-branch:main
```

This pushed **only the backend folder** into the new repo.

---

## 🚀 Render Deployment Settings

| Setting       | Value         |
| ------------- | ------------- |
| Service Type  | Web Service   |
| Repository    | Pizza_Backend |
| Branch        | main          |
| Environment   | Node          |
| Build Command | `npm install` |
| Start Command | `npm start`   |

---

## ⚠️ Important Notes (Must Remember)



---

### 2️⃣ `package.json` MUST be at repo root

Render will fail if it is inside a subfolder.

---

### 3️⃣ Netlify is NOT for Express servers

* Netlify ❌ (static / serverless only)
* Render / Railway ✅ (full Express support)

---

## 🔄 Future Update Workflow (Simple)

### Update code normally

```bash
git add .
git commit -m "update backend logic"
git push origin main
```

### Push update to deployment repo

```bash
git subtree split --prefix=Express/ExpressStarter -b pizza-backend-branch
git push pizza pizza-backend-branch:main
```

Render will **auto-redeploy** 🚀

---

## ✅ Status

* ✅ Backend deployed successfully
* ✅ Original repo preserved
* ✅ Clean deployment repo
* ✅ Easy future updates

---

**Author:** Md Fazle Rasool
**Backend:** Express.js + MongoDB
**Deployment:** Render

---


