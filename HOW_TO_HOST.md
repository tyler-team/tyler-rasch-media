# 🚀 Fool-proof Guide: Getting Tyler's Site Live

Follow these exact steps to host the website and get a shareable link for Tyler. No prior coding experience required!

---

## � Fix: "Authentication Failed" (Personal Access Token)
If GitHub asked for your password and failed, it's because they require a **Token** instead of your normal password.

### Step 1: Generate the Token on GitHub
1.  On GitHub.com, click your **Profile Picture** (top right) -> **Settings**.
2.  On the left sidebar, scroll all the way down and click **<> Developer settings**.
3.  Click **Personal access tokens** -> **Tokens (classic)**.
4.  Click **Generate new token** -> **Generate new token (classic)**.
5.  **Note**: Type "Tyler Website".
6.  **Expiration**: Select "No expiration" (or 90 days).
7.  **Select Scopes**: Check the box for **repo** (this is the only one you need).
8.  Scroll down and click **Generate token**.
9.  **COPY THE TOKEN IMMEDIATELY**. You won't see it again.

### Step 2: Use the Token in your Terminal
1.  Run the command again: `git push -u origin main`
2.  **Username**: Type your GitHub username.
3.  **Password**: **Paste the Token you just copied.** (Note: The terminal won't show any characters while you paste, it will look blank. Just paste and hit Enter).

---

## Part 1: Prerequisites (One-time setup)

### 1. Create a GitHub Account
*   Go to [github.com/signup](https://github.com/signup).

### 2. Create a Vercel Account
*   Go to [vercel.com/signup](https://vercel.com/signup) and select **"Continue with GitHub"**.

---

## Part 2: Sending your code to GitHub

1.  **Stop the current server**: Press `Ctrl + C` in your terminal.
2.  **Initialize & Save**:
    ```bash
    git init
    git add .
    git commit -m "Final version for Tyler"
    ```
3.  **Create the Repository**: [github.com/new](https://github.com/new) -> Name it `tyler-rasch-media`.
4.  **Connect & Push**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/tyler-rasch-media.git
    git branch -M main
    git push -u origin main
    ```

---

## Part 3: Turning it into a Website (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Click **"Import"** on your `tyler-rasch-media` repo.
4.  Click **"Deploy"**.

### 🎉 Confetti!
Vercel will give you a link like: `tyler-rasch-media.vercel.app`. Send that to Tyler!
